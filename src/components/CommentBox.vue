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
      <div class="pic"></div>
      <div class="name">
        {{ user }}
      </div>
    </div>
    <div class="body">
      {{ content }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['content', 'user'],
};
</script>

<style scoped>
.body {
  margin-top: 15px;
  padding-left: 15px;
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
  font-size: 18px;
  letter-spacing: 0.01em;
}
.pic {
  border-radius: 50%;
  background-color: white;
  height: 30px;
  margin-right: 10px;
  width: 30px;
}
</style>
