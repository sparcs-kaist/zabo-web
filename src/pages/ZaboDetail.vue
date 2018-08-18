<template>
  <div class="hide">
    <div class="main">
      <div class="column">
        <div class="headerStyle">
          <p class="heading">{{title}}</p>
          <p class="subheading">{{$t('지원 기간  || ')}}{{deadline}}{{$t(' 까지')}}</p>
          <div class="buttonWrapper">
            <a v-show="link_url != '' && participateValidation" :href="link_url" class="buttonTap">{{$t("참여하기")}}</a>
            <a v-show="link_url == '' && participateValidation" class="buttonTap unvalidButtonTap">{{$t("링크가 없습니다.")}}</a>
            <a v-show="!participateValidation" class="buttonTap unvalidButtonTap">{{$t("지원 기간이 만료되었습니다.")}}</a>
            <v-icon color="pink" v-show="isLiked" @click="dislikeZabo" class="favoriteIcon">favorite</v-icon>
            <v-icon color="white" v-show="!isLiked" @click="likeZabo" class="favoriteIcon">favorite_border</v-icon>
            <span class="likeCount">{{this.likeCount}}</span>
          </div>
          <div class="navbar">
            <p @click="selectTab(0)" :class="toDisplay === 0 ? 'selected tab' : 'tab' ">{{$t("정보")}}</p>
            <p @click="selectTab(1)" :class="toDisplay === 1 ? 'selected tab' : 'tab' ">{{$t("일정")}}</p>
            <p @click="selectTab(2)" :class="toDisplay === 2 ? 'selected tab' : 'tab' ">{{$t("리뷰")}}</p>
          </div>
        </div>
        <v-icon @click="closeModal" class="closeIcon">close</v-icon>
        <v-icon v-if="myZabo" v-show="loggedInState" @click="editZabo" class="editIcon">edit</v-icon>
        <div class="bodyWrapper" v-show="toDisplay === 0">
          <info-screen :info="this.content" :category="category" :author="author" :payment="payment" />
          <div class="mobileImageWrapper">
            <div @click="posterModalHandler" v-if="posters != []" class="zaboImageWrapper">
              <div class="arrowIconWrapper">
                <div class="leftIconWrapper">
                  <v-icon v-show="currentPosterNumber != 0" x-large @click.stop="changePosterNumber('left')" color="grey lighten-3">keyboard_arrow_left</v-icon>
                </div>
                <div class="rightIconWrapper">
                  <v-icon v-show="currentPosterNumber != posters.length-1" x-large @click.stop="changePosterNumber('right')" color="grey lighten-3">keyboard_arrow_right</v-icon>
                </div>
              </div>
              <img :src="currentPoster" class="zaboImage"/>
            </div>
          </div>
        </div>
        <div class="bodyWrapper" v-show="toDisplay === 1">
          <div class="timeSlotWrapper" v-for="(timeslot, index) in timeslots" :key="index">
            <div class="singleTimeSlotWrapper"><span class="timeSlotTitle">{{$t('시작 ')}}</span><span class="timeSlotContent">{{timeslot.start_time}}</span></div>
            <div class="singleTimeSlotWrapper"><span class="timeSlotTitle">{{$t('종료 ')}}</span><span class="timeSlotContent">{{timeslot.end_time}}</span></div>
            <div class="singleTimeSlotWrapper"><span class="timeSlotTitle">{{$t('내용 ')}}</span><span class="timeSlotContent">{{timeslot.content}}</span></div>
          </div>
        </div>
        <div class="bodyWrapper" v-show="toDisplay === 2">
          <input-field v-show="toDisplay === 2 && loggedInState" :content.sync="newComment" :on-click="onSubmitComment" placeholder-text="리뷰를 입력하세요.">
          </input-field>
          <review-screen :comments="comments" />
        </div>
      </div>
      <div class="column">
        <div class="arrowIconWrapper">
          <div class="leftIconWrapper">
            <v-icon v-show="currentPosterNumber != 0" x-large @click.stop="changePosterNumber('left')" color="grey lighten-3">keyboard_arrow_left</v-icon>
          </div>
          <div class="rightIconWrapper">
            <v-icon v-show="currentPosterNumber != posters.length-1" x-large @click.stop="changePosterNumber('right')" color="grey lighten-3">keyboard_arrow_right</v-icon>
          </div>
        </div>
        <div v-if="posters != []" class="zaboImageWrapper">
          <img @click="posterModalHandler" :src="currentPoster" class="zaboImage"/>
        </div>
        <v-icon @click="closeModal" class="closeIcon">close</v-icon>
        <v-icon v-if="myZabo" v-show="loggedInState" @click="editZabo" class="editIcon">edit</v-icon>
      </div>
    </div>
    <div class="coverImage"></div>
    <poster-modal @modalClose="posterModalHandler" v-if="posterModalState" :posters="posters" :currentIndex="currentPosterNumber"></poster-modal>
  </div>
