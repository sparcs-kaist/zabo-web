<template>
  <div class="totalWrapper">
    <v-app style="background-color: white">
      <div id="whole">
        <div style="width:100%; height:90px;"></div>
        <div class="user-profile">
          프로필
        </div>
        <div v-if="!edit">
          <img src="../assets/default_person.png" v-if="imagesrc == null" class="profile-image">
          <img :src="imagesrc" v-else class="profile-image">
          <p id="name"> {{ first_name + " " + last_name }} </p>
        </div>
        <div v-else style="margin-bottom: -17px;">
          <div class="name-image">
            <img :src="profilePreview" class="profile-image-preview">
            <div class="imageChange" @click="$refs.profileImageinput.click()">
              <img src="../assets/photo-camera_black.svg" style="width: 25px; height: 25px;">
            </div>
          </div>
          <input type="file" @change="onFileSelected" style="display: none" ref="profileImageinput">
          <v-form v-model="valid" style="margin-top: 10px;">
            <v-text-field label="성" v-model="new_first_name" :rules="namerules" required class="first">
            </v-text-field>
            <v-text-field label="이름" v-model="new_last_name" :rules="namerules" required class="last"></v-text-field>
          </v-form>
        </div>
        <v-tabs fixed-tabs v-model="tab" class="tabsTitleWrapper">
          <v-tab :key="1" class="tabTitle">
            내 정보
          </v-tab>
          <v-tab :disabled="edit" class="tabTitle" :key="2">
            업로드한 자보
          </v-tab>
          <v-tab :disabled="edit" class="tabTitle" :key="3">
            팔로우중인 유저
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="tabsWrapper">
          <v-tab-item :key="1">
            <profile @cancel="cancel" @editmode="edit_toggle" :valid="valid" :first="new_first_name" :last="new_last_name" :image="new_profile_image"></profile>
          </v-tab-item>
          <v-tab-item :key="2">
            <div v-if="!zaboLoading" class="zaboListWrapper">
              <div class="zaboWrapper" v-for="(zabo,index) in computedCreatedZaboes" :key="index">
                <img @click="zaboDetail(zabo.id, zabo.author.nickName, zabo)" :src="zabo.posters[0].image" class="zaboImage">
                <span class="zaboTitle">{{zabo.title}}</span>
              </div>
            </div>
          </v-tab-item>
          <v-tab-item :key="3">
            <div class="followWrapper">
              <div v-if="followingState != [] && reRender == false" class="userWrapper" v-for="(user, index) in currentUser.following" :key="index">
                <!-- <div @click="userDetail(user.id)" class="userInfoWrapper">
                  <img :src="user.profile_image" v-if="user.profile_image != null" class="userImage">
                  <img src="../assets/default_person.png" v-else class="userImage">
                  <span class="userName">{{user.nickName}}</span>
                </div>
                <button v-show="!followingState[index]" class="Follow" @click="followUser(user.nickName, index)">
                  팔로우
                </button>
                <button v-show="followingState[index]" class="Follow" @click="unfollowUser(user.nickName, index)">
                  팔로우 취소
                </button> -->
                <user-info
                  :following="followingState"
                  @follow-user="followUser(user.nickName, index)"
                  :index="index"
                  :showFollow="true"
                  @unfollow-user="unfollowUser(user.nickName, index)"
                  :user="user"
                />
              </div>
              <div class="doesNotExist" v-show="currentUser.following.length == 0">
                <span>{{$t('유저가 존재하지 않습니다.')}}</span>
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
import Profile from "./Userprofile/Profile";
import UserInfo from "@/components/UserInfo";
import ZaboDetailModal from "@/components/ZaboDetailModal";
import axios from "@/axios-auth";
import * as types from "@/store/mutation-types";

export default {
  name: "userprofile",
  data() {
    return {
      valid: true,
      edit: false,
      tab: "tab1",
      participatedZaboes: {},
      new_first_name: "",
      new_last_name: "",
      new_profile_image: null,
      namerules: [
        v => !!v || "이름을 입력해주세요.",
        v => (v && v.length <= 100) || "이름이 너무 길어요."
      ],
      profilePreview: null,
      modalState: false,
      modalZaboId: -1,
      zaboLoading: true,
      createdZaboes: [],
      modalZaboData: null,
      followingState: [],
      reRender: false
    };
  },
  components: {
    profile: Profile,
    UserInfo,
    ZaboDetailModal
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
    edit_toggle() {
      if (this.edit === false) {
        this.profilePreview = this.imagesrc;
        this.edit = true;
      } else if (this.edit === true) {
        this.edit = false;
      }
    },
    cancel() {
      this.new_first_name = this.first_name;
      this.new_last_name = this.last_name;
      this.valid = true;
      this.edit = false;
    },
    onFileSelected(event) {
      this.new_profile_image = event.target.files[0];
      this.profilePreview = URL.createObjectURL(this.new_profile_image);
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
    followUser(nickName, index) {
      axios({
        url: "/api/users/followOther/",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: {
          nickname: nickName
        }
      }).then(res => {
        if (res.status == 201) {
          this.followingState[index] = true;
          this.reRender = true;
          this.$nextTick(() => {
            this.reRender = false;
          });
        } else {
          alert("로그인을 해주세요.");
        }
      });
    },
    unfollowUser(nickName, index) {
      axios({
        url: "/api/users/unfollowOther/",
        method: "post",
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        data: {
          nickname: nickName
        }
      }).then(res => {
        if (res.status == 201) {
          this.followingState[index] = false;
          this.reRender = true;
          this.$nextTick(() => {
            this.reRender = false;
          });
        }
      });
    },
    userDetail(id) {
      this.$router.push({ name: "UserDetail", params: { userId: id } });
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.new_first_name = this.$store.getters.getFirstName;
      this.new_last_name = this.$store.getters.getLastName;
      this.participatedZaboes = this.$store.getters.participatedZaboes;
    }, 3000);
  },
  computed: {
    first_name() {
      return this.$store.getters.getFirstName;
    },
    last_name() {
      return this.$store.getters.getLastName;
    },
    imagesrc() {
      return this.$store.getters.getProfileImagesource;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    },
    computedCreatedZaboes() {
      let finalZaboes = [];
      if (this.createdzaboes != []) {
        for (let i = 0; i < this.createdZaboes.length; i++) {
          if (this.createdZaboes[i].posters.length > 0) {
            finalZaboes.push(this.createdZaboes[i]);
          }
        }
      }
      return finalZaboes;
    }
  },
  created() {
    if (sessionStorage.getItem("token").split(" ")[0] == "ZABO") {
      axios
        .get("/api/users/myInfo", {
          headers: {
            Authorization: sessionStorage.getItem("token")
          }
        })
        .then(response => {
          if (response.status === 401) {
            this.loading = true;
          } else {
            this.$store.commit(types.SET_CURRENT_USER, response.data);
            for (let i = 0; i < response.data.following.length; i++) {
              this.followingState.push(true);
            }
            this.loading = true;
          }
        })
        .catch(err => {
          this.loading = true;
        });
    }
    axios
      .get("/api/zaboes/created/", {
        headers: {
          Authorization: sessionStorage.getItem("token")
        }
      })
      .then(res => {
        this.createdZaboes = res.data.data;
        this.zaboLoading = false;
      });
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
      @include smallBoxShadow();
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
