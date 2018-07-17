<template>
  <div class="infoScreen">
    <div class="description">
      <h1 class="header">카테고리</h1>
      <p class="content">{{this.computedCategory}}</p>
      <h1 class="header">결제 여부</h1>
      <p class="content">{{this.computedPayment}}</p>
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
    computedCategory () {
      if (this.category == "R") {
        return "리크루팅"
      } else if (this.category == "P") {
        return "공연"
      } else if (this.category == "C") {
        return "대회"
      } else if (this.category == "F") {
        return "설명회"
      } else if (this.category == "L") {
        return "세미나"
      } else if (this.category == "E") {
        return "전람회"
      }
    },
    computedPayment () {
      if (this.payment == "F") {
        return "무료"
      }
    }
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
  font-size: 1.125em;
  text-align: left;
}
.infoScreen {
  height: 100%;
  width: 100%;
}
.header {
  font-size: 1.5em;
  margin-bottom: 0.125em;
}
.content {
  font-size: 1.125em;
  margin-bottom: 1em;
}

.more {
  color: rgb(140, 140, 140);
  cursor: pointer;
}
</style>
