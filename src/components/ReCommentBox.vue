<template>
  <div class="main">
    <div class="body" :style="{ paddingLeft: `${(this.depth * 30) + 15}px`}">
      <img :src="author.profile_image" class="pic">
      <span class="name">
        {{ author.nickName }}
      </span>
      <span class="recommentContent" v-if="isLong() && !seeMore">
        {{ shortenedComment }}
        <span class="more" @click="seeMore = true">더 보기</span>
      </span>
      <span class="recommentContent" v-else>{{ content }}</span>
    </div>
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
  name: 're-comment-box',
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
  font-size: 1em;
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
  min-height: 30px;
  max-height: 30px;
  margin-right: 10px;
  min-width: 30px;
  max-width: 30px;
}
.recommentContent {
  margin-left: 0.5em;
}
</style>
