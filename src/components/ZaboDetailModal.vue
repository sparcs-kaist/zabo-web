<template>
  <div class="hide">
    <div class="main">
      <div class="column">
        <div class="headerStyle">
          <p class="heading">{{title}}</p>
          <p class="subheading">{{updated_time}}</p>
          <div class="buttonWrapper">
            <button class="buttonTap">{{$t("참여하기")}}</button>
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

        <div class="bodyWrapper" v-show="toDisplay === 0">
          <info-screen :info="this.content" :payment="payment" :category="category" />
        </div>
        <div class="bodyWrapper" v-show="toDisplay === 1">
          <div class="timeSlotWrapper" v-for="(timeslot, index) in timeslots" :key="index">
            <span class="timeSlotTime">{{$t('시작 : ')}}{{timeslot.start_time}}</span>
            <span class="timeSlotTime">{{$t('종료 : ')}}{{timeslot.end_time}}</span>
            <span class="timeSlotContent">{{$t('내용 : ')}}{{timeslot.content}}</span>
          </div>
        </div>
        <div class="bodyWrapper" v-show="toDisplay === 2">
          <input-field v-show="toDisplay === 2" :content.sync="newComment" :on-click="onSubmitComment" placeholder-text="리뷰를 입력하세요.">
          </input-field>
          <review-screen :comments="comments" />
        </div>
      </div>
      <div class="column">
        <img :src="this.image" height="600" width="500" />
        <v-icon @click="closeModal" class="closeIcon">close</v-icon>
        <v-icon v-show="loggedInState" @click="editZabo" class="editIcon">edit</v-icon>
      </div>
    </div>
    <div class="coverImage"></div>
  </div>
</template>

<script>
import axios from 'axios';
import InfoScreen from '@/components/InfoScreen';
import InputField from '@/components/InputField';
import ReviewScreen from '@/components/ReviewScreen';

