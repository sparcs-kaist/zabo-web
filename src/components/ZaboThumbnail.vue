<template>
  <div class="zaboThumbnail"
       :class="`row${parseInt( number / row )}`">
    <div class="thumbnail"
         @hover="zaboThumbnailDetailShow()"
         :style="{ backgroundImage: 'url(' + zaboDetail.image + ')' }">
      {{ number }}
      {{ row }}
    </div>
    <div class="thumbnailDetail">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    zaboDetail: {
      type: Object,
      default: () => {},
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

    };
  },
  methods: {
    zaboThumbnailDetailShow() {
      document.getElementsByClassName('thumbnailDetail')[this.number].style.display = 'block';
    },
  },
};
</script>

<style scoped>
.zaboThumbnail.row0 .thumbnail, .zaboThumbnail.row4 .thumbnail {
  width: 60px;
  height: 90px;
}

.zaboThumbnail.row1 .thumbnail, .zaboThumbnail.row3 .thumbnail {
  width: 80px;
  height: 120px;
}

.zaboThumbnail.row2 .thumbnail {
  width: 100px;
  height: 150px;
}

.thumbnail {

}

.thumbnailDetail {
  display: none;
}
</style>
