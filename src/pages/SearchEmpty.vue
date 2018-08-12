<template lang=''>
  <div class="totalWrapper">
    <span class="contentWrapper">검색창에 원하시는 검색어를 입력해주세요.</span>
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
  padding: 20px;
  .contentWrapper {
    font-size: $biggest-font-size;
    margin-bottom: 20px;
    text-align: center;
    @include breakPoint("phone") {
      font-size: $big-font-size;
    }
  }
}
</style>
