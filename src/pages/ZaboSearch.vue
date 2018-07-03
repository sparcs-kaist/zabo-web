<template lang=''>
<div class="totalWrapper">
  <span class="header">{{$t("검색 결과")}}</span>
  <div class="zaboListWrapper" v-if="!isLoading">
    <div class="zaboWrapper" v-if="zabo.posters.length > 0" :key="zabo.id" v-for="zabo in zaboList">
      <img :src="zabo.posters[0].image" class="zaboImage">
      <span class="zaboTitle">{{zabo.created_time}}</span>
    </div>
  </div>
</div>
</template>
<script>
import axios from '@/axios-auth';

export default {
  created () {
    axios.get('/zaboes').then(response => response.data.data)
      .then(data => {
        this.zaboList = data;
        this.isLoading = false;
      })
  },
  data () {
    return {
      zaboList: [],
      isLoading: true
    }
  }
}
</script>
<style scoped lang=''>
.totalWrapper {
  z-index: 800;
  width: 100%;
  position: absolute;
  top: 78px;
  left: 0;
  bottom: 0;
  right: 0;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.header {
  font-size: 2rem;
  width: 80%;
  min-width: 900px;
  text-align: left;
  margin-bottom: 20px;
}
.zaboListWrapper {
  width: 80%;
  min-width: 400px;
  min-height: 800px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
}
.zaboWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1em;
}
.zaboWrapper:last-child {
  margin-right: 0;
}
.zaboImage {
  width: 200px;
  height: 300px;
  margin-bottom: 0.75em;
}
.zaboTitle {
  font-size: 1.25em;
}
</style>
