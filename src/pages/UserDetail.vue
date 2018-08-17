<template>
  <div class="totalWrapper">
    <v-app style="background-color: white">
      <div id="whole">
        <div style="width:100%; height:90px;"></div>
        <div class="user-profile">
          프로필
        </div>
        <div>
          <img :src="imagesrc" class="profile-image">
          <p id="name"> {{ first_name + " " + last_name }} </p>
        </div>
        <v-tabs fixed-tabs v-model="tab" style="margin-top: 20px; margin-bottom: 20px;">
          <v-tab :key="1" style="font-size: 17pt; font-weight: 800;">
            정보
          </v-tab>
          <v-tab :key="2" style="font-size: 17pt; font-weight: 800;">
            업로드한 자보
          </v-tab>
          <v-tab :key="3" style="font-size: 17pt; font-weight: 800;">
            팔로우 하는 유저
          </v-tab>
        </v-tabs>
        <v-tabs-items v-if="!loading" v-model="tab" style="height: 500px;">
          <v-tab-item :key="1">
            <profile :valid="valid" :first="first_name" :last="last_name" :image="profile_image"></profile>
          </v-tab-item>
          <v-tab-item :key="2">
            <div class="zaboListWrapper">
            </div>
          </v-tab-item>
          <v-tab-item :key="3">
            <div class="followWrapper">
                <div class="userWrapper" @click="userDetail(user.id)" v-for="(user, index) in following" :key="index">
                  <div class="userInfoWrapper">
                    <img :src="user.profile_image" class="userImage">
                    <span class="userName">{{user.nickName}}</span>
                  </div>
                </div>
                <div class="doesNotExist" v-show="following.length == 0">
                  <span>{{$t('팔로잉 중인 유저가 없습니다.')}}</span>
                </div>
              </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-app>
    <div v-if="modalState" class="zaboModalWrapper">
      <!-- <zabo-detail-modal :modalZaboData="modalZaboData" @closeModal="closeModal" :zaboId="this.modalZaboId" v-if="modalState"></zabo-detail-modal> -->
    </div>
  </div>
</template>

<script>
import axios from "@/axios-auth";
import Profile from "./Userprofile/Profile";
import ZaboDetailModal from "@/components/ZaboDetailModal";
import * as types from "@/store/mutation-types";

export default {
  name: "userDetail",
  created() {
    axios.get(`/api/users/${this.$route.params.userId}/`).then(res => {
      const {
        first_name,
        last_name,
        gender,
        joined_date,
        profile_image,
        following
      } = res.data;
      console.log(res);
      this.imagesrc = profile_image;
      this.first_name = first_name;
      this.last_name = last_name;
      this.gender = gender;
      this.joined_date = joined_date;
      this.following = following;
      this.loading = false;
    });
  },
  components: {
    profile: Profile
  },
  data() {
    return {
      valid: false,
      tab: "tab1",
      imagesrc: "",
      first_name: "",
      last_name: "",
      gender: "",
      joined_date: "",
      following: [],
      profile_image: null,
      profilePreview: null,
      loading: true,
      modalState: false,
    };
  },
  methods: {
    tab1() {
      this.tab = "tab1";
    },
    tab2() {
      this.tab = "tab2";
    },
    tab3() {
      this.tab = "tab3";
    },
    userDetail(id) {
      this.$router.push({ name: "UserDetail", params: { userId: id } });
    },
    zaboDetail(id, nickname, zaboData) {
      if (nickname !== "None") {
        this.modalState = true;
        this.modalZaboData = zaboData;
        window.history.pushState(null, null, [`/zabo/${id}`]);
        this.modalZaboId = id;
      }
    },
    closeModal() {
      this.modalState = false;
      window.history.pushState(null, null, [`/user/detail/${this.$route.params.userId}`]);
    },
  }
};
</script>

<style scoped>
#whole {
  width: 70%;
  height: 2000px;
  margin-left: 15%;
  /* margin-top: 90px; */
  text-align: center;
}

.user-profile {
  width: 100px;
  height: 20px;
  text-align: left;
  font-size: 22pt;
  font-family: Nanumsquare;
  font-weight: 900;
}

#name {
  font-family: Nanumsquare;
  font-size: 25pt;
  font-weight: 800;
  padding-top: 10px;
  height: 54px;
}

.profile-image {
  height: 100px;
  width: 100px;
  border-radius: 100px;
  margin-top: 20px;
}

.profile-image-preview {
  height: 100px;
  width: 100px;
  border-radius: 100px;
  margin-top: 20px;
}

.tabs {
  position: -webkit-sticky;
}

.tab {
  font-family: Nanumsquare;
  font-size: 17pt;
  font-weight: 700;
  text-align: center;
  width: 150px;
  margin-left: 10px;
  height: 50px;
  border: 0px;
  background-color: white;
  cursor: pointer;
}

.button-active {
  width: 40px;
  height: 3px;
  background-color: #12397d;
  margin-top: 11px;
  display: inline-block;
}

.tab:focus {
  outline: none;
  border: none;
}

.first {
  width: 120px;
  margin-right: 35px;
  display: inline-block;
}

.last {
  width: 170px;
  display: inline-block;
}

.name-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.imageChange {
  width: 100px;
  height: 100px;
  border-radius: 100px;
  background-color: rgba(255, 255, 255, 0.397);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
}

.imageChange:hover {
  background-color: rgba(223, 223, 223, 0.171);
}
</style>
