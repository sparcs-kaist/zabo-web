<template>
  <div class="infoScreen">
    <div class="description">
      <p v-if="isLong() && !seeMore">
        {{ shortenedInfo }} <span class="more" @click="seeMore = true">더 보기</span>
      </p>
      <p v-else>{{ info }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['info'],
  data() {
    return {
      seeMore: false,
    };
  },
  computed: {
    shortenedInfo() {
      return `${this.info.substring(0, 1000)}...`;
    },
  },
  methods: {
    isLong() {
      return this.info.length > 1000;
    },
  },
};
</script>

<style scoped>
.description {
  color: #FFF;
  font-size: 0.9em;
  text-align: left;
}
.infoScreen {
  height: 100%;
  width: 80%;
}
.more {
  color: rgb(140, 140, 140);
  cursor: pointer;
}
</style>
