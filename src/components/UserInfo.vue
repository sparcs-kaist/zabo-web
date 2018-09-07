<template>
  <div>
    <div class="userInfoWrapper">
      <img :src="this.user.profile_image" v-if="this.user.profile_image != null" class="userImage">
      <img src="../assets/default_person.png" v-else class="userImage">
      <span class="userName">{{user.nickName}}</span>
    </div>
    <!-- <button v-if="!following[this.index]" class="Follow" @click="followUser(this.user.nickName, this.index)">
      팔로우
    </button>
    <button v-if="following[this.index]" class="Follow" @click="unfollowUser(this.user.nickName, this.index)">
      팔로우 취소
    </button> -->
  </div>
</template>

<script>
import * as types from "@/store/mutation-types";

export default {
  props: ['index', 'showFollow', 'user'],
};
</script>

<style scoped lang='scss'>
.userInfoWrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .userImage {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .userName {
    font-size: $big-font-size;
    font-weight: $big-font-weight;
    margin-left: 10px;
  }
  @include breakPoint("phone") {
    .userImage {
      width: 35px;
      height: 35px;
    }
    .userName {
      font-size: $normal-font-size;
    }
  }
}
.Follow {
  width: 100%;
  height: 30px;
  background-color: $theme-color;
  border-radius: 3px;
  color: white;
  margin-top: 1em;
}
</style>
