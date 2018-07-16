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
        <div class="dropdown">
          <div class="bar-container">
            <div class="minibar">
            </div>
            <div class="minibar">
            </div>
            <div class="minibar">
            </div>
          </div>
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
  data() {
    return {
      lang: "kr",
      searchValue: ""
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
    }
  },
  computed: {
    computedLang: function() {
      if (this.lang === "kr") {
        return "en";
      } else {
        return "kr";
      }
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 900px) {
  .sandbox {
    width: 100%;
    height: 78px;
    position: fixed;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 500;
    display: flex;
    flex-direction: column;
  }
}

@media screen and (max-width: 899px) {
  .sandbox {
    width: 100%;
    height: 64px;
    position: fixed;
    background-color: rgba(255, 255, 255, 0.9);
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

.logo {
  height: 37px;
  margin-left: 27px;
}

@media screen and (min-width: 900px) {
  .dropdown {
    display: none;
  }
}

@media screen and (max-width: 899px) {
  .dropdown {
    margin-right: 15px;
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
</style>
