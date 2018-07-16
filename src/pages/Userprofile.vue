<template>
  <div>
    <v-app style="background-color: white">
      <div id="whole">
        <div style="width:100%; height:90px;"></div>
        <div class="user-profile">
          프로필
        </div>
        <div v-if="!edit">
          <img :src="imagesrc" class="profile-image">
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
        <v-tabs fixed-tabs v-model="tab" style="margin-top: 20px; margin-bottom: 20px;">
          <v-tab :key="1" style="font-size: 17pt; font-weight: 800;">
            내 정보
          </v-tab>
          <v-tab :disabled="edit" :key="2" style="font-size: 17pt; font-weight: 800;">
            업로드한 자보
          </v-tab>
          <v-tab :disabled="edit" :key="3" style="font-size: 17pt; font-weight: 800;">
            팔로우
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" style="height: 500px;">
          <v-tab-item :key="1">
            <profile @cancel="cancel" @editmode="edit_toggle" :valid="valid" :first="new_first_name" :last="new_last_name" :image="new_profile_image"></profile>
          </v-tab-item>
          <v-tab-item v-if="zaboesExist" :key="2">
            <div class="zaboListWrapper">
              <div class="zaboWrapper" v-for="(zabo,index) in createdZaboes" :key="index">
                <img @click="zaboDetail(zabo.id, zabo.author.nickName)" :src="zabo.posters[0].image" class="zaboImage">
                <span class="zaboTitle">{{zabo.title}}</span>
              </div>
            </div>
          </v-tab-item>
          <v-tab-item :key="3">
            <div>
              팔로우
            </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-app>
    <div v-if="modalState" class="zaboModalWrapper">
      <zabo-detail-modal @closeModal="closeModal" :zaboId="this.modalZaboId" v-if="modalState"></zabo-detail-modal>
    </div>
  </div>
</template>

<script>
import Participated from "./Userprofile/Participated";
import Profile from "./Userprofile/Profile";
import ZaboDetailModal from '@/components/ZaboDetailModal';

export default {
  name: "userprofile",
  data () {
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
    };
  },
  components: {
    participated: Participated,
    profile: Profile,
    ZaboDetailModal
  },
  methods: {
    tab1 () {
      this.tab = "tab1";
    },
    tab2 () {
      this.tab = "tab2";
    },
    tab3 () {
      this.tab = "tab3";
    },
    edit_toggle () {
      if (this.edit === false) {
        this.profilePreview = this.imagesrc;
        this.edit = true;
      } else if (this.edit === true) {
        this.edit = false;
      }
    },
    cancel () {
      this.new_first_name = this.first_name;
      this.new_last_name = this.last_name;
      this.valid = true;
      this.edit = false;
    },
    onFileSelected (event) {
      this.new_profile_image = event.target.files[0];
      this.profilePreview = URL.createObjectURL(this.new_profile_image);
    },
    zaboDetail (id, nickname) {
      if (nickname !== "None") {
        this.modalState = true;
        window.history.pushState(null, null, [`/zabo/${id}`]);
        this.modalZaboId = id;
      }
    },
  },
  mounted () {
    setTimeout(() => {
      this.new_first_name = this.$store.getters.getFirstName;
      this.new_last_name = this.$store.getters.getLastName;
      this.participatedZaboes = this.$store.getters.participatedZaboes;
    }, 3000);
  },
  computed: {
    first_name () {
      return this.$store.getters.getFirstName;
    },
    last_name () {
      return this.$store.getters.getLastName;
    },
    imagesrc () {
      return this.$store.getters.getProfileImagesource;
    },
    currentUser () {
      return this.$store.getters.currentUser;
    },
    createdZaboes () {
      return this.$store.getters.getCreatedZaboes;
    },
    zaboesExist () {
      return this.createdZaboes.length > 0;
    },
  },
  created () {
    this.$store.dispatch("getCreatedZaboes");
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

.zaboListWrapper {
  width: 75%;
  min-width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}

.zaboaWrapper {
  display: flex;
  min-width: 201px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2em;
}

.zaboImage {
  width: 183px;
  height: 286px;
  margin-bottom: 0.75em;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  transition: all 0.3s ease;
}

.zaboModalWrapper {
  width: 100%;
  position: absolute;
  top: 78px;
  bottom: 68px;
}
</style>
