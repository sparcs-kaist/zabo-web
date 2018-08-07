<template lang=''>
  <div>
    <div class="notificationWrapper" v-if="notificationsModal">
      <div class="singleNotiWrapper" v-if="notifications.length > 0" v-for="(noti, index) in notifications" :key="index">
        <div class="notiInfoWrapper" v-if="noti.type == 'SomeoneFollowing'">
          <img :src="'https://zaboapi.sparcs.org'+noti.from_profile" class="notiProfileImage">
          <span class="notiContent">
            <span class="notiFrom">{{noti.from}}</span>님이 팔로우를 시작했습니다.</span>
        </div>
        <div class="notiInfoWrapper" v-if="noti.type == 'CommentReaction'">
          <img :src="'https://zaboapi.sparcs.org'+noti.from_profile" class="notiProfileImage">
          <span class="notiContent">
            <span class="notiFrom">{{noti.from}}</span>님이 답글을 달았습니다. {{noti.content}}</span>
        </div>
        <div @click="goToZabo(noti.url)" class="notiInfoWrapper" v-if="noti.type == 'ZaboReaction'">
          <img :src="'https://zaboapi.sparcs.org'+noti.from_profile" class="notiProfileImage">
          <span class="notiContent">
            <span class="notiFrom">{{noti.from}}</span>님이 자보에 댓글을 남겼습니다. {{noti.content}}</span>
        </div>
        <div @click="goToZabo(noti.url)" class="notiInfoWrapper" v-if="noti.type == 'ZaboFollowing'">
          <img :src="'https://zaboapi.sparcs.org'+noti.from_profile" class="notiProfileImage">
          <span class="notiContent">
            <span class="notiFrom">{{noti.from}}</span>님이 새로운 자보를 올렸습니다. {{noti.content}}</span>
        </div>
      </div>
      <div v-else class="emptyNotification">
        <span>알림이 없습니다.</span>
      </div>
    </div>
    <div v-if="notificationsModal" class="triangle"></div>
    <div v-if="notificationsModal" class="triangle triangleBorder"></div>
  </div>
</template>
<script>
export default {
  props: ["notifications", "notificationsModal"],
  methods: {
    goToZabo(id) {
      this.$router.push({name: "ZaboDetail", params: {zabo_id: id}})
    }
  }
};
</script>
<style lang=''>
.notificationWrapper {
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: flex-start;
  justify-content: flex-start;
  top: 40px;
  right: 0;
  background-color: white;
  border: 0px solid transparent;
  width: 100%;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  min-width: 500px;
  max-width: 500px;
  min-height: 250px;
  max-height: 250px;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 500;
}
.notificationWrapper::-webkit-scrollbar {
  width: 10px;
  background-color: transparent;
  border-radius: 5px;
}
.notificationWrapper::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
.notificationWrapper::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
.notificationWrapper::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.1);
}
.notiContent {
  margin-left: 0.5em;
  font-size: 1em;
  z-index: 1000;
  z-index: inherit;
}

.notiProfileImage {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  z-index: 900;
  z-index: inherit;
}
.notiFrom {
  font-weight: 700;
  z-index: 900;
  z-index: inherit;
}
.notiInfoWrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 900;
  cursor: pointer;
  z-index: inherit;
}
.singleNotiWrapper {
  width: 100%;
  display: flex;
  min-height: 60px;
  /* max-height: 55px; */
  padding: 10px 10px;
  border-bottom: 1px solid #ececec;
  align-items: center;
  justify-content: flex-start;
  z-index: inherit;
}
.emptyNotification {
  width: 100%;
  min-height: 250px;
  max-height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25em;
  z-index: inherit;
}
.triangle {
  position: absolute;
  width: 0;
  height: 0;
  top: 30px;
  right: 27px;
  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  border-bottom: 10px solid white;
  z-index: 500;
}
.triangleBorder {
  top: 29px;
  border-bottom: 10px solid #e0e0e0;
  z-index: 2;
  z-index: 400;
}
</style>
