<template>
  <div class="zaboThumbnail"
       :class="`row${parseInt( row )}`">
    <div class="thumbnail"
         @hover="zaboThumbnailDetailShow()"
         :style="style">
      <p>
        {{ zaboDetail.content }}
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
  created() {
    console.log(this.zaboDetail.posters[0]);
    console.log(this.zaboDetail);
  },
  computed: {
    style() {
      let style;
      if (typeof this.zaboDetail.posters[0] === 'undefined') {
        style = 'background-color: rgba(217, 217, 217, 1);';
      } else {
        style = `background-image: url(${this.zaboDetail.posters[0].image});`;
      }
      return style;
    },
  },
  methods: {
    zaboThumbnailDetailShow() {
      document.getElementsByClassName('thumbnailDetail')[this.number].style.display = 'block';
    },
  },
};
</script>

<style scoped>
.zaboThumbnail.row1 .thumbnail, .zaboThumbnail.row7 .thumbnail {
  display: none;
}

.zaboThumbnail.row2 .thumbnail, .zaboThumbnail.row6 .thumbnail {
  width: 162px;
  height: 243px;
  margin: 0 25px;
  z-index: 1001;
}

.zaboThumbnail.row3 .thumbnail, .zaboThumbnail.row5 .thumbnail {
  width: 206px;
  height: 309px;
  margin: 0 17px;
  z-index: 1002;
}

.zaboThumbnail.row4 .thumbnail {
  width: 256px;
  height: 385px;
  margin: 0 15px;
  z-index: 1003;
}

.zaboThumbnail.row2 {
  margin-bottom: -104px;
}

.zaboThumbnail.row3 {
  margin-bottom: -42px;
}

.zaboThumbnail.row5 {
  margin-top: -42px;
}

.zaboThumbnail.row6 {
  margin-top: -104px;
}

.thumbnail {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
}

.thumbnailDetail {
  display: none;
}
</style>
