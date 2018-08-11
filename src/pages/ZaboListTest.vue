<template lang=''>
<div class="mainWrapper">
  <div class="categoryWrapper">
    <span class="category">{{calculatedCategoryList[0]}}</span>
    <span class="category">{{calculatedCategoryList[1]}}</span>
    <span class="category">{{calculatedCategoryList[2]}}</span>
  </div>
  <div class="currentZaboesWrapper" :style="`padding: 0 ${windowWidth > 700 ? (basePosterWrapperHeight/2)-31: 0}px`">
    <nav class="horizontalNavButton">
      <img @click="categoryleft" src="@/assets/blue_button_left.svg" class="keyboard_arrow_leftright" alt="left_arrow">
    </nav>
    <carousel-3d v-if="windowWidth > 700" id="fakeCarousel1" :inverseScaling="50"  :display="displayNumber" :space="60" :animationSpeed="200" :perspective="0" :width="carouselPosterHeight" :height="basePosterWrapperHeight" :class="['fakeCarouselWrapper', 'fake-left']">
      <slide v-for="i in 3" :startIndex="1" :key="i-1" :index="i-1">
      </slide>
    </carousel-3d>
    <carousel-3d v-if="zaboesExist" id="mainCarousel" :inverseScaling="50"  :display="displayNumber" :space="60" :animationSpeed="200" :perspective="0" :width="carouselPosterHeight" :height="posterWrapperHeight" class="carouselWrapper">
      <slide v-for="i in zaboesRow" :key="i-1" :index="i-1">
        <div class="posterWrapper" :class="'slide'+i">
          <div @click="zaboDetail(zabo.id, zabo.author.nickName, zabo)" :key="key" v-for="(zabo, key, index) in renderedList[i-1]" class="individualPosterWrapper" :style="`width: ${baseCarouselPosterHeight}px; height: ${basePosterWrapperHeight}px;`">
            <img class="poster" :style="`top: -${baseCarouselPosterHeight/2-basePosterWrapperHeight/2}px; left: ${baseCarouselPosterHeight/2-basePosterWrapperHeight/2}px; width: ${basePosterWrapperHeight}px; height: ${baseCarouselPosterHeight}px; transform: rotate(90deg); transform-origin: 50% 50%;`" :src="zabo.posters[0].image_thumbnail">
          </div>
        </div>
      </slide>
    </carousel-3d>
    <v-progress-circular
      indeterminate
      color="primary"
      v-else
    ></v-progress-circular>
    <carousel-3d v-if="windowWidth > 700" id="fakeCarousel2" :inverseScaling="50" :display="displayNumber" :space="60" :animationSpeed="200" :perspective="0" :width="carouselPosterHeight" :height="basePosterWrapperHeight" :class="['fakeCarouselWrapper', 'fake-right']">
      <slide v-for="i in 3" :startIndex="1" :key="i-1" :index="i-1">
      </slide>
    </carousel-3d>
    <nav class="horizontalNavButton">
      <img @click="categoryright" src="@/assets/blue_button_right.svg" class="keyboard_arrow_leftright" alt="right_arrow">
    </nav>
  </div>
  <nav class="verticalNavButton">
      <img @click="mouseUp" src="@/assets/up_arrow.svg" class="keyboard_arrow_updown" alt="up_arrow">
      <img @click="mouseDown" src="@/assets/down_arrow.svg" class="keyboard_arrow_updown" alt="down_arrow">
  </nav>
  <zabo-detail-modal :modalZaboData="modalZaboData" @closeModal="closeModal" :zaboId="this.computedZaboId" v-if="computedModalState"></zabo-detail-modal>
</div>
</template>
<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
import ZaboDetailModal from "@/components/ZaboDetailModal";

