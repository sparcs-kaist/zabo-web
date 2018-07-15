<template>
  <div class="infoScreen">
    <div class="description">
      <p v-if="!isLong">
        {{ shortenedInfo }}
        <span class="more" @click="seeMore = true">더 보기</span>
      </p>
      <p v-else>{{ info }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['info'],
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
.more {
  color: rgb(140, 140, 140);
  cursor: pointer;
}
</style>
