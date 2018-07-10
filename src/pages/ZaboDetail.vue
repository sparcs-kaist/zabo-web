<template>
  <div class="main">
    <div class="column">
      <div class="headerStyle">
        <p class="heading">{{title}}</p>
        <p class="subheading">{{updated_time}}</p>
        <div class="buttonWrapper">
          <button class="buttonTap">{{$t("참여하기")}}</button>
          <button class="buttonTap">{{$t("찜하기")}}</button>
        </div>
        <div class="navbar">
          <p @click="selectTab(0)" :class="toDisplay === 0 ? 'selected tab' : 'tab' ">{{$t("정보")}}</p>
          <p @click="selectTab(1)" :class="toDisplay === 1 ? 'selected tab' : 'tab' ">{{$t("리뷰")}}</p>
        </div>
        <input-field v-show="toDisplay === 1" :content.sync="newComment" :on-click="onSubmitComment" placeholder-text="리뷰를 입력하세요.">
        </input-field>
      </div>

      <div class="bodyWrapper" v-show="toDisplay === 0">
        <info-screen :info="this.content" />
      </div>
      <div class="bodyWrapper" v-show="toDisplay === 1">
        <review-screen :comments="comments" />
      </div>
    </div>
    <div class="column">
      <img :src="this.image" height="600" width="500" />
    </div>
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
      image: "",
      background: "",
      content: "",
      title: "",
      location: "",
      comments: [],
      newComment: '',
      // 0 displays Info, 1 displays Review
      toDisplay: 0,
      zabo_id: -1,
      updated_time: ""
    };
  },
  components: {
    InfoScreen,
    InputField,
    ReviewScreen,
  },
  methods: {
    onSubmitComment () {
      axios({
        method: 'post',
        url: `http://localhost:8000/api/comments/`,
        data: {
          content: this.newComment,
          zabo: this.zabo_id,
          "is_private": true,
          "is_deleted": true,
          "is_blocked": true
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
  },
  created () {
    this.zabo_id = this.$route.params.zabo_id;
    axios({
      method: 'get',
      url: `http://localhost:8000/api/zaboes/${this.zabo_id}/`
    })
      .then((response) => {
        const { posters, content, title, location, updated_time, comments } = response.data
        this.image = posters["0"].image;
        this.background = posters["0"].image;
        this.content = content;
        this.title = title;
        this.location = location;
        this.updated_time = updated_time
        this.comments = comments;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.main {
  background-color: rgb(128, 128, 128);
  display: flex;
  width: 80%;
  position: absolute;
  top: 0px;
  bottom: 68px;
  left: 10%;
  right: 10%;
  margin-top: 78px;
  overflow: hidden;
}
.bodyWrapper {
  flex: 1;
  color: white;
  position: relative;
  width: 100%;
  /* overflow-y: scroll;
  overflow-x: hidden; */
}
/* .bodyStyle::-webkit-scrollbar{ background-color: transparent;}
.bodyStyle::-webkit-scrollbar:hover {background-color: transparent;} */
/* .root::-webkit-scrollbar{ display: none;}
.root::-webkit-scrollbar:hover { display: none;} */
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
  width: 50%;
}
.column:first-child {
  padding-top: 80px;
  padding-left: 40px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.column:last-child {
  justify-content: center;
  align-items: center;
  width: 50%;
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
</style>