export default {
  data() {
    return {
      windowWidth: 0,
      windowHeight: 0,
      currentCategoryIndex: 0,
      categoryList: [
        "최신순",
        "인기있는 자보",
        "마감임박 자보",
        "리크루팅",
        "공연",
        "대회",
        "설명회",
        "세미나",
        "전람회"
      ],
      defaultImage: "@/assets/logo.png",
      posterWrapperHeight: 0,
      basePosterWrapperHeight: 0,
      baseCarouselPosterHeight: 0,
      modalZaboId: -1,
      currentPath: window.location.pathname,
      modalZaboData: {},
      displayNumber: 3
    };
  },
  mounted() {
    this.getWindowWidth();
    this.$store
      .dispatch("zaboesGetPageCount", {
        pageSize: 20,
        method: this.calculatedCategoryList[1]
      })
      .then(res => {
        const totalPage = res;
        for (var i = 1; i <= totalPage; i++) {
          this.$store.dispatch("zaboesList", {
            pageNum: i,
            pageSize: 20,
            method: this.calculatedCategoryList[1]
          });
        }
        return res;
      })
      .then(() => {
        let selectedCategories = [];
        this.categoryList.map(category => {
          if (category != this.calculatedCategoryList[1]) {
            selectedCategories.push(category);
          }
        });
        console.log(selectedCategories);
        selectedCategories.map(category => {
          this.$store
            .dispatch("zaboesGetPageCount", { pageSize: 20, method: category })
            .then(res => {
              const totalPage = res;
              for (var i = 1; i <= totalPage; i++) {
                this.$store.dispatch("zaboesList", {
                  pageNum: i,
                  pageSize: 20,
                  method: category
                });
              }
            });
        });
      });
  },
  beforeMount() {
    window.addEventListener("resize", this.getWindowWidth);
    window.addEventListener("keyup", this.keyup);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
    window.removeEventListener("keyup", this.keyup);
  },
  methods: {
    keyup(event) {
      if (event.which == 37) {
        this.categoryleft();
      } else if (event.which == 38) {
        this.mouseUp();
      } else if (event.which == 39) {
        this.categoryright();
      } else if (event.which == 40) {
        this.mouseDown();
      }
    },
    getCurrentZaboNumber: function(i, j) {
      return this.columnNumber * i + j;
    },
    getWindowWidth() {
      this.windowWidth =
        document.body.clientWidth ||
        document.documentElement.clientWidth ||
        window.innerWidth;
      this.windowHeight = window.innerHeight;
      console.log(861, 720);
    },
    categoryleft() {
      if (this.currentCategoryIndex === 0) {
        this.currentCategoryIndex = 8;
      } else {
        this.currentCategoryIndex -= 1;
      }
      this.getWindowWidth();
      if (!this.zaboesExist) {
        this.$store
          .dispatch("zaboesGetPageCount", {
            pageSize: 20,
            method: this.calculatedCategoryList[1]
          })
          .then(res => {
            const totalPage = res;
            for (var i = 1; i <= totalPage; i++) {
              this.$store.dispatch("zaboesList", {
                pageNum: i,
                pageSize: 20,
                method: this.calculatedCategoryList[1]
              });
            }
          });
      }
    },
    categoryright() {
      if (this.currentCategoryIndex === 8) {
        this.currentCategoryIndex = 0;
      } else {
        this.currentCategoryIndex += 1;
      }
      this.getWindowWidth();
      if (!this.zaboesExist) {
        this.$store
          .dispatch("zaboesGetPageCount", {
            pageSize: 20,
            method: this.calculatedCategoryList[1]
          })
          .then(res => {
            const totalPage = res;
            for (var i = 1; i <= totalPage; i++) {
              this.$store.dispatch("zaboesList", {
                pageNum: i,
                pageSize: 20,
                method: this.calculatedCategoryList[1]
              });
            }
          });
      }
    },
    zaboDetail(id, nickname, zaboData) {
      if (nickname !== "None") {
        this.modalZaboId = id;
        this.modalZaboData = zaboData;
        window.history.pushState(null, null, [`/zabo/${id}`]);
        this.currentPath = window.location.pathname;
      }
    },
    closeModal() {
      this.currentPath = "/";
      window.history.pushState(null, null, [`/`]);
    },
    mouseUp() {
      document
        .getElementById("mainCarousel")
        .getElementsByClassName("left-1")[0]
        .click();
    },
    mouseDown() {
      document
        .getElementById("mainCarousel")
        .getElementsByClassName("right-1")[0]
        .click();
    }
  },
  components: {
    "carousel-3d": Carousel3d,
    slide: Slide,
    ZaboDetailModal
  },
  computed: {
    zaboes() {
      return this.$store.getters.zaboes[this.calculatedCategoryList[1]];
    },
    zaboesPageCount() {
      return this.$store.getters.zaboesPageCount;
    },
    zaboesRow() {
      return Math.ceil(this.zaboes.length / this.columnNumber);
    },
    columnNumber() {
      if (this.windowHeight > 1200) {
        this.basePosterWrapperHeight = 350;
        this.baseCarouselPosterHeight = 520;
        this.displayNumber = 5;
        if (this.windowWidth > 2000) {
          this.posterWrapperHeight = 1744;
          return 5;
        } else if (this.windowWidth > 1700) {
          this.posterWrapperHeight = 1433;
          return 4;
        } else if (this.windowWidth > 1400) {
          this.posterWrapperHeight = 1072;
          return 3;
        } else if (this.windowWidth > 1000) {
          this.posterWrapperHeight = 711;
          return 2;
        } else {
          this.posterWrapperHeight = 350;
          return 1;
        }
      } else if (this.windowHeight > 800) {
        this.basePosterWrapperHeight = 320;
        this.baseCarouselPosterHeight = 464;
        this.displayNumber = 3;
        if (this.windowWidth > 2000) {
          this.posterWrapperHeight = 1644;
          return 5;
        } else if (this.windowWidth > 1700) {
          this.posterWrapperHeight = 1313;
          return 4;
        } else if (this.windowWidth > 1400) {
          this.posterWrapperHeight = 982;
          return 3;
        } else if (this.windowWidth > 1000) {
          this.posterWrapperHeight = 651;
          return 2;
        } else {
          this.posterWrapperHeight = 320;
          return 1;
        }
      } else if (this.windowHeight > 600) {
        this.basePosterWrapperHeight = 260;
        this.baseCarouselPosterHeight = 400;
        this.displayNumber = 3;
        if (this.windowWidth > 2000) {
          this.posterWrapperHeight = 1322;
          return 5;
        } else if (this.windowWidth > 1700) {
          this.posterWrapperHeight = 1051;
          return 4;
        } else if (this.windowWidth > 1400) {
          this.posterWrapperHeight = 811;
          this.basePosterWrapperHeight = 260;
          this.baseCarouselPosterHeight = 400;
          return 3;
        } else if (this.windowWidth > 1000) {
          this.posterWrapperHeight = 531;
          return 2;
        } else {
          this.posterWrapperHeight = 260;
          return 1;
        }
      } else {
        this.basePosterWrapperHeight = 220;
        this.baseCarouselPosterHeight = 340;
        this.displayNumber = 3;
        if (this.windowWidth > 2000) {
          this.posterWrapperHeight = 1144;
          return 5;
        } else if (this.windowWidth > 1700) {
          this.posterWrapperHeight = 911;
          return 4;
        } else if (this.windowWidth > 1400) {
          this.posterWrapperHeight = 682;
          return 3;
        } else if (this.windowWidth > 1000) {
          this.posterWrapperHeight = 451;
          return 2;
        } else {
          this.posterWrapperHeight = 220;
          return 1;
        }
      }
    },
    zaboesExist() {
      if (this.zaboes.length >= 1) {
        return true;
      } else {
        return false;
      }
    },
    renderedList() {
      let renderedList = [];
      for (let i = 0; i < this.zaboesRow; i++) {
        renderedList.push(
          this.zaboes.slice(i * this.columnNumber, (i + 1) * this.columnNumber)
        );
      }
      console.log(renderedList, this.zaboesRow);
      return renderedList;
    },
    calculatedCategoryList() {
      let calculatedCategories = [];
      if (this.currentCategoryIndex === 0) {
        calculatedCategories.push(this.categoryList[8]);
      } else {
        calculatedCategories.push(
          this.categoryList[this.currentCategoryIndex - 1]
        );
      }
      calculatedCategories.push(this.categoryList[this.currentCategoryIndex]);
      if (this.currentCategoryIndex === 8) {
        calculatedCategories.push(this.categoryList[0]);
      } else {
        calculatedCategories.push(
          this.categoryList[this.currentCategoryIndex + 1]
        );
      }
      return calculatedCategories;
    },
    computedZaboId() {
      return this.modalZaboId;
    },
    computedModalState() {
      if (this.currentPath === "/") {
        return false;
      } else {
        return true;
      }
    },
    carouselPosterHeight() {
      if (this.windowHeight > 1200) {
        return 520;
      } else if (this.windowHeight > 800) {
        return 464;
      } else if (this.windowHeight > 600) {
        return 400;
      } else {
        return 340;
      }
    }
  },
  watch: {
    zaboesExist(val) {
      if (val) {
        window.dispatchEvent(new Event("resize"));
        setTimeout(function() {
          window.dispatchEvent(new Event("resize"));
        }, 1000);
      }
    },
    currentPath(val) {
      if (val == "/") {
        console.log(this.currentPath);
        window.addEventListener("keyup", this.keyup);
      } else {
        console.log(val);
        window.removeEventListener("keyup", this.keyup);
      }
    }
  }
};
</script>
<style scoped lang='scss'>
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
  .categoryWrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    .category {
      font-size: 24px;
      font-weight: 700;
      flex: 1;
      text-align: center;
      &:first-child {
        text-align: left;
        padding-left: 94px;
      }
      &:last-child {
        text-align: right;
        padding-right: 94px;
      }
      @include breakPoint('phone'){
        font-size: $normal-font-size;
        &:first-child {
          padding-left: 20px;
        }
        &:last-child {
          padding-right: 20px;
        }
      }
    }
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
    .horizontalNavButton {
      z-index: 200;
      .keyboard_arrow_leftright {
        width: 62px;
        height: auto;
        cursor: pointer;
        border-radius: 50%;
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.47);
        transition: all 0.2s ease;
        &:hover {
          box-shadow: 0px 9px 17px rgba(0, 0, 0, 0.6);
        }
      }
    }
    .fakeCarouselWrapper {
      position: absolute;
      top: 50%;
      transform-origin: 50% 50%;
    }
    .fake-left {
      left: 0%;
      transform: translate(-50%, -50%) rotate(-90deg);
    }
    .fake-right {
      left: 100%;
      transform: translate(-50%, -50%) rotate(-90deg);
    }
    #mainCarousel {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-90deg);
      transform-origin: 50% 50%;
      .carousel-3d-slider .carousel-3d-slide {
        background-color: transparent;
        border: none;
      }
      .posterWrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 100%;
        .individualPosterWrapper {
          margin-bottom: 11px;
          position: relative;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3), 0px -2px 4px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease-in-out;
          &:hover {
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.35), 0px -4px 8px rgba(0, 0, 0, 0.35);
          }
          &:last-child {
            margin-bottom: 0;
          }
          .poster {
            position: absolute;
            cursor: pointer;
          }
        }
      }
    }
    #fakeCarousel1, #fakeCarousel2 {
      position: absolute;
      .carousel-3d-slider .right-1 {
        background-color: #ececec;
        border: none;
      }
      .carousel-3d-slider .left-1 {
        background-color: #ececec;
        border: none;
      }
      .carousel-3d-slider .current {
        background-color: #fcfcfc;
        border: none;
      }
    }
  }
  .verticalNavButton {
    @include pageDefault();
    position: fixed;
    top: 120px;
    padding: 30px 0;
    @include breakPoint('phone') {
      padding: 10px 0;
    }
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .keyboard_arrow_updown {
      width: 40px;
      height: auto;
      cursor: pointer;
      z-index: 50;
      @include breakPoint('phone') {
        width: 30px;
      }
    }
  }
}
</style>
