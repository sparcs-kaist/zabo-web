<template>
  <div class="zaboThumbnail" :class="`row${parseInt( row )}`">
    <div class="thumbnail" @hover="zaboThumbnailDetailShow()" :style="style">
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
      default: () => {}
    },
    number: {
      type: Number,
      default: 0
    },
    row: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  computed: {
    style() {
      let style;
      if (typeof this.zaboDetail.posters[0] !== "undefined") {
        style = `background-image: url(${this.zaboDetail.posters[0].image});`;
      }
      return style;
    }
  },
  methods: {
    zaboThumbnailDetailShow() {
      document.getElementsByClassName("thumbnailDetail")[
        this.number
      ].style.display = "block";
    }
  }
};
</script>

<style scoped>
.zaboThumbnail.row1 .thumbnail,
.zaboThumbnail.row7 .thumbnail {
  display: none;
}

.zaboThumbnail.row2 .thumbnail,
.zaboThumbnail.row6 .thumbnail {
  width: 178px;
  height: 277px;
  margin: 0 5px 0 6px;
  z-index: 1001;
}

.zaboThumbnail.row3 .thumbnail,
.zaboThumbnail.row5 .thumbnail {
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
  margin-bottom: -40px;
}

.zaboThumbnail.row3 {
  margin-bottom: -20px;
}

.zaboThumbnail.row5 {
  margin-top: -20px;
}

.zaboThumbnail.row6 {
  margin-top: -40px;
}

.thumbnail {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: rgba(217, 217, 217, 1);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
}

.thumbnailDetail {
  display: none;
}
</style>
