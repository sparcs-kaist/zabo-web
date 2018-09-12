<template lang=''>
<div id="searchModalWrapper">
  <div id="searchBar">
    <input v-model="searchValue" type="text" class="searchInput" @keyup.enter="totSearch"></input>
    <v-icon @click="closeModal" large class="searchIcon">clear</v-icon>
  </div>
  <div class="tabsWrapper">
    <div :class="`tabs ${selectedTab == 1 && 'selectedtab'}`" @click="selectTab(1)">자보</div>
    <div :class="`tabs ${selectedTab == 2 && 'selectedtab'}`" @click="selectTab(2)">유저</div>
  </div>
  <div class="listTotalWrapper">
    <v-progress-circular
      v-show="selectedTab == 1"
      v-if="zaboIsLoading"
      indeterminate
      color="primary"
      class="ListWrapper"
    ></v-progress-circular>
    <div v-show="selectedTab == 1" class="ListWrapper" v-else>
      <div class="zaboWrapper">
        <div v-if="zabo.posters.length > 0" :key="zabo.id" v-for="zabo in zaboList" class="miniViewWrapper">
          <mini-view @userDetail="userDetail" :zabo="zabo"></mini-view>
        </div>
      </div>
      <button v-if="zaboMore" @click="searchZabo(false)" class="more">더보기</button>
      <div class="doesNotExist" v-show="zaboList.length == 0">
        <span>{{$t('자보가 존재하지 않습니다.')}}</span>
      </div>
    </div>
    <v-progress-circular
      v-show="selectedTab == 2"
      v-if="zaboIsLoading"
      indeterminate
      color="primary"
      class="ListWrapper"
    ></v-progress-circular>
    <div v-show="selectedTab == 2" class="ListWrapper" v-else>
      <div v-if="reRender == false" class="userWrapper" :key="index" v-for="(user, index) in userList">
        <div @click="userDetail(user.id)" class="userInfoWrapper">
          <img :src="user.profile_image" class="userImage">
          <span class="userName">{{user.nickName}}</span>
        </div>
        <button v-if="!following[index]" class="Follow" @click="followUser(user.nickName, index)">
          팔로우
        </button>
        <button v-if="following[index]" class="Follow" @click="unfollowUser(user.nickName, index)">
          팔로우 취소
        </button>
      </div>
      <button v-if="zaboMore" @click="searchUser(false)" class="more">더보기</button>
      <div class="doesNotExist" v-show="userList.length == 0">
        <span>{{$t('유저가 존재하지 않습니다.')}}</span>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import MiniView from "@/components/MiniView";
import axios from "@/axios-auth.js";

