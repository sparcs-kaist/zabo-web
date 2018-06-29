<template>
  <div id="app">
    <template v-if="mainZaboSeen">
      <template v-if="!loggingIn">
        <Header @logged-in="handleLogin"></Header>
        <div class="headerMargin">
          <router-view />
        </div>
      </template>
      <Login v-else @logged-in="handleLogin"></Login>
      <Footer />
    </template>
    <MainZabo v-else></MainZabo>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Login from "@/components/Login";
import MainZabo from '@/components/MainZabo';

export default {
  name: "App",
  components: {
    Header,
    Login,
    Footer,
    MainZabo
  },
  data () {
    return {
      loggingIn: false
    }
  },
  created () {
    this.$store.dispatch('getMyInfo');
    this.mainZaboSeen = this.$store.getters.mainZaboSeen
  },
  methods: {
    handleLogin (value) {
      this.loggingIn = !this.loggingIn;
    }
  },
  computed: {
    mainZaboSeen: function () {
      return this.$store.getters.mainZaboSeen
    }
  }
};
</script>

<style>
body {
  margin: 0;
}
p {
  line-height: 1.6;
}

#app {
  font-family: "NanumSquare", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  overflow: hidden;
}
.headerMargin {
  margin-top: 78px;
}
.footer {
  width: 100%;
  height: 65px;
  background-color: white;
  bottom: 0px;
  position: fixed;
}
</style>
