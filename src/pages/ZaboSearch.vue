<template lang=''>
<div class="totalWrapper">
  <span class="header">{{$t("검색 결과")}}</span>
  <div class="zaboListWrapper" v-if="!isLoading">
    <div class="zaboWrapper" v-if="zabo.posters.length > 0" :key="zabo.id" v-for="zabo in zaboList">
      <img :src="zabo.posters[0].image" class="zaboImage">
      <span class="zaboTitle">{{zabo.title}}</span>
    </div>
  </div>
</div>
</template>
<script>
import axios from '@/axios-auth';

export default {
  created () {
    console.log(this.$route.params.search)
    axios({
      methods: 'get',
      url: `/zaboes?search=${this.$route.params.search}`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(response => response.data.data)
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
  width: 100%;
  position: absolute;
  top: 78px;
  left: 0;
  bottom: 0;
  right: 0;
  padding-top: 27px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.header {
  font-size: 1.375em;
  font-weight: 900;
  width: 75%;
  min-width: 900px;
  text-align: left;
  margin-bottom: 20px;
  padding-left: 9px;
}
.zaboListWrapper {
  width: 75%;
  min-width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}
.zaboWrapper {
  display: flex;
  min-width: 201px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2em;
}
.zaboImage {
  width: 183px;
  height: 286px;
  margin-bottom: 0.75em;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.24), 0px 5px 10px rgba(0, 0, 0, 0.16);
}
.zaboTitle {
  font-size: 1.25em;
  font-weight: 900;
}
</style>
