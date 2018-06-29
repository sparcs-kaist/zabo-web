<template>
  <div id="app">
    <template v-if="!loggingIn">
      <Header @logged-in="handleLogin"></Header>
      <router-view />
    </template>
    <Login v-else @logged-in="handleLogin"></Login>
    <Footer />
  </div>
</template>

<script>
import Header from "@/pages/Header";
import Footer from "@/pages/Footer";
import Login from "@/pages/Login";

export default {
  name: "App",
  components: {
    Header,
    Login,
    Footer
  },
  data () {
    return {
      loggingIn: false
    }
  },
  created () {
    this.$store.dispatch('getMyInfo')
  },
  mounted () {
    // this.$store.dispatch('getMyInfo')
  },
  methods: {
    handleLogin (value) {
      this.loggingIn = !this.loggingIn;
    }
  }
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: "NanumSquare", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}

.footer {
  width: 100%;
  height: 65px;
  background-color: white;
  bottom: 0px;
  position: fixed;
}
</style>
