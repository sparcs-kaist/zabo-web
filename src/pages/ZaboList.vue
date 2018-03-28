<template>
  <div class="zaboList">
    <p>list</p>
    <div class="zaboThumbnailListContainer">
      <div class="zaboThumbnailListPrevPage"
           @click="pageChange(false)">
      </div>
      <div class="zaboThumbnailList">
        <div class="zaboThumbnailRow" :key="n" v-for="n in 5">
          <zaboThumbnail
            :zaboDetail="zabo"
            :number="index"
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
    };
  },
  computed: {
    zaboes() {
      return this.$store.getters.zaboes;
    },
    zaboRow() {
      if (window.innerWidth > 1400) {
        return 4;
      }
      if (window.innerWidth > 1100) {
        return 3;
      }
      if (window.innerWidth > 800) {
        return 2;
      }
      return 1;
    },
    zaboList() {
      let zaboes = this.zaboes;
      if (zaboes.length === 0) return [];
      while (zaboes.length < this.zaboRow * 5) {
        zaboes = zaboes.concat(this.zaboes);
      }
      return zaboes;
    },
    zaboRendered() {
      const zaboes = this.zaboList;
      if (this.zaboCursor - (this.zaboRow * 2) < 0) {
        return zaboes.slice(zaboes.length + (this.zaboCursor - (this.zaboRow * 2)), zaboes.length)
          .concat(zaboes.slice(0, this.zaboCursor + (this.zaboRow * 3)));
      }
      if (this.zaboCursor + ((this.zaboRow * 3) - 1) >= zaboes.length) {
        return zaboes.slice(this.zaboCursor - (this.zaboRow * 2), zaboes.length)
          .concat(zaboes.slice(0, (this.zaboCursor + (this.zaboRow * 3)) - zaboes.length));
      }
      return zaboes.slice([this.zaboCursor - (this.zaboRow * 2),
        this.zaboCursor + (this.zaboRow * 3)]);
    },
  },
  method: {
    pageChange(isNext) {
      if (isNext) {
        this.zaboCursor += this.zaboRow;
        this.zaboCursor %= this.zaboList.length;
      } else {
        this.zaboCursor += this.zaboList.length;
        this.zaboCursor -= this.zaboRow;
        this.zaboCursor %= this.zaboList.length;
      }
    },
  },
};
</script>

<style scoped>
.zaboThumbnailListContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 80vw;
  height: 750px;
  background-color: black;
}

.zaboThumbnailList {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 650px;
}

.zaboThumbnailRow {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 200px;
}

.zaboThumbnailListPrevPage {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid white;
}

.zaboThumbnailListNextPage {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid white;

  transform: rotate(180deg);
}
</style>
