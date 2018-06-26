<template>
  <div class="column">
    <div class="user-profile">
      프로필
    </div>
    <img :src="imagesrc" class="profile-image">
    <p id="name"> {{ name }} </p>
    <button v-on:click="tab1" class="tab">
      내 정보<br/>
      <div class="button-active" v-if="tab == 'tab1'">
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
      <profile></profile>
    </div>
    <div v-else-if="tab == 'tab2'">
      <participated :participatedZaboes="participatedZaboes"></participated>
    </div>
    <div v-else-if="tab == 'tab3'">
      찜한 자보
    </div>
  </div>
</template>

<script>
import Participated from "./Userprofile/Participated.vue";
import Profile from "./Userprofile/Profile.vue";

export default {
  name: "userprofile",
  data() {
    return {
      user: {
        name: "",
        imagesrc: ""
      },
      tab: "tab1",
      participatedZaboes: {}
    };
  },
  components: {
    participated: Participated,
    profile: Profile
  },
  methods: {
    tab1: function() {
      this.tab = "tab1";
    },
    tab2: function() {
      this.tab = "tab2";
    },
    tab3: function() {
      this.tab = "tab3";
    }
  },
  created() {
    console.log("consoles");
    const {
      first_name,
      last_name,
      email,
      profile_image,
      id
    } = this.currentUser;
    this.name = first_name + " " + last_name;
    this.imagesrc = profile_image;
    this.$store.dispatch("getParticipatedZaboes");
    this.participatedZaboes = this.$store.getters.participatedZaboes;
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  }
};
</script>

<style>
.column {
  width: 70%;
  height: 2000px;
  margin-left: 15%;
  margin-top: 90px;
}

.user-profile {
  width: 100px;
  height: 20px;
  text-align: left;
  font-size: 22pt;
  font-family: Nanumsquare;
  font-weight: 800;
}

#name {
  font-family: Nanumsquare;
  font-size: 25pt;
  font-weight: 800;
}

.profile-image {
  height: 100px;
  width: 100px;
  border-radius: 100px;
  margin-bottom: -20px;
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
</style>
