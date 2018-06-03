<template>
  <div id="app" :class="{before: beforeLogin}">
    <app-header v-if="!beforeLogin"></app-header>
    <router-view/>
    <app-footer v-if="!beforeLogin"></app-footer>
  </div>
</template>

<script>
import AppHeader from '@/components/Header';
import AppFooter from '@/components/Footer';

export default {
  name: 'App',
  components: {
    'app-header': AppHeader,
    'app-footer': AppFooter,
  },
  computed: {
    beforeLogin() {
      return !this.$store.getters.isLoggedIn;
    },
  },
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'NanumSquare', sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
</style>
