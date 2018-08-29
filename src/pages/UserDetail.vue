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
        <v-tabs fixed-tabs v-model="tab" class="tabsTitleWrapper">
          <v-tab :key="1" class="tabTitle">
            정보
          </v-tab>
          <v-tab :key="2" class="tabTitle">
            업로드한 자보
          </v-tab>
          <v-tab :key="3" class="tabTitle">
            팔로우 하는 유저
          </v-tab>
        </v-tabs>
        <v-tabs-items class="tabsWrapper" v-if="!loading && !reRender" v-model="tab">
          <v-tab-item :key="1">
            <other-user-profile :valid="true" :email="email" :nickName="nickName" :gender="gender" :first="first_name" :last="last_name" :image="profile_image"></other-user-profile>
          </v-tab-item>
          <v-tab-item :key="2">
            <div v-if="!zaboLoading" class="zaboListWrapper">
              <div v-if="zaboes.length == 0">업로드한 자보가 존재하지 않습니다.</div>
              <template v-else>
                <div class="zaboWrapper" v-for="(zabo,index) in computedZaboes" :key="index">
                  <img @click="zaboDetail(zabo.id, zabo.author.nickName, zabo)" :src="zabo.posters[0].image" class="zaboImage">
                  <span class="zaboTitle">{{zabo.title}}</span>
                </div>
              </template>
            </div>
          </v-tab-item>
          <v-tab-item :key="3">
            <div class="followWrapper">
                <div class="userWrapper" @click="userDetail(user.id)" v-for="(user, index) in following" :key="index">
                  <div class="userInfoWrapper">
                    <img :src="user.profile_image" v-if="user.profile_image != null" class="userImage">
                    <img src="../assets/default_person.png" v-else class="userImage">
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
      <zabo-detail-modal :modalZaboData="modalZaboData" @closeModal="closeModal" :zaboId="this.modalZaboId" v-if="modalState"></zabo-detail-modal>
    </div>
  </div>
</template>

<script>
import axios from "@/axios-auth";
import OtherUserProfile from "./Userprofile/OtherUserProfile";
import ZaboDetailModal from "@/components/ZaboDetailModal";
import * as types from "@/store/mutation-types";

export default {
  name: "userDetail",
  created() {
    this.fetchData();
  },
  components: {
    OtherUserProfile,
    ZaboDetailModal
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
      zaboes: [],
      email: "",
      nickName: "",
      profile_image: null,
      profilePreview: null,
      loading: true,
      modalState: false,
      zaboLoading: false,
      reRender: false
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
      window.history.pushState(null, null, [
        `/user/detail/${this.$route.params.userId}`
      ]);
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
      window.history.pushState(null, null, [`/`]);
    },
    fetchData() {
      let userId = this.$route.params.userId;
      this.reRender = true;
      axios.get(`/api/users/${userId}/`).then(res => {
        const {
          first_name,
          last_name,
          gender,
          joined_date,
          profile_image,
          following,
          nickName,
          email
        } = res.data;
        this.imagesrc = profile_image;
        this.first_name = first_name;
        this.last_name = last_name;
        this.gender = gender;
        this.joined_date = joined_date;
        this.following = following;
        this.nickName = nickName;
        this.email = email;
        this.loading = false;
        this.reRender = false;
      });
      axios.get(`/api/zaboes/?author=${userId}`).then(res => {
        this.zaboes = res.data.data;
        this.zaboLoading = false;
      });
    }
  },
  computed: {
    computedZaboes() {
      let finalZaboes = [];
      if (this.zaboes != []) {
        for (let i = 0; i < this.zaboes.length; i++) {
          if (this.zaboes[i].posters.length > 0) {
            finalZaboes.push(this.zaboes[i]);
          }
        }
      }
      return finalZaboes;
    }
  },
  watch: {
    "$route.params.userId": function(val) {
      this.loading = true;
      this.zaboLoading = true;
      this.fetchData();
    }
  }
};
</script>

<style scoped lang='scss'>
.totalWrapper {
  @include marginPage();
  top: 0;
  @include breakPoint("phone") {
    left: 5%;
    right: 5%;
  }
  #whole {
    width: 100%;
    text-align: center;
    .user-profile {
      width: 100%;
      height: 20px;
      text-align: center;
      font-size: $biggest-font-size;
      font-family: Nanumsquare;
      font-weight: 900;
      margin-bottom: 20px;
      @include breakPoint("phone") {
        font-size: $big-font-size;
      }
    }
    .profile-image {
      height: 100px;
      width: 100px;
      border-radius: 100px;
      margin-top: 20px;
    }
    #name {
      font-family: Nanumsquare;
      font-size: $biggest-font-size;
      font-weight: 800;
      padding-top: 10px;
      // height: 54px;
      @include breakPoint("phone") {
        font-size: $big-font-size;
      }
    }
    .name-image {
      display: flex;
      justify-content: center;
      align-items: center;
      .profile-image-preview {
        height: 100px;
        width: 100px;
        border-radius: 100px;
        margin-top: 20px;
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
        &:hover {
          background-color: rgba(223, 223, 223, 0.171);
        }
      }
    }
    .tabsTitleWrapper {
      margin-top: 20px;
      margin-bottom: 20px;
      .tabTitle {
        font-size: $big-font-size;
        font-weight: 800;
        @include breakPoint("phone") {
          font-size: $normal-font-size;
        }
      }
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
    .tabsWrapper {
      margin-bottom: 68px;
      .zaboListWrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        .zaboWrapper {
          display: flex;
          min-width: 201px;
          max-width: 201px;
          height: 100%;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
          .zaboTitle {
            width: 100%;
            font-size: $h1-font-size;
            font-weight: 700;
            line-height: 1.2;
          }
          .zaboImage {
            width: 183px;
            height: 286px;
            margin-bottom: 0.75em;
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.24);
            cursor: pointer;
            transition: all 0.2s ease;
            &:hover {
              box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.3);
            }
          }
        }
      }
      .followWrapper {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        .userWrapper {
          width: 30%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          cursor: pointer;
          border: 1px solid #ececec;
          border-radius: 3px;
          padding: 15px 20px;
          margin-bottom: 15px;
          .userInfoWrapper {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .userImage {
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
            .userName {
              font-size: $big-font-size;
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
          @include breakPoint("phone") {
            width: 45%;
            .userInfoWrapper {
              .userImage {
                width: 35px;
                height: 35px;
              }
              .userName {
                font-size: $normal-font-size;
              }
            }
          }
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
  .button-active {
    width: 40px;
    height: 3px;
    background-color: #12397d;
    margin-top: 11px;
    display: inline-block;
  }
}
</style>
