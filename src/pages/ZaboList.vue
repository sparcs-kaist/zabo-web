<template>
  <div class="zaboList">
    <div class="prevCategory"
         @click="categoryChange(false)">
    </div>
    <div class="zaboCategory"
         v-for="(category, index) in categories"
         :class="classByCategory(category)">
      <p class="zaboCategoryName">
        {{ categoryNames[index] }}
      </p>
      <div class="zaboThumbnailListContainer">
        <img class="zaboThumbnailListPrevPage"
             src="../assets/up_arrow.svg"
             width="40"
             height="22"
             @click="pageChange(false)">
        </img>
        <div class="zaboThumbnailList" v-if="isRendered[category]">
          <div class="zaboThumbnailRow" :key="n" v-for="n in 7">
            <zaboThumbnail
              :zaboDetail="zabo"
              :category="categories[index]"
              :number="index + (n - 1) * zaboRow"
              :row="n"
              :key="zabo.id"
              v-for="zabo in zaboRendered[category].slice((n - 1) * zaboRow, n * zaboRow)">
            </zaboThumbnail>
          </div>
        </div>
        <div class="zaboThumbnailList" v-else>
          <div class="zaboThumbnailRow" :key="n" v-for="n in 7">
            <zaboThumbnail
              :category="categories[index]"
              :number="index + (n - 1) * zaboRow"
              :row="n"
              v-for="m in 4">
            </zaboThumbnail>
          </div>
        </div>
        <img class="zaboThumbnailListNextPage"
             src="../assets/down_arrow.svg"
             width="40"
             height="22"
             @click="pageChange(true)">
        </img>
      </div>
    </div>
    <div class="nextCategory"
         @click="categoryChange(true)">
    </div>
  </div>
</template>

<script>
import ZaboThumbnail from '@/components/ZaboThumbnail';

