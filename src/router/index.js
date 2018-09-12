import Vue from "vue";
import Router from "vue-router";
import ZaboDetail from "@/pages/ZaboDetail";
import ZaboUpdate from "@/pages/ZaboUpdate";
import ZaboUpload from "@/pages/ZaboUpload";
import CarouselList from "@/pages/CarouselList";
import ZaboUserprofile from "@/pages/Userprofile.vue";
import UserDetail from "@/pages/UserDetail.vue";
import LoginCallback from "@/pages/LoginCallback.vue";
import ZaboList from "@/pages/ZaboList.vue";
import CodeOfConduct from "@/pages/CodeOfConduct.vue";
import Credit from "@/pages/Credit.vue";
import License from "@/pages/License.vue";
import NotFound from "@/pages/NotFound.vue";

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
      path: "/user/detail/:userId",
      name: "UserDetail",
      component: UserDetail
    },
    {
      path: "/list",
      name: "ZaboList",
      component: ZaboList
    },
    {
      path: "/login/:token",
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
      component: CarouselList
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound
    }
  ]
});
