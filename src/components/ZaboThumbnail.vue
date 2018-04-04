<template>
  <div class="zaboThumbnail"
       :class="`row${parseInt( row )}`">
    <div class="thumbnail"
         @hover="zaboThumbnailDetailShow()"
         :style="{ backgroundImage: 'url(' + zaboDetail.image + ')' }">
      <p>
        {{ zaboDetail.num }}
      </p>
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
.zaboThumbnail.row1 .thumbnail, .zaboThumbnail.row5 .thumbnail {
  width: 162px;
  height: 243px;
  margin: 0 25px;
  z-index: 1001;
}

.zaboThumbnail.row2 .thumbnail, .zaboThumbnail.row4 .thumbnail {
  width: 206px;
  height: 309px;
  margin: 0 17px;
  z-index: 1002;
}

.zaboThumbnail.row3 .thumbnail {
  width: 256px;
  height: 385px;
  margin: 0 15px;
  z-index: 1003;
}

.zaboThumbnail.row1 {
  margin-bottom: -104px;
}

.zaboThumbnail.row2 {
  margin-bottom: -42px;
}

.zaboThumbnail.row4 {
  margin-top: -42px;
}

.zaboThumbnail.row5 {
  margin-top: -104px;
}

.thumbnail {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid red;
  position: relative;
}

.thumbnailDetail {
  display: none;
}
</style>
