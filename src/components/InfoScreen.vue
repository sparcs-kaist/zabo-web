<template>
  <div class="infoScreen">
    <div class="description">
      <h1 class="header">카테고리</h1>
      <p class="content">{{this.category}}</p>
      <h1 class="header">결제 여부</h1>
      <p class="content">{{this.payment}}</p>
      <h1 class="header">자보 설명</h1>
      <p class="content" v-if="!isLong">
        {{ shortenedInfo }}
        <span class="more" @click="seeMore = true">더 보기</span>
      </p>
      <p v-else>{{ info }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['info', 'category', 'payment'],
  data () {
    return {
      seeMore: false,
    };
  },
  computed: {
    shortenedInfo () {
      return `${this.info.substring(0, 1000)}...`;
    },
  },
  methods: {
    isLong () {
      if (this.info.length > 1000) {
        return true
      } else {
        return false
      }
    },
  },
};
</script>

<style scoped>
.description {
  color: #fff;
  font-size: 1em;
  text-align: left;
}
.infoScreen {
  height: 100%;
  width: 100%;
}
.content {
  font-size: 1em;
}

.more {
  color: rgb(140, 140, 140);
  cursor: pointer;
}
</style>
