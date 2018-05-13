<template>
  <div class="root">
    Header Component
    <div class="main">

      <div class="left">
        <div class="headerStyle">
          <p class="heading">Event name</p>
          <p class="subheading">Date</p>
          <p class="subheading">Organization</p>
          <div class="navbar">
            <p @click="selectTab(0)" :class="toDisplay === 0 ? 'selected tab' : 'tab' ">Info</p>
            <p @click="selectTab(1)" :class="toDisplay === 1 ? 'selected tab' : 'tab' ">Review</p>
            <p @click="selectTab(2)" :class="toDisplay === 2 ? 'selected tab' : 'tab' ">신청</p>
          </div>
          <input-field
            v-show="toDisplay === 1"
            :content.sync="newComment"
            :on-click="onSubmitComment"
            placeholder-text="리뷰를 입력하세요..."
          >
          </input-field>
        </div>

        <div class="bodyStyle" v-show="toDisplay === 0">
          <info-screen :info="this.info"/>
        </div>
        <div class="bodyStyle" v-show="toDisplay === 1">
          <review-screen :comments="comments" />
        </div>
        <div class="bodyStyle" v-show="toDisplay === 2">
          <div style="color: green">HELLO</div>
        </div>
      </div>

      <div class="right">
        <img :src="this.img" height="450" width="340"/>
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
      posters: [],
      // 0 displays Info, 1 displays Review, 2 displays 신청
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
        this.posters = response.data.posters;
        this.info = response.data.content;
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });

      axios({
        method: 'get',
        url: 'http://localhost:12345/api/posters/41/',
        auth: {
          username: 'jidan@example.com',
          password: 'q1234321',
        },
      })
        .then((response) => {
          this.img = response.data.image;
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
  height: 75%;
  overflow-y: scroll;
  margin: 20px 50px 50px 50px;
}
/* .bodyStyle::-webkit-scrollbar{ background-color: transparent;}
.bodyStyle::-webkit-scrollbar:hover {background-color: transparent;} */
/* .root::-webkit-scrollbar{ display: none;}
.root::-webkit-scrollbar:hover { display: none;} */
.headerStyle {
  color: rgb(220, 220, 220);
  display: flex;
  flex-direction: column;
  height: 25%;
  margin: 50px 50px 0 50px;
}
.heading {
  font-size: 2em;
  font-weight: bold;
  letter-spacing: 0.01em;
  margin: 0;
  text-align: left;
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
  margin: 20px 0 25px 0;
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
  color: #FFF;
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
</style>
