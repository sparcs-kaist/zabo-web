<template lang=''>
<div>
  <div class="totalWrapper">
    <div class="tabsWrapper">
      <div :class="selectedTab == 1 ? 'selectedTab tab' : 'tab'" ><span class="tabSpan" @click="selectTab(1)">자보 검색결과</span></div>
      <div :class="selectedTab == 2 ? 'selectedTab tab' : 'tab'" ><span class="tabSpan" @click="selectTab(2)">페이퍼 검색결과</span></div>
    </div>
    <v-progress-circular
      v-show="selectedTab == 1"
      v-if="zaboIsLoading"
      indeterminate
      color="primary"
      class="ListWrapper"
    ></v-progress-circular>
    <div v-show="selectedTab == 1" class="ListWrapper" v-else>
      <div class="zaboWrapper" v-if="zabo.posters.length > 0" :key="zabo.id" v-for="zabo in zaboList">
        <img @click="zaboDetail(zabo.id, zabo.author.nickName, zabo)" :src="zabo.posters[0].image" class="zaboImage">
        <span class="zaboTitle">{{zabo.title}}</span>
      </div>
      <div class="doesNotExist" v-show="zaboList.length == 0">
        <span>{{$t('자보가 존재하지 않습니다.')}}</span>
      </div>
    </div>
    <v-progress-circular
      v-show="selectedTab == 2"
      v-if="userIsLoading"
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
      <div class="doesNotExist" v-show="userList.length == 0">
        <span>{{$t('유저가 존재하지 않습니다.')}}</span>
      </div>
    </div>
  </div>
  <div v-if="computedModalState" class="zaboModalWrapper">
    <zabo-detail-modal :modalZaboData="modalZaboData" @closeModal="closeModal" :zaboId="this.computedZaboId" v-if="computedModalState"></zabo-detail-modal>
  </div>
</div>
</template>
<script>
import axios from "@/axios-auth";
import ZaboDetailModal from "@/components/ZaboDetailModal";

export default {
  created() {
    this.searchZaboes();
  },
  data() {
    return {
      zaboList: [],
      userList: [],
      zaboIsLoading: true,
      userIsLoading: true,
      modalZaboId: -1,
      modalState: false,
      following: {},
      modalZaboData: {},
      reRender: false,
      selectedTab: 1
    };
  },
  props: {
    searchValue: String
  },
  components: {
    ZaboDetailModal
  },
  computed: {
    searchedZaboList() {
      return this.zaboList;
    },
    computedZaboId() {
      return this.modalZaboId;
    },
    computedModalState() {
      return this.modalState;
    }
  },
  watch: {
    searchValue: function(search) {
      this.isLoading = true;
      this.searchTerm = search;
      this.searchZaboes();
    }
  },
  methods: {
    selectTab(num) {
      this.selectedTab = num;
    },
    async searchZaboes() {
      this.zaboIsLoading = true;
      this.userIsLoading = true;
      this.userList = [];
      this.following = {};
      await axios({
        methods: "get",
        url: `/api/zaboes/?search=${this.searchValue}`
      })
        .then(response => {
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
      await axios({
        methods: "get",
        url: `/api/users/?search=${this.searchValue}`,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
        .then(response => {
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
    },
    closeModal() {
      this.modalState = false;
      window.history.pushState(null, null, [`/search`]);
    },
    zaboDetail(id, nickname, zaboData) {
      if (nickname !== "None") {
        this.modalState = true;
        this.modalZaboData = zaboData;
        window.history.pushState(null, null, [`/zabo/${id}`]);
        this.modalZaboId = id;
      }
    },
    userDetail(id) {
      this.$router.push({ name: "UserDetail", params: { userId: id } });
    },
    followUser(nickName, index) {
      if (localStorage.getItem("token")) {
        if (localStorage.getItem("token").split(" ")[0] == "ZABO") {
          axios({
            url: "/api/users/followOther/",
            method: "post",
            headers: {
              Authorization: localStorage.getItem("token")
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
      if (localStorage.getItem("token")) {
        if (localStorage.getItem("token").split(" ")[0] == "ZABO") {
          axios({
            url: "/api/users/unfollowOther/",
            method: "post",
            headers: {
              Authorization: localStorage.getItem("token")
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
<style scoped lang='scss'>
.totalWrapper {
  width: 100%;
  padding-top: 27px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  .tabsWrapper {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    .tab {
      flex: 1;
      .tabSpan {
        font-size: $big-font-size;
        cursor: pointer;
        @include breakPoint("phone") {
          font-size: $normal-font-size;
        }
      }
      &:first-child {
        text-align: right;
        margin-right: 15px;
      }
      &:last-child {
        text-align: left;
        margin-left: 15px;
      }
    }
    .selectedTab {
      font-weight: $big-font-weight;
      color: $theme-color;
    }
  }
  .ListWrapper {
    width: 100%;
    min-width: 400px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: 2em;
    .zaboWrapper {
      display: flex;
      min-width: 201px;
      height: 100%;
      flex-direction: column;
      align-items: center;
      margin-bottom: 2em;
      margin-right: 10px;
      .zaboImage {
        width: 183px;
        height: 286px;
        margin-bottom: 0.75em;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.24);
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .zaboImage:hover {
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16),
          0px 4px 10px rgba(0, 0, 0, 0.24);
      }
      .zaboTitle {
        font-size: 1.25em;
        font-weight: 900;
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
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;
      border: 1px solid #ececec;
      border-radius: 3px;
      padding: 15px 20px;
      margin-right: 10px;
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
.zaboModalWrapper {
  width: 100%;
  position: absolute;
  top: 78px;
  bottom: 68px;
}
</style>
