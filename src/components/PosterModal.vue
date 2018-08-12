<template lang=''>
<div class="posterModalWrapper">
  <img :src="currentPoster" class="poster"/>
  <v-icon class="keyboard_arrow_left" v-show="posterIndex != 0" @click="changePosterNumber('left')" color="grey lighten-3">keyboard_arrow_left</v-icon>
  <v-icon class="keyboard_arrow_right" v-show="posterIndex != posters.length-1" @click="changePosterNumber('right')" color="grey lighten-3">keyboard_arrow_right</v-icon>
  <v-icon @click="closeModal" class="closeIcon">close</v-icon>
</div>
</template>
<script>
export default {
  props: {
    posters: Array,
    currentIndex: Number
  },
  data() {
    return {
      posterIndex: undefined
    };
  },
  created() {
    this.posterIndex = this.currentIndex;
    console.log(this.posters);
    console.log(this.currentIndex);
  },
  computed: {
    currentPoster() {
      return this.posters[this.posterIndex].image;
    }
  },
  methods: {
    changePosterNumber(direction) {
      if (direction == "left" && this.posterIndex != 0) {
        this.posterIndex -= 1;
      } else if (
        direction == "right" &&
        this.posterIndex != this.posters.length - 1
      ) {
        this.posterIndex += 1;
      }
    },
    closeModal() {
      this.$emit("modalClose");
    }
  }
};
</script>
<style lang='scss' scoped>
.posterModalWrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  .poster {
    width: auto;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
  }
  .keyboard_arrow_left {
    position: fixed;
    top: auto;
    bottom: auto;
    left: 40px;
    font-size: 80px;
  }
  .keyboard_arrow_right {
    position: fixed;
    top: auto;
    bottom: auto;
    right: 40px;
    font-size: 80px;
  }
  .closeIcon {
    font-size: 40px;
    color: white;
    position: fixed;
    top: 30px;
    right: 20px;
    cursor: pointer;
  }
}
</style>
