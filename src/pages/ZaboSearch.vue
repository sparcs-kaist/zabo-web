<template lang=''>
<div>
  <div class="totalWrapper">
    <span class="header">{{$t("자보 검색 결과")}}</span>
    <v-progress-circular
        v-if="zaboIsLoading"
        indeterminate
        color="primary"
        class="ListWrapper"
      ></v-progress-circular>
    <div class="ListWrapper" v-else>
      <div class="zaboWrapper" v-if="zabo.posters.length > 0" :key="zabo.id" v-for="zabo in zaboList">
        <img @click="zaboDetail(zabo.id, zabo.author.nickName, zabo)" :src="zabo.posters[0].image" class="zaboImage">
        <span class="zaboTitle">{{zabo.title}}</span>
      </div>
      <div class="doesNotExist" v-show="zaboList.length == 0">
        <span>{{$t('자보가 존재하지 않습니다.')}}</span>
      </div>
    </div>
    <span class="header">{{$t("유저 검색 결과")}}</span>
    <v-progress-circular
        v-if="userIsLoading"
        indeterminate
        color="primary"
        class="ListWrapper"
      ></v-progress-circular>
    <div class="ListWrapper" v-else>
      <div class="userWrapper" :key="index" v-for="(user, index) in userList">
        <div @click="userDetail(user.nickName)" class="userInfoWrapper">
          <img :src="user.profile_image" class="userImage">
          <span class="userName">{{user.nickName}}</span>
        </div>
        <button v-show="!following" class="Follow" @click="followUser(user.nickName)">
          팔로우
        </button>
        <button v-show="following" class="Follow" @click="unfollowUser(user.nickName)">
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
      searchTerm: "",
      modalState: false,
      following: false,
      modalZaboData: {}
    };
  },
  components: {
    ZaboDetailModal
  },
  computed: {
    searchValue() {
      return this.$route.params.search;
    },
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
    "$route.params.search": function(search) {
      this.isLoading = true;
      this.searchTerm = search;
      this.searchZaboes();
    }
  },
  methods: {
    searchZaboes() {
      this.zaboIsLoading = true;
      this.userIsLoading = true;
      axios({
        methods: "get",
        url: `api/zaboes/?search=${this.$route.params.search}`
      })
        .then(response => {
          if (response.status == 200) {
            this.zaboList = response.data.data;
            this.userIsLoading = false;
            return response.data.data;
          } else if (response.status == 404) {
            this.zaboIsLoading = false;
          }
        })
        .then(err => {
          console.log(err);
          this.zaboIsLoading = false;
        });
      axios({
        methods: "get",
        url: `api/users/?search=${this.$route.params.search}`
      })
        .then(response => {
          if (response.status == 200) {
            this.userList = response.data.data;
            this.userIsLoading = false;
          } else if (response.status == 404) {
            this.userIsLoading = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.userIsLoading = false;
        });
    },
    closeModal() {
      this.modalState = false;
      window.history.pushState(null, null, [`/search/${this.searchTerm}`]);
    },
    zaboDetail(id, nickname, zaboData) {
      if (nickname !== "None") {
        this.modalState = true;
        this.modalZaboData = zaboData;
        window.history.pushState(null, null, [`/zabo/${id}`]);
        this.modalZaboId = id;
      }
    },
    userDetail(nickName) {
      this.$router.push({ name: "UserDetail", params: { nickName: nickName } });
    },
    followUser(nickName) {
      axios({
        url: "api/users/followOther/",
        method: "post",
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: {
          nickname: nickName
        }
      }).then(res => {
        this.following = true;
        console.log(res);
      });
    },
    unfollowUser(nickName) {
      axios({
        url: "api/users/unfollowOther/",
        method: "post",
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: {
          nickname: nickName
        }
      }).then(res => {
        console.log(res);
        this.following = false;
      });
    }
  }
};
</script>
<style scoped lang=''>
.totalWrapper {
  width: 100%;
  position: absolute;
  top: 78px;
  left: 0;
  bottom: 0;
  right: 0;
  padding-top: 27px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.header {
  font-size: 1.375em;
  font-weight: 900;
  width: 70%;
  /* min-width: 900px; */
  text-align: left;
  margin-bottom: 20px;
}
.ListWrapper {
  width: 70%;
  min-width: 400px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 2em;
}
.zaboWrapper {
  display: flex;
  min-width: 201px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2em;
  margin-right: 10px;
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
}
.userInfoWrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.Follow {
  width: 100%;
  height: 30px;
  background-color: #12397d;
  border-radius: 3px;
  color: white;
  margin-top: 1em;
}
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
.zaboImage {
  width: 183px;
  height: 286px;
  margin-bottom: 0.75em;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  transition: all 0.3s ease;
}
.zaboImage:hover {
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16), 0px 4px 10px rgba(0, 0, 0, 0.24);
}
.zaboTitle {
  font-size: 1.25em;
  font-weight: 900;
}
.zaboModalWrapper {
  width: 100%;
  position: absolute;
  top: 78px;
  bottom: 68px;
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
</style>
