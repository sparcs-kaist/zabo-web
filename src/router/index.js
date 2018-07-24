import Vue from "vue";
import Router from "vue-router";
import ZaboDetail from "@/pages/ZaboDetail";
import ZaboUpdate from "@/pages/ZaboUpdate";
import ZaboUpload from "@/pages/ZaboUpload";
import ZaboListTest from "@/pages/ZaboListTest";
import ZaboUserprofile from "@/pages/Userprofile.vue";
import UserDetail from "@/pages/UserDetail.vue";
import ZaboSearch from "@/pages/ZaboSearch.vue";
import LoginCallback from "@/pages/LoginCallback.vue";
import CodeOfConduct from "@/pages/CodeOfConduct.vue";
import Credit from "@/pages/Credit.vue";
import License from "@/pages/License.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/zabo/upload",
      name: "ZaboUpload",
      component: ZaboUpload
    },
    {
      path: "/zabo/update/:zabo_id",
      name: "ZaboUpdate",
      component: ZaboUpdate
    },
    {
      path: "/zabo/:zabo_id",
      name: "ZaboDetail",
      component: ZaboDetail
    },
    {
      path: "/user/profile",
      name: "Zabouserprofile",
      component: ZaboUserprofile
    },
    {
      path: "/user/detail/:nickName",
      name: "UserDetail",
      component: UserDetail
    },
    {
      path: "/search/:search",
      name: "ZaboSearch",
      component: ZaboSearch,
      beforeEnter: (to, from, next) => {
        console.log("Entering User", to.params.search);
        next();
      }
    },
    {
      path: "/login/callback",
      name: "LoginCallback",
      component: LoginCallback
    },
    {
      path: "/credit",
      name: "Credit",
      component: Credit
    },
    {
      path: "/codeofconduct",
      name: "CodeOfConduct",
      component: CodeOfConduct
    },
    {
      path: "/license",
      name: "License",
      component: License
    },
    {
      path: "/",
      name: "ZaboListDetailAdded",
      component: ZaboListTest
    }
  ]
});
