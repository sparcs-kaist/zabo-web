import Vue from "vue";
import Router from "vue-router";
import ZaboDetail from "@/pages/ZaboDetail";
import ZaboUpdate from "@/pages/ZaboUpdate";
import ZaboUpload from "@/pages/ZaboUpload";
import ZaboList from "@/pages/ZaboList";
import ZaboUserprofile from "@/pages/Userprofile.vue";
// import store from '../store';

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "ZaboList",
      component: ZaboList
    },
    {
      path: "/zabo/:zabo_id",
      name: "ZaboDetail",
      component: ZaboDetail
    },
    {
      path: "/zabo/update",
      name: "ZaboUpdate",
      component: ZaboUpdate
    },
    {
      path: "/zabo/upload",
      name: "ZaboUpload",
      component: ZaboUpload
    },
    {
      path: "/user/profile",
      name: "Zabouserprofile",
      component: ZaboUserprofile
    }
  ]
});
