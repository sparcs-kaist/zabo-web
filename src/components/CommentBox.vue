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
        {{ user }}
      </div>
    </div>
    <div class="body" :style="{ paddingLeft: `${(this.depth * 30) + 15}px`}">
      {{ content }}
    </div>
    <comment-box
      class="reply-box"
      v-for="(r, index) in replies"
      :content="r.content"
      :depth="depth + 1"
      :user="r.user"
      :key="index"
    >
    </comment-box>
  </div>
</template>

<script>
export default {
  props: ['content', 'depth', 'replies', 'user'],
  name: 'comment-box',
};
</script>

<style scoped>
.body {
  font-size: 0.9em;
  margin-top: 15px;
  text-align: left;
}
.header {
  display: flex;
  justify-content: flex-start;
}
.main {
  margin: 20px 0;
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
