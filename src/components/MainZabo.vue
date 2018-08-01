<template lang=''>
  <div class="totWrapper">
    <img src="@/assets/logo-white.svg" class="logo">
    <div class="mainZaboWrapper">
      <v-progress-circular v-if="loading" indeterminate color="white" style="margin-top: 300px;"></v-progress-circular>
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
          <img :src="image" class="main-image"/>
        </div>
      </div>
      <div @click="closeMain" class="row">
        <v-icon class="icon">keyboard_arrow_up</v-icon>
        <span class="morebutton">더 많은 자보 확인하기</span>
      </div>
    </div>
    <div v-if="!loading" class="mobileRow">
      <img :src="image" class="mobile-image">
      <div @click="closeMain('redirect')" class="participateLink-mobile">
        {{$t("참여하기")}}
      </div>
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
    axios.get("api/zaboes/random/").then(response => {
      const { posters, content, title, location } = response.data;
      this.image = posters[0].image;
      this.background = posters[0].image;
      this.content = content;
      this.title = title;
      this.location = location;
      this.loading = false;
    });
  },
  methods: {
    closeMain: function(req) {
      if (req === "redirect") {
        this.$router.push({ path: "/zabo/6" });
      }
      this.$emit("closeintro");
    }
  }
};
</script>

<style scoped lang='scss'>
.totWrapper {
  width: 100%;
  /* background-colo?: rgba(0, 0, 0, 0.5); */
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/alexander-popov-522100-unsplash.jpg");
  background-size: cover;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  position: fixed;
  z-index: 900;
  .logo {
    width: 80px;
    position: absolute;
    left: 50%;
    margin-left: -40px;
    margin-top: 22px;
  }
  .mobileRow {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    @media screen and (min-width: 900px) {
      .mobile-image {
        display: none;
      }
    }

    @media screen and (max-width: 899px) {
      .mobile-image {
        width: 70%;
        margin-top: 20%;
      }
    }
    @media screen and (max-width: 899px) {
      .participateLink-mobile {
        position: relative;
        text-align: center;
        font-size: 13pt;
        background-color: #12397d;
        color: white;
        width: 150px;
        height: 100%;
        padding: 10px;
        margin-top: -15px;
      }
    }

    @media screen and (min-width: 900px) {
      .participateLink-mobile {
        display: none;
      }
    }
  }
  .mainZaboWrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    @media screen and (max-width: 899px) {
      .column {
        display: none;
      }
    }

    @media screen and (min-width: 900px) {
      .column {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        z-index: 999;
        height: 100vh;
        width: 50%;
      }
    }
    .row {
      z-index: 999;
      &:first-child {
        flex: 1;
        display: flex;
        .column {
          &:first-child {
            padding-right: 3.75em;
            text-align: right;
            color: white;
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
              font-size: 5em;
              font-weight: 900;
            }
            #subheading {
              margin-top: 20px;
              font-size: 2.4em;
              margin-bottom: 0.5em;
            }
            .description {
              width: 60%;
              font-size: 1.25em;
            }
          }
          &:last-child {
            width: 50%;
            align-items: flex-start;
            @media screen and (min-width: 900px) {
              .main-image {
                min-width: 400px;
                width: 55%;
              }
            }
          }
        }
        @media screen and (min-width: 900px) {
          .icon {
            font-size: 30pt;
          }
        }
      }
      &:last-child {
        height: 6em;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        color: white;
        cursor: pointer;
        @media screen and (max-width: 899px) {
          .morebutton {
            font-size: 12pt;
          }
        }

        @media screen and (min-width: 900px) {
          .morebutton {
            font-size: 18pt;
          }
        }
      }
    }
  }
}
</style>
