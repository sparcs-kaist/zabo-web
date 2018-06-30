<template>
  <div class="zaboThumbnail"
       :class="`row${parseInt( row )}`"
       v-if="!isRealZabo">
    <div class="thumbnail"></div>
  </div>
  <div class="zaboThumbnail"
       :class="`row${parseInt( row )}`"
       v-else>
    <router-link
      v-if="row === 4"
      class="zaboDetailRouter"
      :to="{ name: 'ZaboDetail', params: { category: category, zabo_id: zaboDetail.id } }">
      <div class="thumbnail"
           @click="showModal1"
           :style="style">
      </div>
    </router-link>
    <div class="thumbnail"
         :style="style"
         v-else>
    </div>
    <transition name="modal">
      <div class="modalContainer" v-show="visible1" @click.self="hideModal1">
        <modal
          class="thumbnailDetail"
          :visible="visible1">
          <router-view></router-view>
        </modal>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    zaboDetail: {
      type: Object,
      default: () => {},
    },
    category: {
      type: String,
      default: '',
    },
    number: {
      type: Number,
      default: 0,
    },
    row: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      visible1: false,
    };
  },
  created() {
    this.checkDetailPage();
    console.log(this.zaboDetail.posters[0]);
    console.log(this.zaboDetail);
  },
  watch: {
    '$route': 'checkDetailPage',
  },
  computed: {
    style() {
      let style;
      if (typeof this.zaboDetail.posters[0] !== 'undefined') {
        style = `background-image: url(${this.zaboDetail.posters[0].image});`;
      }
      return style;
    },
    isRealZabo() {
      return typeof this.zaboDetail !== 'undefined';
    },
  },
  methods: {
    checkDetailPage() {
      if (this.$route.path.includes('/zabo/detail/')) {
        if (parseInt(this.$route.params.zabo_id, 10) === this.zaboDetail.id &&
        this.$route.params.category === this.category) {
          this.showModal1();
        }
      }
    },
    showModal1() {
      this.visible1 = true;
    },
    hideModal1() {
      console.log(this.$store.getters.detailPageFrom);
      this.visible1 = false;
      this.$router.push({ name: 'Zabo' });
    },
  },
};
</script>

<style scoped>
.modal-enter, .modal-leave-to {
  opacity: 0
}

.modal-enter-active {
  transition: opacity .5s;
}

.modal-leave-active {
  transition: 0s;
}

.zaboThumbnail.row1 .thumbnail, .zaboThumbnail.row7 .thumbnail {
  display: none;
}

.zaboThumbnail.row2 .thumbnail, .zaboThumbnail.row6 .thumbnail {
  width: 178px;
  height: 277px;
  margin: 0 5px 0 6px;
  z-index: 1001;
}

.zaboThumbnail.row3 .thumbnail, .zaboThumbnail.row5 .thumbnail {
  width: 226px;
  height: 394px;
  margin: 0 5px 0 6px;
  z-index: 1002;
}

.zaboThumbnail.row4 .thumbnail {
  width: 298px;
  height: 464px;
  margin: 0 5px 0 6px;
  z-index: 1003;
}

.zaboThumbnail.row2 {
  margin-bottom: 338px;
}

.zaboThumbnail.row3 {
  margin-bottom: 170px;
}

.zaboThumbnail.row5 {
  margin-top: 170px;
}

.zaboThumbnail.row6 {
  margin-top: 338px;
}

.zaboDetailRouter {
  width: 100%;
  height: 100%;
}

.thumbnail {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: rgba(220, 220, 220, 1);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
}

.modalContainer {
  position: fixed;
  top: calc(50% - 20px);
  left: 50%;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transform: translateX(-50%) translateY(-50%);
}

.thumbnailDetail {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
