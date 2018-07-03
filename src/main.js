// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import store from "./store";
import App from "./App";
import router from "./router";

import axios from "axios";

import vuexI18n from "vuex-i18n";
import translationEn from "@/lang/en.json";
import translationKr from "@/lang/kr.json";

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.use(Vuetify);

// Vuex-i18n
// https://kuanhsuh.github.io/2017/09/16/How-to-implement-multi-language-with-Vue-i18n/
Vue.use(vuexI18n.plugin, store, {
  moduleName: "i18n",
  onTranslationNotFound(locale, key) {
    console.warn(`i18n :: Key '${key}' not found for locale '${locale}'`);
  }
});

Vue.i18n.add("en", translationEn);
Vue.i18n.add("kr", translationKr);

Vue.i18n.set("kr");

/* eslint-disable no-new */
export const app = new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});