export default {
  data() {
    return {
      selectedTab: 1,
      searchValue: "",
      zaboIsLoading: false,
      userIsLoading: false,
      reRender: false,
      zaboList: [],
      userList: [],
      zaboNext: null,
      userNext: null,
      following: {}
    };
  },
  components: {
    MiniView
  },
  computed: {
    zaboMore() {
      return this.zaboNext != null;
    },
    userMore() {
      return this.userNext != null;
    }
  },
  methods: {
    selectTab(num) {
      if (num == 1) {
        this.selectedTab = 1;
      } else {
        this.selectedTab = 2;
      }
    },
    closeModal() {
      this.$emit("closeSearchModal");
    },
    totSearch() {
      this.searchZabo(true);
      this.searchUser(true);
    },
    searchZabo(first) {
      if (first) {
        this.zaboIsLoading = true;
        axios({
          methods: "get",
          url: `/api/zaboes/?search=${this.searchValue}&page=1`
        })
          .then(response => {
            this.zaboNext = response.data.links.next;
            if (response.status == 200) {
              this.zaboList = response.data.data;
              this.zaboIsLoading = false;
              return response.data.data;
            } else if (response.status == 404) {
              this.zaboIsLoading = false;
            }
          })
          .then(err => {
            this.zaboIsLoading = false;
          });
      } else {
        axios({
          methods: "get",
          url: this.zaboNext
        })
          .then(response => {
            this.zaboNext = response.data.links.next;
            if (response.status == 200) {
              this.zaboList.push(response.data.data);
              this.zaboIsLoading = false;
              return response.data.data;
            } else if (response.status == 404) {
              this.zaboIsLoading = false;
            }
          })
          .catch(err => {
            this.zaboIsLoading = false;
          });
      }
    },
    searchUser(first) {
      if (first) {
        this.userIsLoading = true;
        this.userList = [];
        this.following = {};
        axios({
          methods: "get",
          url: `/api/users/?search=${this.searchValue}&page=1`,
          headers: {
            Authorization: sessionStorage.getItem("token")
          }
        })
          .then(response => {
            this.userNext = response.data.links.next;
            if (response.status == 200) {
              this.userList = response.data.data;
              if (this.userList.length > 0) {
                for (let i = 0; i < this.userList.length; i++) {
                  this.following[i] = this.userList[i].is_following;
                }
              }
              this.userIsLoading = false;
            } else if (response.status == 404) {
              this.userIsLoading = false;
            }
          })
          .catch(err => {
            this.userIsLoading = false;
          });
      } else {
        axios({
          methods: "get",
          url: this.userNext,
          headers: {
            Authorization: sessionStorage.getItem("token")
          }
        })
          .then(response => {
            this.userNext = response.data.links.next;
            if (response.status == 200) {
              this.userList.push(response.data.data);
              for (let i = 0; i < this.userList.length; i++) {
                this.following[i] = this.userList[i].is_following;
              }
              this.userIsLoading = false;
            } else if (response.status == 404) {
              this.userIsLoading = false;
            }
          })
          .catch(err => {
            this.userIsLoading = false;
          });
      }
    },
    userDetail(id) {
      this.$emit("closeSearchModal");
      this.$router.push({ name: "UserDetail", params: { userId: id } });
    },
    followUser(nickName, index) {
      if (sessionStorage.getItem("token")) {
        if (sessionStorage.getItem("token").split(" ")[0] == "ZABO") {
          axios({
            url: "/api/users/followOther/",
            method: "post",
            headers: {
              Authorization: sessionStorage.getItem("token")
            },
            data: {
              nickname: nickName
            }
          })
            .then(res => {
              if (res.status == 201) {
                this.following[index] = true;
                this.reRender = true;
                this.$nextTick(() => {
                  this.reRender = false;
                });
              }
            })
            .catch(err => {});
        }
      } else {
        alert("로그인을 해주세요!");
      }
    },
    unfollowUser(nickName, index) {
      if (sessionStorage.getItem("token")) {
        if (sessionStorage.getItem("token").split(" ")[0] == "ZABO") {
          axios({
            url: "/api/users/unfollowOther/",
            method: "post",
            headers: {
              Authorization: sessionStorage.getItem("token")
            },
            data: {
              nickname: nickName
            }
          })
            .then(res => {
              if (res.status == 201) {
                this.following[index] = false;
                this.reRender = true;
                this.$nextTick(() => {
                  this.reRender = false;
                });
              }
            })
            .catch(err => {});
        }
      }
    }
  }
};
</script>
<style lang='scss' scoped>
#searchModalWrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  #searchBar {
    width: 100%;
    min-height: 100px;
    padding: 20px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: $normal-font-size;
    .searchInput {
      border: none;
      flex: 1;
      text-align: center;
      font-size: $big-font-size;
      padding-left: 5px;
      margin-left: 25px;
      &:focus {
        outline: none;
      }
      @include breakPoint("phone") {
        height: 30px;
        .searchInput {
          height: 28px;
        }
      }
    }
  }
  .tabsWrapper {
    width: 100%;
    display: flex;
    background-color: white;
    min-height: 45px;
    .tabs {
      flex: 1;
      font-size: $big-font-size;
      text-align: center;
      border-bottom: 2px solid $light-gray;
      cursor: pointer;
    }
    .selectedtab {
      border-bottom: 2px solid $theme-color;
    }
    @include breakPoint("phone") {
      min-height: 40px;
      .tabs {
        font-size: $h1-font-size;
      }
    }
  }
  .listTotalWrapper {
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    @include scrollBarDark(small);
    .ListWrapper {
      width: 100%;
      min-width: 400px;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      flex-wrap: wrap;
      margin-bottom: 2em;
      padding: 20px;
      .zaboWrapper {
        display: flex;
        height: 100%;
        align-items: flex-start;
        justify-content: space-around;
        flex-wrap: wrap;
        margin-bottom: 2em;
        margin-right: 10px;
        .miniViewWrapper {
          width: 100%;
          @include breakPoint("desktop") {
            width: 40%;
          }
        }
      }
      .doesNotExist {
        width: 100%;
        height: 100px;
        background-color: #ececec;
        font-size: 2em;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .userWrapper {
        display: flex;
        width: 100%;
        @include breakPoint("desktop") {
          width: 30%;
        }
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        cursor: pointer;
        border: 1px solid #ececec;
        border-radius: 3px;
        padding: 15px 20px;
        .userInfoWrapper {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .userImage {
            width: 45px;
            height: 45px;
            border-radius: 50%;
          }
          .userName {
            font-size: 1.875em;
            font-weight: 700;
            margin-left: 10px;
          }
        }
        .Follow {
          width: 100%;
          height: 30px;
          background-color: #12397d;
          border-radius: 3px;
          color: white;
          margin-top: 1em;
        }
      }
    }
  }
}
.more {
  @include largeButton(theme);
}
</style>
