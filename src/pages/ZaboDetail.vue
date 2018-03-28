<template>
  <div class="root">
    Header Component
    <div class="main">
      <div class="left">
        <p>Category</p>
        <img src="http://via.placeholder.com/200x150" />
      </div>

      <div class="right">
        <div class="headerStyle">
          <p @click="selectTab(0)" :class="toDisplay === 0 ? 'selected tab' : 'tab' ">Info</p>
          <p @click="selectTab(1)" :class="toDisplay === 1 ? 'selected tab' : 'tab' ">Review</p>
          <p @click="selectTab(2)" :class="toDisplay === 2 ? 'selected tab' : 'tab' ">신청</p>
        </div>

        <div class="bodyStyle" v-show="toDisplay === 0">
          <info></info>
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
import Info from '../components/Info';

export default {
  data() {
    return {
      // 0 displays Info, 1 displays Review, 2 displays 신청
      toDisplay: 0,
    };
  },
  components: {
    Info,
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
  justify-content: center;
  margin: 50px;
}
.left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 25%;
}
.main {
  display: flex;
  height: 100vh;
}
.right {
  background-color: rgb(35, 35, 35);
  display: flex;
  width: 75%;
}
.root {
  width: 100vw;
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
