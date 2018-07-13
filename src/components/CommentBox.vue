<template>
  <div class="main">
    <div class="header">
      <div class="pic"></div>
      <div class="name">
        {{ author.nickName }}
      </div>
    </div>
    <div class="body">
      <div v-if="isLong() && !seeMore">
        {{ shortenedComment }}
        <span class="more" @click="seeMore = true">더 보기</span>
      </div>
      <div v-else>{{ content }}</div>
    </div>
    <div>
      <input-field class="input" :content.sync="newReply" :on-click="onSubmitReply" placeholder-text="댓글을 작성하세요...">
      </input-field>
    </div>
    <re-comment-box class="recomment-box" v-for="r in replies" :author="r.author" :comment_id="r.id" :content="r.content" :depth="depth + 1" :key="r.id">
    </re-comment-box>
  </div>
</template>

<script>
import axios from 'axios';
import InputField from './InputField';
import ReCommentBox from './ReCommentBox';

export default {
  components: {
    InputField,
    ReCommentBox
  },
  props: ['author', 'comment_id', 'content', 'depth', 'replies'],
  name: 'comment-box',
  data () {
    return {
      newReply: '',
      seeMore: false,
    };
  },
  methods: {
    isLong () {
      return this.content.length > 200;
    },
    onSubmitReply () {
      axios({
        method: 'post',
        url: 'http://localhost:8000/api/recomments/',
        data: {
          content: this.newReply,
          comment: this.comment_id,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem('token')
        }
      })
        .then((response) => {
          console.log('what!')
          console.log(response);
          this.replies.push(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    shortenedComment () {
      return `${this.content.substring(0, 200)}...`;
    },
  },
};
</script>

<style scoped>
.body {
  font-size: 1.25em;
  margin-top: 15px;
  text-align: left;
}
.header {
  align-items: center;
  display: flex;
  justify-content: flex-start;
}
.input {
  padding-left: 15px;
  margin-top: 1em;
}
.main {
  margin: 20px 0 0 0;
}
.more {
  color: rgb(140, 140, 140);
  cursor: pointer;
}
.name {
  color: white;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.01em;
}
.pic {
  border-radius: 50%;
  background-color: white;
  height: 30px;
  margin-right: 10px;
  width: 30px;
}
.tag {
  color: white;
  font-size: 24px;
  margin-right: 8px;
}
</style>
