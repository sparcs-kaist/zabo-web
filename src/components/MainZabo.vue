<template lang=''>
  <div class="totWrapper">
    <img src="@/assets/logo-white.svg" class="logo">
    <div class="mainZaboWrapper">
      <v-progress-circular v-if="loading" indeterminate color="white" style="margin-top: 300px;"></v-progress-circular>
      <div v-if="!loading" class="row">
        <div class="column">
          <button @click="closeMain('redirect')" class="participateLink">{{$t("자보 보러가기")}}</button>
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
      <button @click="closeMain('redirect')" class="participateLink-mobile">
        {{$t("참여하기")}}
      </button>
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
      transition: "",
      zaboId: undefined
    };
  },
  created() {
    axios.get("api/zaboes/random/").then(response => {
      console.log(response.data);
      const { posters, content, title, location, id } = response.data;
      this.image = posters[0].image;
      this.background = posters[0].image;
      this.content = content;
      this.title = title;
      this.location = location;
      this.zaboId = id;
      this.loading = false;
    });
  },
  methods: {
    closeMain: function(req) {
      if (req === "redirect") {
        this.$router.push({ path: `/zabo/${this.zaboId}` });
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
    url("../assets/alexander-popov-522100-unsplash.jpg") no-repeat center center
      fixed;
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
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    top: 50%;
    transform: translateY(-50%);
    @include breakPoint('desktop') {
      .mobile-image, .participateLink-mobile {
        display: none;
      }
    }
    @include breakPoint('tablet') {
      .mobile-image, .participateLink-mobile {
        display: none;
      }
    }

    @include breakPoint('phone') {
      .mobile-image {
        width: 70%;
        // margin-top: 50%;
      }
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
  }
  .mainZaboWrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .column {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      z-index: 999;
      height: 100vh;
      width: 50%;
    }
    @include breakPoint('phone') {
      .column {
        display: none;
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
              font-size: $max-font-size;
              font-weight: 900;
            }
            #subheading {
              margin-top: 20px;
              font-size: $small-max-font-size;
              margin-bottom: 0.5em;
            }
            .description {
              width: 60%;
              font-size: $normal-font-size;
            }
          }
          &:last-child {
            width: 50%;
            align-items: flex-start;
            @include breakPoint('desktop') {
              .main-image {
                min-width: 400px;
                width: 55%;
              }
            }
            @include breakPoint('tablet') {
              .main-image {
                min-width: 400px;
                width: 55%;
              }
            }
          }
        }
        @include breakPoint('tablet') {
          .icon {
            font-size: 30pt;
          }
        }
        @include breakPoint('desktop') {
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
        .morebutton {
          font-size: 18pt;
        }
        @include breakPoint('phone') {
          .morebutton {
            font-size: 12pt;
          }
        }
      }
    }
  }
}
</style>
