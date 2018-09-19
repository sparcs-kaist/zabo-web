<template>
  <div id="app">
    <transition name="component-slide-fade">
      <component :is="voided" @closeintro="closeintro"></component>
    </transition>
    <div>
      <Header :profileImageLoading="loading" v-show="!loggingIn && $router.currentRoute.name != 'ZaboDetail'" @logged-in="handleLogin" :loggedInState="loggedInState"></Header>
      <Footer v-show="!loggingIn  && $router.currentRoute.name != 'ZaboDetail'" />
      <router-view v-show="!loggingIn" :key="$route.name + ($route.params.id || '')"></router-view>
      <Login v-show="loggingIn" @logged-in="handleLogin"></Login>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Login from "@/components/Login";
import MainZabo from "@/components/MainZabo";
import axios from "@/axios-auth";
import * as types from "@/store/mutation-types";

export default {
  name: "App",
  components: {
    Header,
    Login,
    Footer,
    MainZabo,
    "v-a": {
      template: "<div></div>"
    }
  },
  data() {
    return {
      loggingIn: false,
      voided: MainZabo,
      loading: false
    };
  },
  created() {
    if (localStorage.getItem("mainZaboSeen")) {
      this.voided = "v-a";
    } else {
      localStorage.setItem("mainZaboSeen", true);
    }
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token").split(" ")[0] == "ZABO"
    ) {
      this.$store.dispatch("login", localStorage.getItem("token").slice(5));
      axios
        .get("api/users/myInfo", {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(response => {
          if (response.status === 401) {
            this.loading = true;
          } else {
            this.$store.commit(types.SET_CURRENT_USER, response.data);
            this.loading = true;
          }
        })
        .catch(err => {
          this.loading = true;
        });
      this.$store.dispatch("getNotifications");
    }
  },
  methods: {
    handleLogin(value) {
      this.loggingIn = !this.loggingIn;
    },
    closeintro() {
      this.voided = "v-a";
    }
  },
  computed: {
    loggedInState: function() {
      return this.$store.getters.loggedInState;
    },
    notifications() {
      return this.$store.getters.notifications;
    }
  }
};
</script>

<style>
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

/* div {
  background-color: white;
} */

#app {
  font-family: "NanumSquare", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.component-slide-fade-leave-active {
  transition: all 0.4s ease-in;
}

.component-slide-fade-leave-to {
  transform: translateY(-2000px);
}
</style>
