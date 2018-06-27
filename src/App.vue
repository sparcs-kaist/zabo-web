<template>
  <div id="app">
    <template v-if="loginState">
      <Header></Header>
      <router-view/>
    </template>
    <Login :loginState="loginState" @logged-in="handleLogin" v-else></Login>
    <div class="footer">
      <p style="font-size : 15pt; font-weight: 800;">Footer</p>
    </div>
  </div>
</template>

<script>
import Header from "@/router/Header";
import Login from "@/pages/Login";

export default {
  name: "App",
  components: {
    Header,
    Login
  },
  data () {
    return {
      loginState: false
    }
  },
  created () {
  },
  methods: {
    handleLogin (value) {
      this.loginState = true;
      console.log('submmited')
    }
  }
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
