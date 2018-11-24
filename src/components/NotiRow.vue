<template lang=''>
<div>
<div v-if="noti !== null" @click="noti.type !== 'SomeoneFollowing' ? goToZabo(noti.url) : null" class="notiInfoWrapper">
  <img :src="baseURL+noti.from_profile" v-if="noti.from_profile != null" class="notiProfileImage">
  <img src="../assets/default_person.png" v-else class="notiProfileImage">
  <span class="notiContent">
    <span class="notiFrom">{{noti.from}}</span>
    {{comment + noti.content}}
  </span>
</div>
<div v-else></div>
</div>
</template>
<script>
import { baseURL } from "@/variables.js";

export default {
  data() {
    return {
      baseURL
    };
  },
  props: ["noti"],
  methods: {
    goToZabo(id) {
      this.$router.push({ name: "ZaboDetail", params: { zabo_id: id } });
    }
  },
  computed: {
    comment() {
      switch (this.noti.type) {
        case "SomeoneFollowing":
          return "님이 팔로우를 시작했습니다.";
        case "CommentReaction":
          return "님이 답글을 달았습니다.";
        case "ZaboReaction":
          return "님이 자보에 댓글을 남겼습니다.";
        case "ZaboFollowing":
          return "님이 새로운 자보를 올렸습니다.";
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.notiInfoWrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 900;
  cursor: pointer;
  z-index: inherit;
  .notiProfileImage {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    z-index: 900;
    z-index: inherit;
  }
  .notiContent {
    margin-left: 0.5em;
    font-size: 1em;
    z-index: 1000;
    z-index: inherit;
    .notiFrom {
      font-weight: 700;
      z-index: 900;
      z-index: inherit;
    }
  }
}
</style>
