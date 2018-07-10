<template lang=''>
<div class="mainWrapper">
  <div class="categoryWrapper">
    <span class="category">{{calculatedCategoryList[0]}}</span>
    <span class="category">{{calculatedCategoryList[1]}}</span>
    <span class="category">{{calculatedCategoryList[2]}}</span>
  </div>
  <nav class="verticalNavButton">
      <img src="@/assets/up_arrow.svg" class="keyboard_arrow_updown" alt="up_arrow">
      <img src="@/assets/down_arrow.svg" class="keyboard_arrow_updown" alt="down_arrow">
  </nav>
  <div v-if="zaboesExist && !loading" class="currentZaboesWrapper">
    <nav class="horizontalNavButton">
      <img @click="categoryleft" src="@/assets/blue_button_left.svg" class="keyboard_arrow_leftright" alt="left_arrow">
    </nav>
    <carousel-3d :inverseScaling="-50"  :display="5" :space="50" :animationSpeed="300" :perspective="0" :width="464" :height="256" :class="['fakeCarouselWrapper', 'fake-left']">
      <slide v-for="i in 5" :key="i-1" :index="i-1">
        <div class="posterWrapper" :class="'slide'+i">
        </div>
      </slide>
    </carousel-3d>
    <carousel-3d :inverseScaling="-50"  :display="5" :space="50" :animationSpeed="300" :perspective="0" :width="464" :height="posterWrapperHeight" class="carouselWrapper">
      <slide v-for="i in zaboesRow" :key="i-1" :index="i-1">
        <div class="posterWrapper" :class="'slide'+i">
          <div @click="zaboDetail(zabo.id, zabo.founder.nickName)" :key="key" v-for="(zabo, key, index) in renderedList[i-1]" class="individualPosterWrapper">
            <img class="poster" :src="zabo.posters[0].image">
            <div class="posterDescriptionWrapper">
              <span class="posterDescription">{{$t('제목 : ')}}{{zabo.title}}</span>
              <span class="posterDescription">{{$t('위치 : ')}}{{zabo.location}}</span>
              <span class="posterDescription">{{$t('올린이 : ')}}{{zabo.founder.nickName}}</span>
            </div>
          </div>
        </div>
      </slide>
    </carousel-3d>
    <carousel-3d :inverseScaling="-40" :display="5" :space="50" :animationSpeed="300" :perspective="0" :width="464" :height="256" :class="['fakeCarouselWrapper', 'fake-right']">
      <slide v-for="i in 5" :key="i-1" :index="i-1">
        <div class="posterWrapper" :class="'slide'+i">
        </div>
      </slide>
    </carousel-3d>
    <nav class="horizontalNavButton">
      <img @click="categoryright" src="@/assets/blue_button_right.svg" class="keyboard_arrow_leftright" alt="right_arrow">
    </nav>
  </div>
  <v-progress-circular
    indeterminate
    color="primary"
    v-else
  ></v-progress-circular>
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
      currentCategoryIndex: 0,
      categoryList: ["전체", "리크루팅", "퍼포먼스", "경쟁", "설명회", "강의", "전람회"],
      loading: true,
      defaultImage: "@/assets/logo.png",
      posterWrapperHeight: 0
    }
  },
  created: async function () {
    this.getWindowWidth();
    this.$store.dispatch("zaboesGetPageCount", { pageSize: 4, category: this.calculatedCategoryList[1] }).then(res => {
      const totalPage = res;
      for (var i = 1; i <= totalPage; i++) {
        this.$store.dispatch("zaboesList", { pageNum: i, pageSize: 4, category: this.calculatedCategoryList[1] });
      };
    }).then(() => {
      this.loading = false;
    })
  },
  mounted () {
    this.getWindowWidth();
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'));
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
        setTimeout(() => window.dispatchEvent(new Event('resize')), 1000)
      }, 1000)
    }, 1000)
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
    categoryleft () {
      if (this.currentCategoryIndex === 0) {
        this.currentCategoryIndex = 7;
      } else {
        this.currentCategoryIndex -= 1;
      }
      this.getWindowWidth();
      this.$store.dispatch("zaboesGetPageCount", { pageSize: 4, category: this.calculatedCategoryList[1] }).then(res => {
        const totalPage = res;
        for (var i = 1; i <= totalPage; i++) {
          this.$store.dispatch("zaboesList", { pageNum: i, pageSize: 4, category: this.calculatedCategoryList[1] });
        };
      }).then(() => {
        this.loading = false
      })
      setTimeout(function () {
        window.dispatchEvent(new Event('resize'));
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'))
          setTimeout(() => window.dispatchEvent(new Event('resize')), 1000)
        }, 1000)
      }, 1000)
    },
    categoryright () {
      if (this.currentCategoryIndex === 7) {
        this.currentCategoryIndex = 0;
      } else {
        this.currentCategoryIndex += 1;
      }
      this.getWindowWidth();
      this.$store.dispatch("zaboesGetPageCount", { pageSize: 4, category: this.calculatedCategoryList[1] }).then(res => {
        const totalPage = res;
        for (var i = 1; i <= totalPage; i++) {
          this.$store.dispatch("zaboesList", { pageNum: i, pageSize: 4, category: this.calculatedCategoryList[1] });
        };
      }).then(() => {
        this.loading = false
      })
      setTimeout(function () {
        window.dispatchEvent(new Event('resize'));
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'))
          setTimeout(() => window.dispatchEvent(new Event('resize')), 1000)
        }, 1000)
      }, 1000)
    },
    zaboDetail (id, nickname) {
      if (nickname !== "None") {
        this.$router.push({ name: "ZaboDetail", params: { zabo_id: id } })
      }
    }
  },
  components: {
    'carousel-3d': Carousel3d,
    'slide': Slide
  },
  computed: {
    zaboes () {
      return this.$store.getters.zaboes[this.calculatedCategoryList[1]];
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
      console.log(renderedList, this.zaboesRow)
      return renderedList
    },
    calculatedCategoryList () {
      let calculatedCategories = [];
      if (this.currentCategoryIndex === 0) {
        calculatedCategories.push(this.categoryList[6]);
      } else {
        calculatedCategories.push(this.categoryList[this.currentCategoryIndex - 1])
      }
      calculatedCategories.push(this.categoryList[this.currentCategoryIndex])
      if (this.currentCategoryIndex === 6) {
        calculatedCategories.push(this.categoryList[0]);
      } else {
        calculatedCategories.push(this.categoryList[this.currentCategoryIndex + 1])
      }
      return calculatedCategories;
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
  width: 100%;
  position: absolute;
  top: 78px;
  bottom: 68px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
}
.verticalNavButton {
  position: absolute;
  width: 100%;
  top: 78px;
  bottom: 40px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.categoryWrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
}
.category {
  /* padding-top: 42px; */
  font-size: 1.5em;
  font-weight: 700;
  flex: 1;
  text-align: center;
}
.category:first-child {
  text-align: left;
  padding-left: 94px;
}
.category:last-child {
  text-align: right;
  padding-right: 94px;
}
.currentZaboesWrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 95px;
}
.posterWrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
}
.posterDescriptionWrapper {
  width: 298px;
  height: 464px;
  padding-top: 20px;
  padding-left: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  position: absolute;
  z-index: 100;
  transform: rotate(90deg) translateY(-166px);
  transform-origin: 149px 149px;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition: all 0.3s ease;
}
.posterDescriptionWrapper:hover {
  opacity: 1;
}
.posterDescription {
  font-size: 1.5rem;
}
.individualPosterWrapper {
  width: 464px;
  height: 298px;
  margin-bottom: 11px;
  position: relative;
}
.individualPosterWrapper:last-child {
  margin-bottom: 0;
}
.poster {
  position: absolute;
  width: 464px;
  height: 298px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
}

.carouselWrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
  transform-origin: 50% 50%;
}
.fakeCarouselWrapper {
  position: absolute;
  top: 50%;
  transform-origin: 50% 50%;
}
.fake-left {
  left: 0%;
  transform: translate(-50%, -149px) rotate(-90deg);
}
.fake-right {
  left: 100%;
  transform: translate(-50%, -149px) rotate(-90deg);
}
.keyboard_arrow_updown {
  width: 40px;
  height: auto;
  cursor: pointer;
  z-index: 50;
}
.keyboard_arrow_leftright {
  width: 62px;
  height: auto;
  cursor: pointer;
}
.horizontalNavButton {
  z-index: 200;
}
</style>
