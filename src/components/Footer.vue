<template lang=''>
  <footer class="footerWrapper">
    <div class="column">
      <div class="imageWrapper">
        <img src="@/sparcslogo.png" class="image"/>
      </div>
      <div class="tapWrapper">
        <router-link to="/credit"><span class="tap">Credit</span></router-link>
        <router-link to="/license"><span class="tap">License</span></router-link>
        <router-link to="/codeofconduct"><span class="tap">Code of Conduct</span></router-link>
      </div>
    </div>
    <div class="column">
      <span>Contact : staff@sparcs.org</span>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style scoped lang='scss'>
.footerWrapper {
  display: flex;
  position: fixed;
  height: 68px;
  width: 100%;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 400;
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
.tapWrapper {
  @include breakPoint("phone") {
    display: none;
  }
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
