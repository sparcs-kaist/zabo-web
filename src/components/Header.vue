<template>
  <div class="sandbox">
    <div class="topline"></div>
    <div class="Buttons">
      <div class="column">
        <router-link to="/">
          <img src="@/assets/logo.svg" class="logo">
        </router-link>
        <router-link to="/zabo/upload">
          <div class="button left">
            {{ $t('자보 올리기') }}
          </div>
        </router-link>
        <router-link to="/user/profile">
          <div class="button left">
            {{ $t('프로필 관리') }}
          </div>
        </router-link>
      </div>
      <div class="column">
        <div class="right">
          <Search @submitValue="onSearch" :searchValue="searchValue" />
        </div>
        <div style="position: relative;">
          <v-icon @click="notificationsModal = !notificationsModal" class="right">notifications</v-icon>
          <div class="notificationWrapper" v-if="notificationsModal">
            <div class="singleNotiWrapper" v-for="(noti, index) in notifications" :key="index">
              <span>{{noti.from}}</span>
              <span>{{noti.type}}</span>
              <span>{{noti.content}}</span>
            </div>
          </div>
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
        <div @click="setLang" class="button right">
          {{ this.computedLang }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import app from "@/main";
import Search from "@/components/Search";

export default {
  name: "Header",
  components: {
    Search
  },
  data () {
    return {
      lang: "kr",
      searchValue: "",
      notificationsModal: false
    };
  },
  props: {
    loggedInState: Boolean
  },
  methods: {
    login: function () {
      this.$emit("logged-in");
    },
    logout: function () {
      this.$store.commit("LOGOUT");
    },
    setLang: function () {
      if (this.lang === "kr") {
        this.$i18n.set("en");
        this.lang = "en";
      } else {
        this.$i18n.set("kr");
        this.lang = "kr";
      }
    },
    onSearch (searchTerm) {
      this.$router.push({ name: 'ZaboSearch', params: { search: searchTerm } })
      this.searchTerm = ""
    }
  },
  computed: {
    computedLang: function () {
      if (this.lang === "kr") {
        return "en";
      } else {
        return "kr";
      }
    },
    notifications () {
      return this.$store.getters.getNotifications;
    }
  }
};
</script>

<style scoped>
.sandbox {
  width: 100%;
  height: 78px;
  position: fixed;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 500;
  display: flex;
  flex-direction: column;
}

.topline {
  width: 100%;
  height: 5px;
  background-color: #12397d;
}
.Buttons {
  width: 100%;
  height: 73px;
  display: flex;
}

.button {
  font-size: 15pt;
  font-family: Nanumsquare;
  font-weight: 400;
  color: black;
  opacity: 0.7;
  cursor: pointer;
}
.button:hover {
  opacity: 1;
}
.column {
  min-height: 73px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.column:last-child {
  justify-content: flex-end;
}
.left {
  margin-left: 27px;
}

.right {
  margin-right: 27px;
}

.logo {
  height: 37px;
  margin-left: 27px;
}

.notificationWrapper {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 40px;
  right: 0;
  background-color: gray;
  /* width: 200px; */
  padding: 10px;
}
.notificationWrapper::after {
  content: "";
  position: absolute;
  /* top: 40px; */
  right: 14%;
  border: 10px solid transparent;
  border-bottom-color: gray;
  border-top: 0;
  width: 0;
  height: 0;
  margin-right: -10px;
  margin-top: -20px;
}

.singleNotiWrapper {
  display: flex;
}
</style>
