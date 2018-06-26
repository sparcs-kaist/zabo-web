<template>
  <div class="column" v-cloak>
    <div class="user-profile">
      프로필
    </div>
    <img v-bind:src="imagesrc" class="profile-image" v-cloak>
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
      내 정보
    </div>
    <div v-else-if="tab == 'tab2'">
      <participated></participated>
    </div>
    <div v-else-if="tab == 'tab3'">
      찜한 자보
    </div>

  </div>
</template>

<script>
import Participated from "./Userprofile/Participated.vue";

export default {
  name: "userprofile",
  data() {
    return {
      name: "",
      imagesrc: "",
      tab: "tab1"
    };
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
  component: {
    participated: Participated
  },
  created: function() {
    this.$http({
      method: "get",
      url: "http://localhost:8000/users/1",
      auth: {
        username: "thinkratomos@gmail.com",
        password: "Michael5"
      }
    }).then(result => {
      this.name = result.data.first_name + " " + result.data.last_name;
      this.imagesrc = result.data.profile_image;
      this.data = result.data;
    });
  }
};
</script>

<style>
[v-cloak] {
  display: block;
}
.column {
  width: 70%;
  height: 1000px;
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
