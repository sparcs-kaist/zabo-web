// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import store from "./store";
import App from "./App";
import router from "./router";

import axios from "axios";

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.use(Vuetify);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});