export default {
  components: {
    zaboThumbnail: ZaboThumbnail,
  },
  data() {
    return {
      zaboCursor: { All: 0, R: 0, P: 0, C: 0, F: 0, L: 0, E: 0 },
      windowWidth: 0,
      currentPage: { All: 1, R: 1, P: 1, C: 1, F: 1, L: 1, E: 1 },
      totalPage: { All: 0, R: 0, P: 0, C: 0, F: 0, L: 0, E: 0 },
      getPages: {},
      categories: ['All', 'R', 'P', 'C', 'F', 'L', 'E'],
      categoryNames: ['전체', '리쿠르팅', '퍼포먼스', '경쟁', '설명회', '강의', '전람회'],
      currentCategoryIndex: 0,
      isRendered: { All: false, R: false, P: false, C: false, F: false, L: false, E: false },
    };
  },
  created() {
    this.getWindowWidth();
    this.getCategoryZaboes(this.currentCategory);
    this.getCategoryZaboes(this.prevCategory);
    this.getCategoryZaboes(this.nextCategory);
  },
  beforeMount() {
    window.addEventListener('resize', this.getWindowWidth);
  },
  updated() {
    document.getElementsByClassName('zaboList')[0].classList.remove('mounted');
    document.getElementsByClassName('zaboList')[0].classList.add('mounted');
  },
  watch: {
    currentPageBy4() {
      if (this.currentPageBy4 + 6 <= this.totalPage) {
        if (!this.getPages[this.currentCategory].includes(this.currentPageBy4 + 6)) {
          this.$store.dispatch('zaboesList', { pageNum: this.currentPageBy4 + 6, pageSize: 4, category: this.currentCategory });
        }
      }
      if (this.currentPageBy4 - 5 > 0) {
        if (!this.getPages[this.currentCategory].includes(this.currentPageBy4 - 5)) {
          this.$store.dispatch('zaboesList', { pageNum: this.currentPageBy4 - 5, pageSize: 4, category: this.currentCategory });
        }
      }
    },
  },
  computed: {
    zaboes() {
      return this.$store.getters.zaboes;
    },
    zaboRow() {
      if (this.windowWidth > 1700) {
        return 4;
      }
      if (this.windowWidth > 1400) {
        return 3;
      }
      if (this.windowWidth > 1100) {
        return 2;
      }
      return 1;
    },
    zaboList() {
      let zaboes = JSON.parse(JSON.stringify(this.zaboes));
      const keys = Object.keys(zaboes);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        while (zaboes[key].length < this.zaboRow * 7) {
          zaboes[key] = zaboes[key].concat(this.zaboes[key]);
        }
      }
      return zaboes;
    },
    zaboRendered() {
      const zaboes = JSON.parse(JSON.stringify(this.zaboList));
      const zaboRendered = JSON.parse(JSON.stringify(zaboes));
      const keys = Object.keys(zaboes);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        if (this.zaboCursor[key] - (this.zaboRow * 3) < 0) {
          zaboRendered[key] = zaboes[key].slice(zaboes[key].length + (this.zaboCursor[key] - (this.zaboRow * 3)), zaboes[key].length)
            .concat(zaboes[key].slice(0, this.zaboCursor[key] + (this.zaboRow * 4)));
        } else if (this.zaboCursor[key] + ((this.zaboRow * 4) - 1) >= zaboes[key].length) {
          zaboRendered[key] = zaboes[key].slice(this.zaboCursor[key] - (this.zaboRow * 3), zaboes[key].length)
            .concat(zaboes[key].slice(0, (this.zaboCursor[key] + (this.zaboRow * 4)) - zaboes[key].length));
        } else {
          zaboRendered[key] = zaboes[key].slice(this.zaboCursor[key] - (this.zaboRow * 3), this.zaboCursor[key] + (this.zaboRow * 4));
        }
        this.isRendered[key] = true;
      }
      return zaboRendered;
    },
    currentPageBy4() {
      return (this.currentPage[this.currentCategory] % 4) === 0 ?
        parseInt((this.currentPage[this.currentCategory] / 4) + 1, 10) :
        parseInt(this.currentPage[this.currentCategory] / 4, 10);
    },
    prevCategoryIndex() {
      return ((this.currentCategoryIndex - 1) + this.categories.length) % this.categories.length;
    },
    nextCategoryIndex() {
      return (this.currentCategoryIndex + 1) % this.categories.length;
    },
    currentCategory() {
      return this.categories[this.currentCategoryIndex];
    },
    prevCategory() {
      return this.categories[this.prevCategoryIndex];
    },
    nextCategory() {
      return this.categories[this.nextCategoryIndex];
    },
  },
  methods: {
    pageChange(isNext) {
      if (isNext) {
        this.currentPage[this.currentCategory] += 1;
        this.currentPage[this.currentCategory] %= this.totalPage;
        this.zaboCursor[this.currentCategory] += this.zaboRow;
        this.zaboCursor[this.currentCategory] %= this.zaboList[this.currentCategory].length;
      } else {
        this.currentPage[this.currentCategory] -= 1;
        if (this.currentPage[this.currentCategory] === 0) {
          this.currentPage[this.currentCategory] = this.totalPage;
        }
        this.zaboCursor[this.currentCategory] += this.zaboList[this.currentCategory].length;
        this.zaboCursor[this.currentCategory] -= this.zaboRow;
        this.zaboCursor[this.currentCategory] %= this.zaboList[this.currentCategory].length;
      }
    },
    categoryChange(isNext) {
      [].forEach.call(document.getElementsByClassName('ZaboCategory'), function(el) {
        el.classList.remove('current');
        el.classList.remove('prev');
        el.classList.remove('next');
      });
      if (isNext) {
        this.currentCategoryIndex = (this.currentCategoryIndex + 1) % this.categories.length;
        this.prevCategoryIndex =
          (this.currentCategoryIndex + (this.categories.length - 1)) % this.categories.length;
        this.nextCategoryIndex =
          (this.currentCategoryIndex + 1) % this.categories.length;
        this.getCategoryZaboes(this.categories[this.nextCategoryIndex]);
      } else {
        this.currentCategoryIndex =
          (this.currentCategoryIndex + (this.categories.length - 1)) % this.categories.length;
        this.prevCategoryIndex =
          (this.currentCategoryIndex + (this.categories.length - 1)) % this.categories.length;
        this.nextCategoryIndex = (this.currentCategoryIndex + 1) % this.categories.length;
        this.getCategoryZaboes(this.categories[this.prevCategoryIndex]);
      }
    },
    getWindowWidth() {
      this.windowWidth = document.body.clientWidth ||
      document.documentElement.clientWidth || window.innerWidth;
    },
    classByCategory(category) {
      if (category === this.prevCategory) {
        return 'prev';
      }
      if (category === this.currentCategory) {
        return 'current';
      }
      if (category === this.nextCategory) {
        return 'next';
      }
      return '';
    },
    getCategoryZaboes(category) {
      this.$store.dispatch('zaboesGetPageCount', { pageSize: 4, category: category })
        .then((res) => {
          console.log(res);
          this.totalPage[category] = res;
          if (typeof this.getPages[category] === 'undefined') {
            this.getPages[category] = [];
          }
          for (let j = 1; j <= res; j += 1) {
            this.$store.dispatch('zaboesList',
              { pageNum: j, pageSize: 4, category: category });
            this.getPages[category].push(j);
            if (j > 5) {
              break;
            }
          }
          for (let j = res; j > 5; j -= 1) {
            this.$store.dispatch('zaboesList',
              { pageNum: j, pageSize: 4, category: category });
            this.getPages[category].push(j);
            if (j < res - 4) {
              break;
            }
          }
        });
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
  },
};
</script>

<style scoped>
.zaboList {
  display: inline-flex;
  position: relative;
  flex-direction: row;
  margin-top: 100px;
  margin-left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
}

.zaboCategory {
  display: none;
  width: 1920px;
}

.zaboList.mounted .zaboCategory {
  width: unset;
}

.zaboCategory.prev {
  display: block;
  order: 0;
  margin-right: 209px;
}

.zaboCategory.current {
  display: block;
  order: 1;
}

.zaboCategory.next {
  display: block;
  order: 2;
  margin-left: 209px;
}

.zaboCategoryName {
  font-size: 25px;
  font-weight: 900;
  margin: 0 auto;
}

.zaboThumbnailListContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 43px;
  width: 100%;
  height: 718px;
}

.zaboThumbnailList {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 614px;
}

.zaboThumbnailRow {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 0px;
}

.zaboThumbnailListPrevPage {
}

.zaboThumbnailListNextPage {
}

.prevCategory, .nextCategory {
  border-radius: 50%;
  width: 62px;
  height: 62px;
  position: fixed;
  z-index: 2001;
}

.prevCategory {
  background-image: url('../assets/blue_button_left.svg');
}

.nextCategory {
  background-image: url('../assets/blue_button_right.svg');
}

.prevCategory > p, .nextCategory > p {
  position: relative;
  float: left;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-size: 30px;
}

.prevCategory {
  top: 300px;
  left: calc(50% - 50vw + 100px);
  transform: translateX(-50%);
}

.nextCategory {
  top: 300px;
  right: calc(50% - 50vw + 100px);
  transform: translateX(50%);
}
</style>
