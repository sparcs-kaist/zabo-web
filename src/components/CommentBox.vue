<template>
  <div class="main">
    <div class="body">
      <div class="pic"></div>
      <div>
        <span class="name">
          {{ author.nickName }}
        </span>
        <span class="commentBoxContent">{{ content }}</span>
        <span class="replyHandler" @click="recommentInputState = !recommentInputState">댓글 달기</span>
      </div>
    </div>
    <div>
    </div>
    <div class="recommentBoxHandler" v-show="!recommentBoxState" @click="recommentBoxState = !recommentBoxState">
      ㄴ 댓글 더보기
    </div>
    <re-comment-box v-show="recommentBoxState" class="recomment-box" v-for="r in replies" :author="r.author" :comment_id="r.id" :content="r.content" :depth="depth + 1" :key="r.id">
    </re-comment-box>
    <input-field v-show="!recommentInputState" class="input" :content.sync="newReply" :on-click="onSubmitReply" placeholder-text="댓글을 작성하세요...">
    </input-field>
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
      recommentInputState: false,
      recommentBoxState: false
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
    recommentBoxLength () {
      return this.replies.length
    },
  },
};
</script>

<style scoped>
.body {
  font-size: 1em;
  margin-top: 15px;
  text-align: left;
  display: flex;
  align-items: center;
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
  font-size: 1.25em;
  font-weight: bold;
  letter-spacing: 0.01em;
  margin-right: 0.5em;
}
.pic {
  border-radius: 50%;
  background-color: white;
  height: 30px;
  margin-right: 10px;
  min-width: 30px;
}
.tag {
  color: white;
  font-size: 24px;
  margin-right: 8px;
}
.replyHandler {
  font-size: 1em;
  cursor: pointer;
  margin-left: 0.5em;
}
.recommentBoxHandler {
  cursor: pointer;
  font-size: 1em;
  margin-left: 0.5em;
}
.commentBoxContent {
  flex: 1;
}
</style>
