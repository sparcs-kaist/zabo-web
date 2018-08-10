<template lang=''>
  <div class="totalWrapper">
    <span class="errorCode">404</span>
    <span class="contentWrapper">페이지를 찾을 수 없습니다.</span>
    <router-link to="/">
      <span class="routing">메인 화면으로 돌아가기</span>
    </router-link>
  </div>
</template>
<script>
export default {};
</script>
<style scoped lang='scss'>
.totalWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 90px;
  bottom: 68px;
  left: 0;
  right: 0;
  font-size: 2em;
  .errorCode {
    font-size: $max-font-size;
    margin-bottom: 30px;
  }
  .contentWrapper {
    font-size: $small-max-font-size;
    margin-bottom: 20px;
  }
  .routing {
    color: $theme-color;
    font-size: $big-font-size;
  }
}
</style>
