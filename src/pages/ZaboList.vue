<template>
  <div class="zaboList">
    <div class="prevCategory"
         @click="categoryChange(false)">
      <p>&lt;</p>
    </div>
    <div class="zaboCategory"
         v-for="(category, index) in categories"
         :class="classByCategory(category)">
      <p class="zaboCategoryName">
        {{ categoryNames[index] }}
      </p>
      <div class="zaboThumbnailListContainer">
        <div class="zaboThumbnailListPrevPage"
             @click="pageChange(false)">
        </div>
        <div class="zaboThumbnailList">
          <div class="zaboThumbnailRow" :key="n" v-for="n in 7">
            <zaboThumbnail
              :zaboDetail="zabo"
              :number="index + (n - 1) * zaboRow"
              :row="n"
              :key="zabo.id"
              v-for="(zabo, index) in zaboRendered.slice((n - 1) * zaboRow, n * zaboRow)">
            </zaboThumbnail>
          </div>
        </div>
        <div class="zaboThumbnailListNextPage"
             @click="pageChange(true)">
        </div>
      </div>
    </div>
    <div class="nextCategory"
         @click="categoryChange(true)">
      <p>&gt;</p>
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
      zaboCursor: 0,
      windowWidth: 0,
      currentPage: 1,
      getPages: [],
      categories: ['All', 'R', 'P', 'C', 'F', 'L', 'E'],
      categoryNames: ['전체', '리쿠르팅', '퍼포먼스', '경쟁', '설명회', '강의', '전람회'],
      currentCategoryIndex: 0,
    };
  },
  created() {
    this.getWindowWidth();
    this.$store.dispatch('zaboesGetPageCount', { pageSize: 4 })
      .then((res) => {
        this.totalPage = res;
        for (let i = 1; i <= this.totalPage; i += 1) {
          this.$store.dispatch('zaboesList', { pageNum: i, pageSize: 4 });
          this.getPages.push(i);
          if (i > 10) {
            break;
          }
        }
        for (let i = this.totalPage; i > 10; i -= 1) {
          this.$store.dispatch('zaboesList', { pageNum: i, pageSize: 4 });
          this.getPages.push(i);
          if (i < this.totalPage - 9) {
            break;
          }
        }
      });
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
      if (this.currentPageBy4 + 11 <= this.totalPage) {
        if (!this.getPages.includes(this.currentPageBy4 + 11)) {
          this.$store.dispatch('zaboesList', { pageNum: this.currentPageBy4 + 11, pageSize: 4 });
        }
      }
      if (this.currentPageBy4 - 10 > 0) {
        if (!this.getPages.includes(this.currentPageBy4 - 10)) {
          this.$store.dispatch('zaboesList', { pageNum: this.currentPageBy4 - 10, pageSize: 4 });
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
      let zaboes = this.zaboes;
      if (zaboes.length === 0) return [];
      while (zaboes.length < this.zaboRow * 7) {
        zaboes = zaboes.concat(this.zaboes);
      }
      return zaboes;
    },
    zaboRendered() {
      const zaboes = this.zaboList;
      if (this.zaboCursor - (this.zaboRow * 3) < 0) {
        return zaboes.slice(zaboes.length + (this.zaboCursor - (this.zaboRow * 3)), zaboes.length)
          .concat(zaboes.slice(0, this.zaboCursor + (this.zaboRow * 4)));
      }
      if (this.zaboCursor + ((this.zaboRow * 4) - 1) >= zaboes.length) {
        return zaboes.slice(this.zaboCursor - (this.zaboRow * 3), zaboes.length)
          .concat(zaboes.slice(0, (this.zaboCursor + (this.zaboRow * 4)) - zaboes.length));
      }
      return zaboes.slice(this.zaboCursor - (this.zaboRow * 3),
        this.zaboCursor + (this.zaboRow * 4));
    },
    currentPageBy4() {
      return (this.currentPage % 4) === 0 ?
        parseInt((this.currentPage / 4) + 1, 10) :
        parseInt(this.currentPage / 4, 10);
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
        this.currentPage += 1;
        this.currentPage %= this.totalPage;
        this.zaboCursor += this.zaboRow;
        this.zaboCursor %= this.zaboList.length;
      } else {
        this.currentPage -= 1;
        if (this.currentPage === 0) {
          this.currentPage = this.totalPage;
        }
        this.zaboCursor += this.zaboList.length;
        this.zaboCursor -= this.zaboRow;
        this.zaboCursor %= this.zaboList.length;
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
        document.getElementsByClassName(`ZaboCategory${this.currentCategory}`)[0].classList.add('current');
        document.getElementsByClassName(`ZaboCategory${this.prevCategory}`)[0].classList.add('prev');
        document.getElementsByClassName(`ZaboCategory${this.nextCategory}`)[0].classList.add('next');
      } else {
        this.currentCategoryIndex =
          (this.currentCategoryIndex + (this.categories.length - 1)) % this.categories.length;
        this.prevCategoryIndex =
          (this.currentCategoryIndex + (this.categories.length - 1)) % this.categories.length;
        this.nextCategoryIndex = (this.currentCategoryIndex + 1) % this.categories.length;
        document.getElementsByClassName(`ZaboCategory${this.currentCategory}`)[0].classList.add('current');
        document.getElementsByClassName(`ZaboCategory${this.prevCategory}`)[0].classList.add('prev');
        document.getElementsByClassName(`ZaboCategory${this.nextCategory}`)[0].classList.add('next');
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
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
  },
};
</script>

<style scoped>
.zaboList {
  display: inline-flex;
  flex-direction: row;
  margin-left: 50%;
  transform: translateX(-50%);
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
  font-size: 30px;
  font-weight: 900;
  margin: 0 auto;
}

.zaboThumbnailListContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 860px;
}

.zaboThumbnailList {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 660px;
}

.zaboThumbnailRow {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
}

.zaboThumbnailListPrevPage {
  margin-top: 28px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid gray;
}

.zaboThumbnailListNextPage {
  margin-bottom: 28px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid gray;

  transform: rotate(180deg);
}

.prevCategory, .nextCategory {
  border-radius: 50%;
  width: 62px;
  height: 62px;
  background-color: rgba(18, 57, 125, 1);
  position: fixed;
  color: white;
  z-index: 9999;
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
  left: 300px;
  top: 300px;
}

.nextCategory {
  right: 300px;
  top: 300px;
}
</style>
