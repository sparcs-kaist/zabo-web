<template>
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
        <v-app id = "namefield" v-else>
          <input type="file" @change="onFileSelected">
          <v-form v-model = "valid">
            <v-text-field
            label = "성"
            v-model = "new_first_name"
            :rules = "namerules"
            required
            class = "first">
            </v-text-field>
            <v-text-field
            label = "이름"
            v-model = "new_last_name"
            :rules = "namerules"
            required
            class = "last"></v-text-field>
          </v-form>
        </v-app>
        <button v-on:click="tab1" class="tab">
          내 정보<br/>
          <div class="button-active" v-if = "tab == 'tab1'">
          </div>
        </button>
        <button v-on:click="tab2" class="tab">
          참여한 자보<br/>
          <div class="button-active" v-if="tab == 'tab2'">
          </div>
        </button>
        <button v-on:click="tab3" class="tab">
          찜한 자보<br/>
          <div class="button-active" v-if="tab == 'tab3'">
          </div>
        </button>
        <div v-if="tab == 'tab1'">
          <profile v-on:editmode = "edit_toggle" :valid = "valid" :first = "new_first_name" :last = "new_last_name" :image = "new_profile_image"></profile>
        </div>
        <div v-else-if="tab == 'tab2'">
          <!-- <participated :participatedZaboes="participatedZaboes"></participated> -->
        </div>
        <div v-else-if="tab == 'tab3'">
          찜한 자보
        </div>
      </div>
  </v-app>
</template>

<script>
import Participated from "./Userprofile/Participated";
import Profile from "./Userprofile/Profile";

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
      ]
    };
  },
  components: {
    participated: Participated,
    profile: Profile
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
        this.edit = true;
      } else if (this.edit === true) {
        this.edit = false;
      }
    },
    onFileSelected(event) {
      this.new_profile_image = event.target.files[0];
    }
  },
  created() {
    this.new_first_name = this.$store.getters.getFirstName;
    this.new_last_name = this.$store.getters.getLastName;
    this.participatedZaboes = this.$store.getters.participatedZaboes;
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
    }
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
  margin-bottom: 20px;
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

#namefield {
  background-color: white;
  height: 70px;
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
</style>
