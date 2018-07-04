<template lang=''>
<div class="mainWrapper">
  <h1 class="category">{{currentCategory.name}}</h1>
  <nav class="verticalNavButton">
    <v-icon x-large class="keyboard_arrow_up">keyboard_arrow_up</v-icon>
  </nav>
  <div v-if="loading" class="currentZaboesWrapper">
    <nav class="horizontalNavButton">
      <v-icon x-large class="keyboard_arrow_left">keyboard_arrow_left</v-icon>
    </nav>
    <carousel-3d class="carouselWrapper">
      <slide :key="'zaboesRow'+i" v-for="i in zaboesRow" :index="i">
        <div class="posterWrapper">
          <div :key="'columnNumber'+j" v-for="j in columnNumber">
            <img class="poster" :src="zaboes[getCurrentZaboNumber(i,j)].posters[0].image">
          </div>
        </div>
      </slide>
    </carousel-3d>
    <nav class="horizontalNavButton">
      <v-icon x-large class="keyboard_arrow_right">keyboard_arrow_right</v-icon>
    </nav>
  </div>
  <!-- <v-progress-circular
    indeterminate
    color="primary"
    v-else
  ></v-progress-circular> -->
  <nav class="verticalNavButton">
    <v-icon x-large class="keyboard_arrow_down">keyboard_arrow_down</v-icon>
  </nav>
</div>
</template>
<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';

export default {
  data () {
    return {
      zaboCursor: 0,
      windowWidth: 0,
      categories: {
        "전체": "",
        "리크루팅": "R",
        "퍼포먼스": "P",
        "경쟁": "C",
        "설명회": "F",
        "강의": "L",
        "전람회": "E"
      },
      currentCategory: {
        name: "전체",
        index: 0
      },
      categoryList: ["전체", "리크루팅", "퍼포먼스", "경쟁", "설명회", "강의", "전람회"],
      loading: true,
    }
  },
  created () {
    this.getWindowWidth();
    this.$store.dispatch("zaboesGetPageCount", { pageSize: 4 }).then(res => {
      const totalPage = res;
      console.log('how many??')
      for (var i = 1; i <= totalPage; i++) {
        this.$store.dispatch("zaboesList", { pageNum: i, pageSize: 4 });
        this.pageList.push(i);
      };
      console.log(this.zaboes[0].posters[0].image)
      this.loading = false;
    })
  },
  methods: {
    getCurrentZaboNumber: function (i, j) {
      return this.columnNumber * i + j
    },
    getWindowWidth () {
      this.windowWidth =
        document.body.clientWidth ||
        document.documentElement.clientWidth ||
        window.innerWidth;
    },
  },
  components: {
    Carousel3d,
    Slide
  },
  computed: {
    pageList () {
      return []
    },
    zaboes () {
      return this.$store.getters.zaboes;
    },
    zaboesPageCount () {
      return this.$store.getters.zaboesPageCount;
    },
    zaboesRow () {
      return Math.floor(this.zaboes.length / this.columnNumber);
    },
    columnNumber () {
      if (this.windowWidth > 1700) {
        return 4;
      }
      if (this.windowWidth > 1400) {
        return 3;
      }
      if (this.windowWidth > 1100) {
        return 2;
      } else {
        return 1;
      }
    },
  }
}
</script>
<style scoped lang=''>
.mainWrapper {
  padding-top: 78px;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.category {
  font-size: 2em;
}
.carouselWrapper {
  background-color: black;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 800px;
  transform: translate(-50%, -50%) rotate(90deg);
}
</style>
