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
              <div class="notiInfoWrapper" v-if="noti.type == 'SomeoneFollowing'">
                <img :src="'http://localhost:8000'+noti.from_profile" class="notiProfileImage">
                <span class="notiContent">
                  <span class="notiFrom">{{noti.from}}</span>님이 팔로우를 시작했습니다.</span>
              </div>
              <div class="notiInfoWrapper" v-if="noti.type == 'CommentReaction'">
                <img :src="'http://localhost:8000'+noti.from_profile" class="notiProfileImage">
                <span class="notiContent">
                  <span class="notiFrom">{{noti.from}}</span>님이 답글을 달았습니다. {{noti.content}}</span>
              </div>
              <div class="notiInfoWrapper" v-if="noti.type == 'ZaboReaction'">
                <img :src="'http://localhost:8000'+noti.from_profile" class="notiProfileImage">
                <span class="notiContent">
                  <span class="notiFrom">{{noti.from}}</span>님이 자보에 댓글을 남겼습니다. {{noti.content}}</span>
              </div>
              <div class="notiInfoWrapper" v-if="noti.type == 'ZaboFollowing'">
                <img :src="'http://localhost:8000'+noti.from_profile" class="notiProfileImage">
                <span class="notiContent">
                  <span class="notiFrom">{{noti.from}}</span>님이 새로운 자보를 올렸습니다. {{noti.content}}</span>
              </div>
            </div>
          </div>
          <div v-if="notificationsModal" class="triangle"></div>
          <div v-if="notificationsModal" class="triangle triangleBorder"></div>
        </div>
        <template v-if="loggedInState">
          <a href="http://localhost:8080/">
            <div @click="logout" class="button right">
              <img :src="imagesrc" class="profile-image">
            </div>
          </a>
        </template>
        <template v-else>
          <div @click="login" class="button right">
            {{ $t('로그인') }}
          </div>
        </template>
        <div @click="setLang" class="button right">
          {{ this.computedLang }}
        </div>
        <div class="dropdown" @click="dropdownOpen" v-if="!isDropdownOpened">
          <div class="bar-container">
            <div class="minibar">
            </div>
            <div class="minibar">
            </div>
            <div class="minibar">
            </div>
          </div>
        </div>
        <div v-else @click="dropdownClose">
          <div style="width: 15px; height: 15px; margin-right: 15px; cursor: pointer;">
            <img src="../assets/dropdownClose.svg" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="isDropdownOpened" class="dropdown-list">
      <router-link to="/zabo/upload">
        <div @click="dropdownClose" class="dropdown-content">
          {{ $t('자보 올리기') }}
        </div>
      </router-link>
      <router-link to="/user/profile">
        <div @click="dropdownClose" class="dropdown-content">
          {{ $t('프로필 관리') }}
        </div>
      </router-link>
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
      notificationsModal: false,
      isDropdownOpened: false
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
      this.$router.push({ name: "ZaboSearch", params: { search: searchTerm } });
      this.searchTerm = "";
    },
    dropdownOpen () {
      this.isDropdownOpened = true;
    },
    dropdownClose () {
      this.isDropdownOpened = false;
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
    },
    imagesrc () {
      return this.$store.getters.getProfileImagesource;
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 900px) {
  .sandbox {
    width: 100%;
    min-height: 78px;
    position: fixed;
    background-color: rgba(255, 255, 255);
    z-index: 500;
    display: flex;
    flex-direction: column;
  }
}

@media screen and (max-width: 899px) {
  .sandbox {
    width: 100%;
    min-height: 64px;
    position: fixed;
    background-color: rgba(255, 255, 255);
    z-index: 500;
    display: flex;
    flex-direction: column;
  }
}

.topline {
  width: 100%;
  height: 5px;
  background-color: #12397d;
}
@media screen and (max-width: 899px) {
  .Buttons {
    width: 100%;
    height: 59px;
    display: flex;
  }
}

@media screen and (min-width: 900px) {
  .Buttons {
    width: 100%;
    height: 73px;
    display: flex;
  }
}

@media screen and (max-width: 899px) {
  .button {
    display: none;
  }
}

@media screen and (min-width: 900px) {
  .button {
    font-size: 15pt;
    font-family: Nanumsquare;
    font-weight: 400;
    color: black;
    opacity: 0.7;
    cursor: pointer;
  }
}
.button:hover {
  opacity: 1;
}
.column {
  min-height: 59px;
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

@media screen and (min-width: 900px) {
  .right {
    margin-right: 27px;
  }
}

@media screen and (max-width: 899px) {
  .right {
    display: none;
  }
}

@media screen and (min-width: 900px) {
  .logo {
    height: 37px;
    margin-left: 27px;
  }
}

@media screen and (max-width: 899px) {
  .logo {
    height: 27px;
    margin-left: 15px;
  }
}

@media screen and (min-width: 900px) {
  .dropdown {
    display: none;
  }
}

@media screen and (max-width: 899px) {
  .dropdown {
    margin-right: 15px;
    cursor: pointer;
  }
}

.bar-container {
  width: 15px;
  height: 15px;
}

.minibar {
  width: 15px;
  height: 3px;
  margin-bottom: 3px;
  background-color: black;
}

.dropdown-list {
  height: 100%;
  width: 100%;
  padding-left: 15px;
}

.dropdown-content {
  color: black;
  font-size: 13pt;
  margin-bottom: 25px;
}

.notificationWrapper {
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: flex-start;
  justify-content: flex-start;
  top: 40px;
  right: 0;
  background-color: white;
  border: 0px solid transparent;
  width: 100%;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  min-width: 500px;
  max-width: 500px;
  min-height: 250px;
  max-height: 250px;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 1000;
}
.notificationWrapper::-webkit-scrollbar {
  width: 10px;
  background-color: transparent;
  border-radius: 5px;
}
.notificationWrapper::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
.notificationWrapper::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
.notificationWrapper::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.1);
}

.singleNotiWrapper {
  width: 100%;
  display: flex;
  min-height: 60px;
  /* max-height: 55px; */
  padding: 30px 10px;
  border-bottom: 1px solid #ececec;
  align-items: center;
  justify-content: flex-start;
}
.triangle {
  position: absolute;
  width: 0;
  height: 0;
  top: 30px;
  right: 27px;
  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  border-bottom: 10px solid white;
  z-index: 1001;
}
.triangleBorder {
  top: 29px;
  border-bottom: 10px solid #e0e0e0;
  z-index: 2;
}

.notiContent {
  margin-left: 0.5em;
  font-size: 1em;
}

.notiProfileImage {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.notiFrom {
  font-weight: 700;
}
.notiInfoWrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.profile-image {
  width: 25px;
  height: 25px;
  border-radius: 15px;
}
</style>