<template>
  <nav>
    <div class="headerWrapper">
      <div class="headerTopLine"></div>
      <div class="logo">
        <router-link :to="{ name: 'Main' }">
          <img src="../assets/logo.png" width="79" height="37"/>
        </router-link>
      </div>
      <div class="headerItems" v-if="isLoggedIn">
        <router-link :to="{ name: 'UploadedZabo' }" class="headerItem">
          <span @hover="itemHover($event.target)">내가 등록한 자보</span>
        </router-link>
        <router-link :to="{ name: 'JoinedZabo' }" class="headerItem">
          <span @hover="itemHover($event.target)">내가 참여한 자보</span>
        </router-link>
        <router-link :to="{ name: 'UploadZabo' }" class="headerItem">
          <span @hover="itemHover($event.target)">자보 올리기</span>
        </router-link>
        <router-link :to="{ name: 'Profile' }" class="headerItem">
          <span @hover="itemHover($event.target)">프로필 관리</span>
        </router-link>
      </div>
      <div class="search">
        <input class="searchZabo" v-model="keyword"/>
        <button class="searchButton" @click="searchZabo">
          <img src="../assets/logo.png" width="17" height="17"/>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'header',
  data() {
    return {
      keyword: '',
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    searchZabo() {
      return;
    },
  },
};
</script>

<style scoped>
.headerWrapper {
  position: fixed;
  width: 100vw;
  height: 60px;
  overflow: hidden;
  z-index: 9999;
  background-color: white;
}

.headerTopLine {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: #12397D;
}

.logo {
  display: inline-block;
  float: left;
  margin: 23px 0 0 27px;
  height: 37px;
}

.headerItems {
  display: inline-block;
  float: left;
  margin: 33px 0 0 49px;
}

.headerItem {
  margin: 0 27px 0 0;
  text-decoration: none;
  color: #000;
  font-size: 15px;
}

.search {
  display: inline-block;
  position: relative;
  float: right;
  margin: 24px 27px 0 0;
  padding: 0;
  width: 260px;
  height: 31px;
  border: 2px solid #12397D;
}

.searchZabo {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  margin: 0;
  padding: 0;
  width: 229px;
  height: 100%;
}

.searchZabo:focus {
  outline: none;
}

.searchButton {
  display: inline-block;
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: none;
  margin: 0;
  padding: 0;
  width: 31px;
  height: 100%;
  user-select: none;
}
</style>
