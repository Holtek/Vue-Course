import Vue from "vue";
import App from "./App.vue";

Vue.filter("to-lower-case", function(value) {
  return value.toLowerCase();
});

Vue.mixin({
  created() {
    console.log("Global mixing created hook");
  }
});

new Vue({
  el: "#app",
  render: h => h(App)
});
