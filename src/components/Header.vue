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
        <router-link to="/list">
          <div class="button left">
            {{ $t('모아보기') }}
          </div>
        </router-link>
      </div>
      <div class="column">
        <div class="right">
          <v-icon @click="onSearch" class="searchIcon">search</v-icon>
        </div>
        <div style="position: relative;" v-if="loggedInState">
          <v-icon @click="notificationModalStateChange" class="right">notifications</v-icon>
          <notification-modal :notifications="notifications" :notificationsModal="notificationsModal"></notification-modal>
        </div>
        <template v-if="loggedInState">
          <div @click="modalStateChange" class="right">
            <img src="../assets/default_person.png" v-if="imagesrc == null" class="profile-image" >
            <img v-else :src="imagesrc" class="profile-image">
          </div>
          <div v-show="profileModalState" class="profileModalWrapper" >
            <div @click="logout" class="singleTapWrapper">
              <v-icon medium class="profileIcons">power_settings_new</v-icon>
              <span class="profileSpan">{{$t('로그아웃')}}</span>
            </div>
            <div @click="profilePush" class="singleTapWrapper">
              <v-icon medium class="profileIcons">person</v-icon>
              <span class="profileSpan">{{$t('프로필 관리')}}</span>
            </div>
          </div>
          <div v-show="profileModalState" class="profileTriangle"></div>
          <div v-show="profileModalState" class="profileTriangle profileTriangleBorder"></div>
        </template>
        <template v-else>
          <div @click="login" class="button right">
            {{ $t('로그인') }}
          </div>
        </template>
        <div @click="setLang" class="button right">
          {{ this.computedLang }}
        </div>
        <div>
        <div class="mobile-right">
          <v-icon @click="onSearch" class="searchIcon">search</v-icon>
        </div>
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
            <img src="@/assets/dropdownClose.svg" />
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
      <router-link to="/list">
        <div @click="dropdownClose" class="dropdown-content">
          {{ $t('모아보기') }}
        </div>
      </router-link>
      <div class="dropdown-content" @click="login" v-if="!loggedInState">
        {{ $t('로그인') }}
      </div>
      <div class="dropdown-content" @click="logout" v-else>
        {{ $t('로그아웃')}}
      </div>
    </div>
    <search-modal @closeSearchModal="searchModalState = false" v-if="searchModalState"/>
  </div>
</template>

<script>
import app from "@/main";
import SearchModal from "@/components/SearchModal";
import NotificationModal from "@/components/NotificationModal";

export default {
  name: "Header",
  components: {
    SearchModal,
    NotificationModal
  },
  data() {
    return {
      lang: "kr",
      notificationsModal: false,
      isDropdownOpened: false,
      profileModalState: false,
      searchModalState: false
    };
  },
  props: {
    loggedInState: Boolean,
    profileImageLoading: Boolean
  },
  methods: {
    modalStateChange() {
      this.profileModalState = !this.profileModalState;
      this.notificationsModal = false;
    },
    notificationModalStateChange() {
      this.notificationsModal = !this.notificationsModal;
      this.profileModalState = false;
    },
    login: function() {
      this.$emit("logged-in");
    },
    logout: function() {
      this.$store.commit("LOGOUT");
      this.profileModalState = false;
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
    dropdownOpen() {
      this.isDropdownOpened = true;
    },
    dropdownClose() {
      this.isDropdownOpened = false;
    },
    profilePush() {
      this.profileModalState = false;
      this.$router.push({ name: "Zabouserprofile" });
    },
    onSearch() {
      this.searchModalState = true;
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
    },
    profileLoading() {
      return this.profileImageLoading;
    }
  }
};
</script>

<style scoped lang='scss'>
.sandbox {
  width: 100%;
  min-height: 78px;
  position: fixed;
  background-color: rgb(255, 255, 255);
  z-index: 400;
  display: flex;
  flex-direction: column;
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
.right {
  margin-right: 27px;
}
.mobile-right {
  margin-right: 10px;
}
.logo {
  height: 37px;
  margin-left: 27px;
}

.topline {
  width: 100%;
  height: 5px;
  background-color: #12397d;
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
  cursor: pointer;
}

.profileTriangle {
  position: absolute;
  width: 0;
  height: 0;
  top: 68px;
  right: 80px;
  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  border-bottom: 10px solid white;
  z-index: 450;
}
.profileTriangleBorder {
  top: 67px;
  border-bottom: 10px solid #e0e0e0;
  z-index: 2;
}
.profileIcons {
  margin-right: 0.25em;
}

.profile-image {
  width: 25px;
  height: 25px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  @include smallBoxShadow();
}
.profile-image:hover {
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
}

.profileModalWrapper {
  position: absolute;
  top: 78px;
  right: 60px;
  background-color: white;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  z-index: 450;
  padding: 0px 5px;
}
.singleTapWrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  font-size: 1em;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.87);
}
.profileSpan {
  font-size: 1.125em;
}

.singleTapWrapper:first-child {
  border-bottom: 1px solid #ececec;
}
@include breakPoint("tablet") {
  .dropdown,
  .mobile-right {
    display: none;
  }
}
@include breakPoint("desktop") {
  .dropdown,
  .mobile-right {
    display: none;
  }
}

@include breakPoint("phone") {
  .sandbox {
    width: 100%;
    min-height: 64px;
    position: fixed;
    background-color: rgb(255, 255, 255);
    z-index: 400;
    display: flex;
    flex-direction: column;
  }
  .Buttons {
    width: 100%;
    height: 59px;
    display: flex;
  }
  .button {
    display: none;
    cursor: pointer;
  }
  .right {
    display: none;
  }
  .logo {
    height: 27px;
    margin-left: 15px;
  }
  .dropdown {
    margin-right: 15px;
    cursor: pointer;
  }
  .column {
    &:last-child {
      flex: 1.8;
    }
  }
}
</style>
