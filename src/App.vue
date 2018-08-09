<template>
  <div id="app">
    <transition name="component-slide-fade">
      <component :is="voided" @closeintro="closeintro"></component>
    </transition>
    <div>
      <Header :profileImageLoading="loading" v-show="!loggingIn" @logged-in="handleLogin" :loggedInState="loggedInState"></Header>
      <router-view :key="$route.name + ($route.params.id || '')"></router-view>
      <Footer v-show="!loggingIn" />
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
    if (localStorage.getItem("token").split(" ")[0] == "ZABO") {
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
            console.log("response stauts 401!");
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

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
body {
  margin: 0;
}
p {
  line-height: 1.6;
}
a {
  text-decoration: none;
}
#app {
  font-family: "NanumSquare", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}

.component-slide-fade-leave-active {
  transition: all 0.4s ease-in;
}

.component-slide-fade-leave-to {
  transform: translateY(-2000px);
}
</style>
