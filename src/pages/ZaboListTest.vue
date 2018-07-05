<template lang=''>
<div class="mainWrapper">
  <h1 class="category">{{currentCategory.name}}</h1>
  <nav class="verticalNavButton">
    <v-icon class="keyboard_arrow">keyboard_arrow_up</v-icon>
  </nav>
  <div v-if="zaboesExist && !loading" class="currentZaboesWrapper">
    <nav class="horizontalNavButton">
      <v-icon class="keyboard_arrow">keyboard_arrow_left</v-icon>
    </nav>
    <carousel-3d :inverseScaling="60" :display="5" :space="80" :animationSpeed="300" :perspective="0" :width="464" :height="posterWrapperHeight" id="carouselWrapper">
      <slide v-for="i in zaboesRow" :key="i-1" :index="i-1">
        <div class="posterWrapper" :class="'slide'+i">
            <img :key="key" v-for="(zabo, key, index) in renderedList[i-1]" class="poster" :src="zabo.posters[0].image">
        </div>
      </slide>
    </carousel-3d>
    <nav class="horizontalNavButton">
      <v-icon class="keyboard_arrow">keyboard_arrow_right</v-icon>
    </nav>
  </div>
  <v-progress-circular
    indeterminate
    color="primary"
    v-else
  ></v-progress-circular>
  <nav class="verticalNavButton">
    <v-icon class="keyboard_arrow">keyboard_arrow_down</v-icon>
  </nav>
</div>
</template>
<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';

export default {
  data () {
    return {
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
      pageList: [],
      defaultImage: "@/assets/logo.png",
      posterWrapperHeight: 0
    }
  },
  created: async function () {
    this.getWindowWidth();
    this.$store.dispatch("zaboesGetPageCount", { pageSize: 4 }).then(res => {
      const totalPage = res;
      for (var i = 1; i <= totalPage; i++) {
        this.$store.dispatch("zaboesList", { pageNum: i, pageSize: 4 });
        this.pageList.push(i);
      };
    })
      .then(() => this.loading = false)
  },
  beforeMount () {
    window.addEventListener("resize", this.getWindowWidth);
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
      console.log(this.windowWidth)
    },
  },
  components: {
    'carousel-3d': Carousel3d,
    'slide': Slide
  },
  computed: {
    zaboes () {
      return this.$store.getters.zaboes;
    },
    zaboesPageCount () {
      return this.$store.getters.zaboesPageCount;
    },
    zaboesRow () {
      return Math.ceil(this.zaboes.length / this.columnNumber);
    },
    columnNumber () {
      if (this.windowWidth > 1700) {
        this.posterWrapperHeight = 1225
        return 4;
      }
      if (this.windowWidth > 1400) {
        this.posterWrapperHeight = 916
        return 3;
      }
      if (this.windowWidth > 1100) {
        this.posterWrapperHeight = 607
        return 2;
      } else {
        this.posterWrapperHeight = 298
        return 1;
      }
    },
    zaboesExist () {
      if (this.zaboes.length > 1) {
        return true
      } else {
        return false
      }
    },
    renderedList () {
      let renderedList = [];
      for (let i = 0; i < this.zaboesRow; i++) {
        renderedList.push(this.zaboes.slice(i * this.columnNumber, (i + 1) * this.columnNumber))
      }
      console.log(renderedList)
      return renderedList
    }
  },
  beforeDestroy () {
    this.$store.commit("ZABOES_RESET");
    window.removeEventListener("resize", this.getWindowWidth);
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.category {
  padding-top: 12px;
  font-size: 2em;
}
.currentZaboesWrapper {
  width: 100%;
  height: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.posterWrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
}
.poster {
  width: 464px;
  height: 298px;
  margin-top: 11px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
}

#carouselWrapper {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(90deg);
}
.carousel-3d-slider {
  background: transparent;
  background-color: transparent;
}

.keyboard_arrow {
  font-size: 60px;
}
</style>