</template>

<script>
import axios from "@/axios-auth";
import InfoScreen from "@/components/InfoScreen";
import InputField from "@/components/InputField";
import ReviewScreen from "@/components/ReviewScreen";
import PosterModal from "@/components/PosterModal";

export default {
  data() {
    return {
      content: "Content",
      title: "Title",
      location: "Location",
      comments: [],
      newComment: "",
      // 0 displays Info, 1 displays Review
      toDisplay: 0,
      zabo_id: -1,
      updated_time: "",
      isLiked: false,
      likeCount: 0,
      timeslots: [],
      category: "",
      payment: "",
      link_url: "",
      authorId: null,
      author: undefined,
      deadline: "",
      posters: [],
      currentPosterNumber: 0,
      posterModalState: false,
      categoryList: [
        "최신순",
        "인기있는 자보",
        "마감임박 자보",
        "리크루팅",
        "공연",
        "대회",
        "설명회",
        "세미나",
        "전람회"
      ]
    };
  },
  components: {
    InfoScreen,
    InputField,
    ReviewScreen,
    PosterModal
  },
  computed: {
    loggedInState() {
      return this.$store.getters.loggedInState;
    },
    myId() {
      return this.$store.getters.getMyID;
    },
    myZabo() {
      if (this.loggedInState) {
        return this.myId == this.authorId;
      } else {
        return false;
      }
    },
    participateValidation() {
      var today = new Date();
      if (
        this.deadline.split(" ")[0] + "T" + this.deadline.split(" ")[1] >
        today.toISOString().substring(0, 16)
      ) {
        return true;
      } else {
        return false;
      }
    },
    currentPoster() {
      return this.posters[`${this.currentPosterNumber}`].image;
    }
  },
  mounted() {
    this.zabo_id = this.$route.params.zabo_id;
    window.addEventListener("keyup", this.escEvent);
    axios({
      method: "get",
      url: `api/zaboes/${this.zabo_id}/`,
      headers: {
        Authorization: sessionStorage.getItem("token")
      }
    })
      .then(response => {
        const {
          posters,
          content,
          title,
          location,
          updated_time,
          comments,
          is_liked,
          like_count,
          timeslots,
          category,
          payment,
          link_url,
          author,
          deadline
        } = response.data;
        this.posters = posters;
        this.content = content;
        this.title = title;
        this.location = location;
        this.updated_time = updated_time;
        this.comments = comments;
        this.isLiked = is_liked;
        this.likeCount = like_count;
        this.timeslots = timeslots;
        this.category = category;
        this.payment = payment;
        this.link_url = link_url;
        this.authorId = author.id;
        this.author = author;
        this.deadline = deadline;
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
    this.$store
      .dispatch("zaboesGetPageCount", {
        pageSize: 20,
        method: "최신순"
      })
      .then(res => {
        const totalPage = res;
        for (var i = 1; i <= totalPage; i++) {
          this.$store.dispatch("zaboesList", {
            pageNum: i,
            pageSize: 20,
            method: "최신순"
          });
        }
        return res;
      })
      .then(() => {
        let selectedCategories = [];
        this.categoryList.map(category => {
          if (category != "최신순") {
            selectedCategories.push(category);
          }
        });
        console.log(selectedCategories);
        selectedCategories.map(category => {
          this.$store
            .dispatch("zaboesGetPageCount", { pageSize: 20, method: category })
            .then(res => {
              const totalPage = res;
              for (var i = 1; i <= totalPage; i++) {
                this.$store.dispatch("zaboesList", {
                  pageNum: i,
                  pageSize: 20,
                  method: category
                });
              }
            });
        });
      });
  },
  beforeDestroy() {
    window.removeEventListener("keyup", this.escEvent);
  },
  methods: {
    changePosterNumber(direction) {
      if (direction == "left" && this.currentPosterNumber != 0) {
        this.currentPosterNumber -= 1;
      } else if (
        direction == "right" &&
        this.currentPosterNumber != this.posters.length - 1
      ) {
        this.currentPosterNumber += 1;
      }
      this.posterModalState = false;
    },
    closeModal() {
      this.$router.push({ name: "ZaboListDetailAdded" });
    },
    onSubmitComment() {
      axios({
        method: "post",
        url: `api/comments/`,
        data: {
          content: this.newComment,
          zabo: this.zabo_id,
          is_private: true,
          is_deleted: true,
          is_blocked: true
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token")
        }
      })
        .then(response => {
          this.comments.push(response.data);
        })
        .catch(err => {
          console.log(err);
        });
      this.newComment = "";
    },
    selectTab(selected) {
      this.toDisplay = selected;
    },
    editZabo() {
      this.$router.push({
        name: "ZaboUpdate",
        params: { zabo_id: this.zabo_id }
      });
    },
    likeZabo() {
      this.isLiked = true;
      this.likeCount += 1;
      axios({
        url: "api/likes/",
        method: "post",
        data: {
          zabo: this.zabo_id
        },
        headers: {
          Authorization: sessionStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          console.log(res);
          if (res.status != 201) {
            this.likeCount -= 1;
            this.isLiked = false;
          }
        })
        .catch(err => {
          alert("You are not logged In!");
          console.log(err);
          this.likeCount -= 1;
          this.isLiked = false;
        });
    },
    dislikeZabo() {
      this.isLiked = false;
      this.likeCount -= 1;
      axios({
        url: "api/likes/dislike/",
        method: "delete",
        data: {
          zabo: this.zabo_id
        },
        headers: {
          Authorization: sessionStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          console.log(res);
          if (res.status != 204) {
            this.isLiked = true;
            this.likeCount += 1;
          }
        })
        .catch(err => {
          alert("You are not logged In!");
          console.log(err);
          this.isLiked = true;
          this.likeCount += 1;
        });
    },
    escEvent() {
      if (event.which == 27) {
        this.closeModal();
      }
    },
    posterModalHandler() {
      this.posterModalState = !this.posterModalState;
      console.log(this.posterModalState);
    }
  }
};
</script>

<style scoped lang='scss'>
.hide {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.5);
  .main {
    display: flex;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    /* margin-top: 78px; */
    overflow: hidden;
    z-index: 301;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    .column {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      &:first-child {
        padding-top: 60px;
        padding-left: 40px;
        padding-bottom: 40px;
        flex: 1;
        @include breakPoint("desktop") {
          .editIcon,
          .closeIcon {
            display: none;
          }
        }
        @include breakPoint("tablet") {
          .editIcon,
          .closeIcon {
            display: none;
          }
        }
        @include breakPoint("phone") {
          padding-top: 40px;
          padding-left: 30px;
          padding-bottom: 30px;
          padding-right: 30px;
          .editIcon {
            font-size: $biggest-font-size;
            color: white;
            position: fixed;
            top: 45px;
            right: 50px;
            cursor: pointer;
          }
          .closeIcon {
            font-size: $biggest-font-size;
            color: white;
            position: fixed;
            top: 45px;
            right: 15px;
            cursor: pointer;
          }
        }
        .headerStyle {
          width: 100%;
          display: flex;
          flex-direction: column;
          .heading {
            color: rgb(255, 255, 255);
            font-size: $max-font-size;
            font-weight: bold;
            letter-spacing: 0.01em;
            margin: 0;
            text-align: left;
            @include breakPoint("phone") {
              font-size: $biggest-font-size;
            }
          }
          .subheading {
            color: rgb(220, 220, 220);
            font-weight: bold;
            font-size: 16px;
            margin-top: 17px;
            margin-bottom: 20px;
            text-align: left;
          }
          @include breakPoint("phone") {
            .subheading {
              font-size: $small-font-size;
            }
          }
          .buttonWrapper {
            width: 100%;
            display: flex;
            margin-bottom: 24px;
            align-items: center;
            justify-content: flex-start;
            .buttonTap {
              cursor: pointer;
              font-size: $h1-font-size;
              font-weight: bold;
              margin-right: 16px;
              padding: 11px 38px 10px 38px;
              display: flex;
              background-color: rgb(18, 57, 125);
              color: white;
              @include breakPoint("phone") {
                font-size: $small-font-size;
                padding: 11px 10px 10px 10px;
                font-weight: $normal-font-weight;
              }
            }
            .unvalidButtonTap {
              background-color: #ea4335;
            }
            .favoriteIcon {
              font-size: $biggest-font-size;
              @include breakPoint("phone") {
                font-size: $big-font-size;
              }
            }
            .likeCount {
              font-size: $biggest-font-size;
              font-weight: $big-font-weight;
              color: white;
              margin-left: 0.25em;
              @include breakPoint("phone") {
                font-size: $big-font-size;
              }
            }
          }
          .navbar {
            display: flex;
            justify-content: flex-start;
            margin: 0.75em 0 1em 0;
            .selected {
              color: #fff;
              font-weight: bold;
            }
            .tab {
              color: rgb(220, 220, 220);
              cursor: pointer;
              margin: 0 16px 0 0;
              font-size: $biggest-font-size;
              @include breakPoint("phone") {
                font-size: $h1-font-size;
              }
            }
          }
        }
        .bodyWrapper {
          flex: 1;
          color: white;
          position: relative;
          padding-right: 40px;
          width: 100%;
          overflow-y: scroll;
          overflow-x: hidden;
          @include scrollBarLight(small);
          @include breakPoint("phone") {
            padding-right: 20px;
          }
          .timeSlotWrapper {
            width: 100%;
            margin-bottom: 1em;
            padding: 10px;
            min-height: 80px;
            display: flex;
            align-items: space-between;
            flex-wrap: wrap;
            background-color: #ececec;
            font-size: 1.5em;
            color: rgba(0, 0, 0, 0.87);
            .singleTimeSlotWrapper {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              width: 50%;
              @include breakPoint("phone") {
                width: 100%;
              }
              &:last-child {
                width: 100%;
              }
              .timeSlotTitle {
                font-size: $h1-font-size;
                font-weight: $big-font-weight;
                margin-right: 8px;
              }
              .timeSlotContent {
                font-size: $h1-font-size;
                font-weight: $normal-font-weight;
              }
              @include breakPoint("phone") {
                .timeSlotTitle,
                .timeSlotContent {
                  font-size: $normal-font-size;
                }
              }
            }
          }
          .mobileImageWrapper {
            justify-content: center;
            align-items: center;
            width: 100%;
            padding: 20px 0;
            position: relative;
            @include breakPoint("tablet") {
              display: none;
            }
            @include breakPoint("desktop") {
              display: none;
            }
            .zaboImageWrapper {
              width: 100%;
              height: 100%;
              cursor: pointer;
              position: relative;
              .zaboImage {
                width: 100%;
                height: auto;
              }
              .arrowIconWrapper {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                display: flex;
                align-items: center;
                padding: 10px;
                .leftIconWrapper {
                  flex: 1;
                  display: flex;
                  justify-content: flex-start;
                  z-index: 800;
                }
                .rightIconWrapper {
                  flex: 1;
                  display: flex;
                  justify-content: flex-end;
                  z-index: 800;
                }
              }
            }
          }
        }
      }
      &:last-child {
        position: relative;
        justify-content: center;
        align-items: center;
        width: 40%;
        padding: 20px 20px;
        @include breakPoint("phone") {
          display: none;
        }
        .zaboImageWrapper {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          .zaboImage {
            width: 100%;
            height: auto;
            cursor: pointer;
          }
        }
        .arrowIconWrapper {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          padding: 10px;
          .leftIconWrapper {
            flex: 1;
            display: flex;
            justify-content: flex-start;
            z-index: 800;
          }
          .rightIconWrapper {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            z-index: 800;
          }
        }
        .editIcon {
          font-size: 38px;
          color: white;
          position: absolute;
          top: 30px;
          right: 65px;
          cursor: pointer;
        }
        .closeIcon {
          font-size: 40px;
          color: white;
          position: absolute;
          top: 30px;
          right: 20px;
          cursor: pointer;
        }
      }
    }
  }
  .coverImage {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url("../assets/blur-wallpapers-25172-6128892.jpg") no-repeat center center
        fixed;
    background-size: cover;
    /* display: flex; */
    position: absolute;
    top: -5px;
    bottom: -5px;
    left: -5px;
    right: -5px;
    overflow: hidden;
    z-index: 300;
    filter: blur(5px);
  }
}
</style>