export default {
  data () {
    return {
      image: "https://avatars2.githubusercontent.com/u/2281088?s=88&v=4",
      background: "",
      content: "Content",
      title: "Title",
      location: "Location",
      comments: [],
      newComment: '',
      // 0 displays Info, 1 displays Review
      toDisplay: 0,
      zabo_id: -1,
      updated_time: "",
      isLiked: false,
      likeCount: -1,
      timeslots: [],
      category: "",
      payment: ""
    };
  },
  components: {
    InfoScreen,
    InputField,
    ReviewScreen,
  },
  props: ['zaboId'],
  computed: {
    zabodetailId () {
      return this.zabo_id;
    },
    loggedInState () {
      return this.$store.getters.loggedInState
    }
  },
  methods: {
    onSubmitComment () {
      axios({
        method: 'post',
        url: `api/comments/`,
        data: {
          content: this.newComment,
          zabo: this.zabodetailId,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem('token')
        }
      })
        .then((response) => {
          this.comments.push(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      this.newComment = '';
    },
    selectTab (selected) {
      this.toDisplay = selected;
    },
    closeModal () {
      this.$emit('closeModal');
    },
    editZabo () {
      this.$router.push({ name: "ZaboUpdate", params: { zabo_id: this.zabo_id } })
    },
    likeZabo () {
      this.isLiked = true;
      this.likeCount += 1;
      axios({
        url: 'api/likes/',
        method: 'post',
        data: {
          zabo: this.zabo_id
        },
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      }).then(res => {
        console.log(res)
        if (res.status == 201) {
          this.isLiked = true;
        }
      })
        .catch(err => {
          alert('You are not logged In!')
          console.log(err)
          this.likeCount -= 1;
        })
        ;
    },
    dislikeZabo () {
      this.isLiked = false;
      this.likeCount -= 1;
      axios({
        url: 'api/likes/dislike/',
        method: 'delete',
        data: {
          zabo: this.zabo_id
        },
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      }).then(res => {
        console.log(res)
        if (res.status == 201) {
          this.isLiked = false;
        }
      })
        .catch(err => {
          alert('You are not logged In!')
          console.log(err)
          this.likeCount += 1;
        });
    }
  },
  mounted () {
    this.zabo_id = this.zaboId;
    axios({
      method: 'get',
      url: `api/zaboes/${this.zabodetailId}/`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then((response) => {
        const { posters, content, title, location, updated_time, comments, is_liked, like_count, timeslots, category, payment } = response.data
        this.image = posters["0"].image;
        this.background = posters["0"].image;
        this.content = content;
        this.title = title;
        this.location = location;
        this.updated_time = updated_time
        this.comments = comments;
        this.isLiked = is_liked;
        this.likeCount = like_count;
        this.timeslots = timeslots;
        this.category = category;
        this.payment = payment;
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.main {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0%;
  right: 0%;
  overflow: hidden;
  z-index: 502;
  border-radius: 3px;
}
.coverImage {
  background-image: linear-gradient(rgba(0, 0, 0, 0.7)),
    url("../assets/alexander-popov-522100-unsplash.jpg");
  background-size: cover;
  /* display: flex; */
  position: absolute;
  top: -5px;
  bottom: -5px;
  left: -5px;
  right: -5px;
  overflow: hidden;
  z-index: 500;
  filter: blur(5px);
}
.hide {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 12.5%;
  right: 12.5%;
  overflow: hidden;
  border-radius: 3px;
}

.bodyWrapper {
  flex: 1;
  color: white;
  position: relative;
  padding-right: 40px;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
.bodyWrapper::-webkit-scrollbar {
  width: 10px;
  background-color: transparent;
  border-radius: 5px;
}
.bodyWrapper::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
}
.bodyWrapper::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.6);
}
.bodyWrapper::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.headerStyle {
  /* flex: 1; */
  width: 100%;
  display: flex;
  flex-direction: column;
}
.heading {
  color: rgb(255, 255, 255);
  font-size: 3.8em;
  font-weight: bold;
  letter-spacing: 0.01em;
  margin: 0;
  text-align: left;
}
.subheading {
  color: rgb(220, 220, 220);
  font-weight: bold;
  font-size: 1.25em;
  margin-top: 17px;
  margin-bottom: 20px;
  text-align: left;
}
.buttonWrapper {
  width: 100%;
  display: flex;
  margin-bottom: 24px;
}
.buttonTap {
  cursor: pointer;
  font-size: 1.25em;
  font-weight: bold;
  margin-right: 16px;
  padding: 11px 38px 10px 38px;
  display: flex;
  background-color: rgb(18, 57, 125);
  color: white;
}
.buttonTap:last-child {
  background-color: #e6e6e6;
  color: #606060;
}
.column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 60%;
}
.column:first-child {
  padding-top: 80px;
  padding-left: 40px;
}
.column:last-child {
  justify-content: center;
  align-items: center;
  width: 40%;
}
.navbar {
  display: flex;
  justify-content: flex-start;
  margin: 0.75em 0 1em 0;
}
.selected {
  color: #fff;
  font-weight: bold;
}
.tab {
  color: rgb(220, 220, 220);
  cursor: pointer;
  margin: 0 16px 0 0;
  font-size: 1.6em;
}
.closeIcon {
  font-size: 40px;
  color: white;
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
}
.editIcon {
  font-size: 38px;
  color: white;
  position: absolute;
  top: 30px;
  right: 80px;
  cursor: pointer;
}
.favoriteIcon {
  font-size: 2em;
}
.likeCount {
  font-size: 2em;
  font-weight: 700;
  color: white;
  margin-left: 0.25em;
}
.timeSlotWrapper {
  width: 100%;
  margin-bottom: 1em;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: #ececec;
  font-size: 1.5em;
  color: rgba(0, 0, 0, 0.87);
}
.timeSlotTime {
  padding-bottom: 0.25em;
}
</style>
