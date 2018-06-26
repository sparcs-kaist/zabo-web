<template>
  <div class="root">
    Header Component
    <div class="main">

      <div class="left">
        <div class="headerStyle">
          <p class="heading">Event name</p>
          <p class="subheading">Date</p>
          <div class="buttonRow">
            <div class="joinButton">참여하기</div>
            <div class="wishlistButton">찜하기</div>
          </div>
          <div class="navbar">
            <p @click="selectTab(0)" :class="toDisplay === 0 ? 'selected tab' : 'tab' ">Info</p>
            <p @click="selectTab(1)" :class="toDisplay === 1 ? 'selected tab' : 'tab' ">Review</p>
          </div>
          <input-field v-show="toDisplay === 1" :content.sync="newComment" :on-click="onSubmitComment" placeholder-text="리뷰를 입력하세요...">
          </input-field>
        </div>

        <div class="bodyStyle" v-show="toDisplay === 0">
          <info-screen :info="this.info" />
        </div>
        <div class="bodyStyle" v-show="toDisplay === 1">
          <review-screen :comments="comments" />
        </div>
      </div>

      <div class="right">
        <img :src="this.img" height="450" width="340" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import InfoScreen from '../components/InfoScreen';
import InputField from '../components/InputField';
import ReviewScreen from '../components/ReviewScreen';

export default {
  data() {
    return {
      comments: [],
      img: '',
      info: '',
      newComment: '',
      // 0 displays Info, 1 displays Review
      toDisplay: 0,
      zabo_id: 0,
    };
  },
  components: {
    InfoScreen,
    InputField,
    ReviewScreen,
  },
  methods: {
    onSubmitComment() {
      axios({
        method: 'post',
        url: 'http://localhost:12345/api/comments/',
        auth: {
          username: 'jidan@example.com',
          password: 'q1234321',
        },
        data: {
          content: this.newComment,
          zabo: this.zabo_id,
        },
      })
        .then((response) => {
          // eslint-disable-next-line
          console.log(response);
          this.comments.push(response.data);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
      this.newComment = '';
    },
    selectTab(selected) {
      this.toDisplay = selected;
    },
  },
  mounted() {
    this.zabo_id = this.$route.params.zabo_id;
    axios({
      method: 'get',
      url: `http://localhost:12345/api/zaboes/${this.zabo_id}/`,
      auth: {
        username: 'jidan@example.com',
        password: 'q1234321',
      },
    })
      .then((response) => {
        this.comments = response.data.comments;
        this.img = response.data.posters[0].image;
        this.info = response.data.content;
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  },
};
</script>

<style scoped>
.bodyStyle {
  color: white;
  height: 65%;
  overflow-y: auto;
  margin: 20px 50px 50px 50px;
}
/* .bodyStyle::-webkit-scrollbar{ background-color: transparent;}
.bodyStyle::-webkit-scrollbar:hover {background-color: transparent;} */
/* .root::-webkit-scrollbar{ display: none;}
.root::-webkit-scrollbar:hover { display: none;} */
.buttonRow {
  align-items: center;
  display: flex;
  margin: 24px 0;
}
.headerStyle {
  color: rgb(220, 220, 220);
  display: flex;
  flex-direction: column;
  height: 35%;
  margin: 50px 50px 0 50px;
}
.heading {
  font-size: 2em;
  font-weight: bold;
  letter-spacing: 0.01em;
  margin: 0;
  text-align: left;
}
.joinButton {
  background-color: rgb(15, 59, 120);
  color: white;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  height: 1.1em;
  margin-right: 16px;
  padding: 7px 24px;
  text-align: center;
  vertical-align: center;
}
.left {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 60%;
}
.main {
  background-color: rgb(128, 128, 128);
  display: flex;
  height: 100%;
  margin: 10px 50px 50px 50px;
}
.navbar {
  display: flex;
  justify-content: flex-start;
  margin: 12px 0 25px 0;
}
.right {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
}
.root {
  min-width: 100vw;
  height: 100vh;
}
.selected {
  color: #fff;
  font-weight: bold;
}
.subheading {
  font-weight: bold;
  margin: 0;
  text-align: left;
}
.tab {
  color: rgb(220, 220, 220);
  cursor: pointer;
  margin: 0 16px 0 0;
}
.wishlistButton {
  background-color: rgb(230, 230, 230);
  color: rgb(80, 80, 80);
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  height: 1.1em;
  padding: 7px 12px;
  text-align: center;
}
</style>
