<template>
  <div class="sandbox">
    <div class="topline"></div>
    <div class="Buttons">
      <router-link to="/">
        <img src="@/logo.svg" class="logo">
      </router-link>
      <router-link to="/zabo">
        <div class="button left">
          {{ $t('내가 등록한 자보') }}
        </div>
      </router-link>
      <router-link to="/zabo/list">
        <div class="button left">
          {{ $t('내가 참여한 자보') }}
        </div>
      </router-link>
      <router-link to="/zabo/user_profile">
        <div class="button left">
          {{ $t('프로필 관리') }}
        </div>
      </router-link>
      <div @click="setLang" class="button right">
        {{ this.computedLang }}
      </div>
      <template v-if="loggedInState">
        <div @click="logout" class="button right">
          {{ $t('로그아웃') }}
        </div>
      </template>
      <template v-else>
        <div @click="login" class="button right">
          {{ $t('로그인') }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import app from '@/main';

export default {
  name: "Header",
  data () {
    return {
      lang: "kr"
    }
  },
  methods: {
    login: function () {
      this.$emit('logged-in');
    },
    logout: function () {
      this.$store.commit('LOGOUT')
    },
    setLang: function () {
      if (this.lang === "kr") {
        this.$i18n.set('en')
        this.lang = "en"
      } else {
        this.$i18n.set('kr')
        this.lang = "kr"
      }
    }
  },
  computed: {
    loggedInState: function () {
      return this.$store.getters.loggedInState
    },
    computedLang: function () {
      if (this.lang === "kr") {
        return "en"
      } else {
        return "kr"
      }
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
  z-index: 500;
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
