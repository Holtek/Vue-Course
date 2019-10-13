import Vue from "vue";
import App from "./App.vue";
import axios from "axios";

import router from "./router";
import store from "./store";

axios.defaults.baseURL = "https://vue-update-f294c.firebaseio.com";
axios.defaults.headers.common["Authorization"] = "something";
axios.defaults.headers.get["Accepts"] = "something/json";
const reqInter = axios.interceptors.request.use(config => {
  console.log("request", config);
  return config;
});
const resInter = axios.interceptors.response.use(res => {
  console.log("response", res);
  return res;
});
axios.interceptors.request.eject(reqInter);
axios.interceptors.request.eject(resInter);

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
