<template lang=''>
  <div>
    <div class="notificationWrapper" v-if="notificationsModal">
      <div class="singleNotiWrapper" v-if="notifications.length > 0" v-for="(noti, index) in notifications" :key="index">
        <NotiRow :noti="noti"/>
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
import { baseURL } from "@/variables.js";
import NotiRow from "./NotiRow";

export default {
  props: ["notifications", "notificationsModal"],
  data() {
    return {
      baseURL: baseURL
    };
  },
  methods: {
    goToZabo(id) {
      this.$router.push({ name: "ZaboDetail", params: { zabo_id: id } });
    }
  },
  components: {
    NotiRow
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
