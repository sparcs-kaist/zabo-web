<template lang=''>
  <div class='mainZaboWrapper'>
    <div>
      <div v-if="!loading" class="row">
        <div class="column">
          <span @click="closeMain('redirect')" class="participateLink">{{$t("참여하기")}}</span>
          <span class="heading">{{title}}</span>
          <span id="subheading">{{location}}</span>
          <p class="description">
            {{content}}
          </p>
        </div>
        <div class="column">
          <img :src="image" height="600" width="500" class="image"/>
        </div>
      </div>
      <div @click="closeMain" class="row">
        <v-icon class="icon">keyboard_arrow_up</v-icon>
        더 많은 자보 확인하기
      </div>
    </div>
    <div v-if="!loading" class="backgroundImageWrapper">
      <img :src="this.background" class="backgroundImage"/>
    </div>
  </div>
</template>
<script>
import axios from "@/axios-auth";

export default {
  data() {
    return {
      id: 1,
      image: "",
      background: "",
      content: "",
      title: "",
      location: "",
      loading: true,
      transition: ""
    };
  },
  created() {
    axios.get("http://localhost:8000/api/zaboes/1").then(response => {
      const { posters, content, title, location } = response.data;
      this.image = posters["0"].image;
      this.background = posters["0"].image;
      this.content = content;
      this.title = title;
      this.location = location;
      console.log(this.image, this.content, this.title, this.location);
      this.loading = false;
    });
  },
  methods: {
    closeMain: function() {
      // this.transition = "transition";
      // if (req === "redirect") {
      //   this.$router.push({ path: "/zabo/1" });
      // }
      this.$emit("closeintro");
      // this.$store.commit("MAIN_ZABO_SEEN");
    }
  }
};
</script>

<style scoped lang=''>
/* .transition {
  transition: 0.5s;
  transform: translateY(-2000px);
  transition-timing-function: ease-in-out;
} */
.mainZaboWrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7)),
    url("../assets/alexander-popov-522100-unsplash.jpg");
  background-size: cover;
  margin: auto auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  position: fixed;
  z-index: 900;
}
.column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
  height: 100vh;
  width: 50%;
}
.row {
  z-index: 1000;
}
.row:first-child {
  flex: 1;
  display: flex;
}
.row:last-child {
  height: 6em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.25em;
  color: white;
  cursor: pointer;
}
.column:first-child {
  padding-right: 3.75em;
  text-align: right;
  color: white;
}
.column:last-child {
  width: 50%;
  align-items: flex-start;
}
.icon {
  font-size: 2em;
  margin-bottom: 0.2em;
}
.participateLink {
  padding: 11px 38px 10px 38px;
  background-color: #12397d;
  font-size: 1.25em;
  font-weight: 400;
  margin-bottom: 26px;
  text-decoration: none;
  color: white;
  cursor: pointer;
}
.heading {
  font-size: 6.25em;
  font-weight: 900;
}
#subheading {
  font-size: 2.4em;
  margin-bottom: 0.5em;
}
.description {
  width: 60%;
  font-size: 1.25em;
}
.backgroundImageWrapper {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  width: 100%;
  margin: auto auto;
  z-index: 800;
  overflow: hidden;
}
.backgroundImage {
  width: 150%;
  height: auto;
  z-index: 800;
  filter: blur(8px);
}
</style>
