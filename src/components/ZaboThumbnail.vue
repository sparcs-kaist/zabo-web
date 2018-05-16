<template>
  <div class="zaboThumbnail"
       :class="`row${parseInt( row )}`">
    <div class="thumbnail"
         @hover="zaboThumbnailDetailShow()"
         :style="{ backgroundImage: 'url(' + zaboDetail.poster + ')' }">
      <p>
        {{ zaboDetail.content }}
      </p>
    </div>
    <div class="thumbnailDetail">
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
    this.callPoster();
  },
  // updated() {
  //   if (typeof this.zaboDetail.posters[0] !== 'undefined') {
  //     axios.get(
  //       this.zaboDetail.posters[0],
  //       {
  //         headers: {
  //           'Authorization': 'Basic aHllb25nanVuQGthaXN0LmFjLmtyOmpvMTI2MTI2am8=',
  //         },
  //       },
  //     )
  //       .then((res) => {
  //         this.poster = res.data.image;
  //       });
  //   }
  // },
  watch: {
    zaboDetail() {
      console.log(this.zaboDetail);
      this.callPoster();
    },
  },
  methods: {
    zaboThumbnailDetailShow() {
      document.getElementsByClassName('thumbnailDetail')[this.number].style.display = 'block';
    },
    callPoster() {
      if (typeof this.zaboDetail.posters[0] !== 'undefined') {
        axios.get(
          this.zaboDetail.posters[0],
          {
            headers: {
              'Authorization': 'Basic aHllb25nanVuQGthaXN0LmFjLmtyOmpvMTI2MTI2am8=',
            },
          },
        )
          .then((res) => {
            this.zaboDetail.poster = res.data.image;
          });
      }
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
