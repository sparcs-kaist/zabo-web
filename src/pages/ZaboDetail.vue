<template>
  <div class="root">
    Header Component
    <div class="main">
      <div class="left">
        <p style="color: black;">Category</p>
        <img class="image" src="http://via.placeholder.com/170x250" height="250" width="170"/>
      </div>

      <div class="right">
        <div class="headerStyle">
          <p @click="selectTab(0)" :class="toDisplay === 0 ? 'selected tab' : 'tab' ">Info</p>
          <p @click="selectTab(1)" :class="toDisplay === 1 ? 'selected tab' : 'tab' ">Review</p>
          <p @click="selectTab(2)" :class="toDisplay === 2 ? 'selected tab' : 'tab' ">신청</p>
        </div>

        <div class="bodyStyle" v-show="toDisplay === 0">
          <info-screen />
        </div>
        <div class="bodyStyle" v-show="toDisplay === 1">
          <div style="color: blue">HELLO</div>
        </div>
        <div class="bodyStyle" v-show="toDisplay === 2">
          <div style="color: green">HELLO</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfoScreen from '../components/InfoScreen';

export default {
  data() {
    return {
      // 0 displays Info, 1 displays Review, 2 displays 신청
      toDisplay: 0,
    };
  },
  components: {
    InfoScreen,
  },
  methods: {
    selectTab(selected) {
      this.toDisplay = selected;
    },
  },
};
</script>

<style scoped>
.headerStyle {
  display: flex;
  flex-direction: column;
  margin: 30vh 50px 50px 50px;
}
.image {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.left {
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 25%;
}
.main {
  display: flex;
  height: 100%;
}
.right {
  background-color: rgb(35, 35, 35);
  display: flex;
  width: 75%;
}
.root {
  min-width: 100vw;
}
.selected {
  color: #FFF;
  font-weight: bold;
}
.tab {
  color: rgb(220, 220, 220);
  cursor: pointer;
  margin: 8px 0 8px 0;
}
</style>
