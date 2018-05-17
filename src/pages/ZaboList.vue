<template>
  <div class="zaboList">
    <div class="zaboCategory">
      <p class="zaboCategoryName">
        인기있는 행사
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
      if (this.windowWidth > 1200) {
        return 4;
      }
      if (this.windowWidth > 900) {
        return 3;
      }
      if (this.windowWidth > 600) {
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
  },
  methods: {
    pageChange(isNext) {
      if (isNext) {
        this.currentPage += 1;
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
    getWindowWidth() {
      this.windowWidth = document.body.clientWidth ||
      document.documentElement.clientWidth || window.innerWidth;
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
  },
};
</script>

<style scoped>
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
</style>
