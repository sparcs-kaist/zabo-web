<template>
  <!-- <div class="info-screen">
    <div class="description">
      <p v-if="!seeMore">
        {{ shortenedInfo }} <span class="more" @click="seeMore = true">더 보기</span>
      </p>
      <p v-else>{{ info }}</p>
    </div>
  </div> -->
  <div class="main">
    <div class="header">
      <div v-show="depth === 1" class="tag">ㄴ</div>
      <div class="pic"></div>
      <div class="name">
        {{ author }}
      </div>
    </div>
    <div class="body" :style="{ paddingLeft: `${(this.depth * 30) + 15}px`}">
      <div v-if="isLong() && !seeMore">
        {{ shortenedComment }} <span class="more" @click="seeMore = true">더 보기</span>
      </div>
      <div v-else>{{ content }}</div>
    </div>
    <div v-show="depth === 0">
      <input-field
        class="input"
        :content.sync="newReply"
        :on-click="onSubmitReply"
        placeholder-text="댓글을 작성하세요..."
      >
      </input-field>
    </div>
    <comment-box
      class="reply-box"
      v-for="r in replies"
      :author="r.author"
      :comment_id="r.id"
      :content="r.content"
      :depth="depth + 1"
      :key="r.id"
    >
    </comment-box>
  </div>
</template>

<script>
import axios from 'axios';
import InputField from './InputField';

export default {
  components: {
    InputField,
  },
  props: ['author', 'comment_id', 'content', 'depth', 'replies'],
  name: 'comment-box',
  data() {
    return {
      newReply: '',
      seeMore: false,
    };
  },
  methods: {
    isLong() {
      return this.content.length > 200;
    },
    onSubmitReply() {
      axios({
        method: 'post',
        url: 'http://localhost:12345/api/recomments/',
        auth: {
          username: 'jidan@example.com',
          password: 'q1234321',
        },
        data: {
          content: this.newReply,
          comment: this.comment_id,
        },
      })
        .then((response) => {
          // eslint-disable-next-line
          console.log(response);
          this.replies.push(response.data);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
  },
  computed: {
    shortenedComment() {
      return `${this.content.substring(0, 200)}...`;
    },
  },
};
</script>

<style scoped>
.body {
  font-size: 0.9em;
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
.reply-box {
  transform: translate(30px);
}
.tag {
  color: white;
  font-size: 24px;
  margin-right: 8px;
}
</style>
