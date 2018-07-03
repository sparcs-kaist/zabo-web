<template lang=''>
  <footer class="footerWrapper">
    <div class="column">
      <div class="imageWrapper">
        <img src="@/sparcslogo.png" class="image"/>
      </div>
      <div class="tapWrapper">
        <a href="http://www.sparcs.org/" class="tap">Credit</a>
        <a href="http://www.sparcs.org/" class="tap" >License</a>
        <a href="http://www.sparcs.org/" class="tap" >Code of Conduct</a>
      </div>
    </div>
    <div class="column">
      <span>Contact : staff@sparcs.org</span>
    </div>
  </footer>
</template>
<script>
export default {
}
</script>
<style scoped lang=''>
.footerWrapper {
  display: flex;
  position: fixed;
  height: 68px;
  width: 100%;
  bottom: 0;
  align-items: center;
  justify-content: center;
}
.column {
  width: 50%;
  display: flex;
  padding-left: 27px;
  align-items: center;
}
.column:first-child {
  justify-content: flex-start;
  font-size: 1em;
  font-weight: 400;
}
.column:last-child {
  justify-content: flex-end;
  font-size: 0.75em;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.6);
  padding-right: 27px;
}
.tap {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
  margin-left: 27px;
}
.image {
  height: 23px;
  /* margin-top: 18px;
  margin-left: 27px; */
}
</style>
