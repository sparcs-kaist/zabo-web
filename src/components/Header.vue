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
            <img src="../assets/dropdownClose.svg"/>
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
  data() {
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
    login: function() {
      this.$emit("logged-in");
    },
    logout: function() {
      this.$store.commit("LOGOUT");
    },
    setLang: function() {
      if (this.lang === "kr") {
        this.$i18n.set("en");
        this.lang = "en";
      } else {
        this.$i18n.set("kr");
        this.lang = "kr";
      }
    },
    onSearch(searchTerm) {
      this.$router.push({ name: "ZaboSearch", params: { search: searchTerm } });
      this.searchTerm = "";
    },
    dropdownOpen() {
      this.isDropdownOpened = true;
    },
    dropdownClose() {
      this.isDropdownOpened = false;
    }
  },
  computed: {
    computedLang: function() {
      if (this.lang === "kr") {
        return "en";
      } else {
        return "kr";
      }
    },
    notifications() {
      return this.$store.getters.getNotifications;
    },
    imagesrc() {
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
    ]cursor: pointer;
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

.profile-image {
  width: 25px;
  height: 25px;
  border-radius: 15px;
}
</style>
