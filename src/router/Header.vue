<template>
  <div class="sandbox">
    <div class="topline"></div>
    <div class="Buttons">
      <router-link to="/">
        <img src="@/logo.svg" class="logo">
      </router-link>
      <router-link to="/zabo">
        <div class="button left">
          내가 등록한 자보
        </div>
      </router-link>
      <router-link to="/zabo/list">
        <div class="button left">
          내가 참여한 자보
        </div>
      </router-link>
      <router-link to="/zabo/user_profile">
        <div class="button left">
          프로필 관리
        </div>
      </router-link>
      <div class="button right">
        Translate
      </div>
      <template v-if="loggedInState">
        <div @click="logout" class="button right">
          Logout
        </div>
      </template>
      <template v-else>
        <div @click="login" class="button right">
          Login
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    login: function () {
      this.$emit('logged-in');
    },
    logout: function () {
      this.$store.commit('LOGOUT')
    }
  },
  computed: {
    loggedInState: function () {
      return this.$store.getters.loggedInState
    }
  }
};
</script>

<style scoped>
.sandbox {
  width: 100%;
  height: 78px;
  position: fixed;
  z-index: 1;
  background-color: white;
}

.topline {
  width: 100%;
  height: 5px;
  background-color: #12397d;
}
.Buttons {
  text-align: left;
  width: 100%;
  height: 100px;
}

.button {
  font-size: 15pt;
  font-family: Nanumsquare;
  font-weight: 400;
  margin-top: 28px;
  color: black;
  opacity: 0.7;
  cursor: pointer;
}
.button:hover {
  opacity: 1;
}

.left {
  float: left;
  margin-left: 27px;
}

.right {
  float: right;
  margin-right: 27px;
}

.logo {
  float: left;
  height: 37px;
  margin-top: 18px;
  margin-left: 27px;
}
</style>