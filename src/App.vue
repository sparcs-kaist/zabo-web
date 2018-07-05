<template>
  <div id="app">
    <transition name="component-slide-fade">
      <component :is="voided" @bullshitfunc="anonyfunc"></component>
    </transition>
    <div>
      <div v-show="!loggingIn">
        <Header @logged-in="handleLogin" :loggedInState="loggedInState"></Header>
        <router-view :key="$route.name + ($route.params.id || '')"></router-view>
      </div>
      <Login v-if="loggingIn" @logged-in="handleLogin"></Login>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Login from "@/components/Login";
import MainZabo from "@/components/MainZabo";

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
      voided: MainZabo
    };
  },
  created() {
    this.$store.commit("LOGIN");
    this.$store.dispatch("getMyInfo");
  },
  methods: {
    handleLogin(value) {
      this.loggingIn = !this.loggingIn;
    },
    anonyfunc() {
      this.voided = "v-a";
      console.log("안녕");
    }
  },
  computed: {
    mainZaboSeen: function() {
      return this.$store.getters.mainZaboSeen;
    },
    loggedInState: function() {
      return this.$store.getters.loggedInState;
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
i,
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
  /* text-align: center; */
  /* color: #2c3e50; */
  overflow: hidden;
}

/* .slide-enter-active {
  transition: all 1s ease-in-out;
} */

.component-slide-fade-leave-active {
  transition: all 0.4s ease-in;
}

.component-slide-fade-leave-to {
  transform: translateY(-2000px);
}
</style>
