import Vue from "vue";
import Vuex from "vuex";
import axios from "./axios-auth";
import globalAxios from "axios";
import router from "./router";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    storeUser(state, user) {
      state.user = user;
    },
    clearAuthData(state) {
      state.idToken = null;
      state.userId = null;
    }
  },
  actions: {
    tryAutoLogin({ commit }) {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const expDate = localStorage.getItem("expDate");
      const now = new Date();
      if (now >= expDate) {
        return;
      }
      const userId = localStorage.getItem("userId");
      commit("authUser", {
        token: token,
        userId: userId
      });
    },
    setLogoutTimer({ commit }, expTime) {
      setTimeout(() => {
        commit("clearAuthData");
      }, expTime * 1000);
    },
    signup({ commit, dispatch }, authData) {
      axios
        .post("/signupNewUser?key=AIzaSyD0Ew_Q1vKjz-3GGPLs_rRKq8talmUEIro", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res);
          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId
          });
          const now = new Date();
          const expDate = new Date(now.getTime() + res.data.expiresIn * 1000);
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          localStorage.setItem("expDate", expDate);
          dispatch("storeUser", authData);
          dispatch("setLogoutTimer", res.data.expiresIn);
        })
        .catch(error => console.log(error));
    },
    logout({ commit }) {
      commit("clearAuthData");
      localStorage.removeItem("expDate");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      router.replace("/signin");
    },
    login({ commit, dispatch }, authData) {
      axios
        .post("/verifyPassword?key=AIzaSyD0Ew_Q1vKjz-3GGPLs_rRKq8talmUEIro", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res);
          const now = new Date();
          const expDate = new Date(now.getTime() + res.data.expiresIn * 1000);
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          localStorage.setItem("expDate", expDate);
          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId
          });
          dispatch("setLogoutTimer", res.data.expiresIn);
        })
        .catch(error => console.log(error));
    },
    storeUser({ commit, state }, userData) {
      if (!state.idToken) {
        return;
      }
      globalAxios
        .post("/users.json" + "?auth=" + state.idToken, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error));
    },
    fetchUser({ commit, state }) {
      if (!state.idToken) {
        return;
      }
      globalAxios
        .get("/users.json" + "?auth=" + state.idToken)
        .then(res => {
          console.log(res);
          const data = res.data;
          const users = [];
          for (let key in data) {
            const user = data[key];
            user.id = key;
            users.push(user);
          }
          console.log(users);
          commit("storeUser", users[0]);
        })
        .catch(error => console.log(error));
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuth(state) {
      return state.idToken !== null;
    }
  }
});
