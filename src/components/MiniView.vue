<template>
  <div class="viewWrapper">
    <div class="yesMiniView">
      <div class="miniViewTotalWrapper">
        <div @click="zaboDetail(zabo.id, zabo.author.nickName, zabo)" class="posterWrapper">
          <img class="posterImage" :src="posterImage">
          <div class="posterOverlay">
            <v-icon>mdi-heart</v-icon>{{likeCount}}
          </div>
        </div>
        <div class="explainationWrapper">
          <div @click="$emit('userDetail', zabo.author.id)" class="author">
            <img class="profileImage" :src="profileImage">
            <span class="authorSpan">{{nickName}}</span>
          </div>
          <div class="explainationTitle">제목: {{title}}</div>
          <div class="category">카테고리: {{category}}</div>
          <div class="explainationLocation">장소: {{location}}</div>
          <div class="explainationContent">{{content}}</div>
        </div>
      </div>
    </div>
    <div v-if="computedModalState" class="zaboModalWrapper">
      <zabo-detail-modal :modalZaboData="modalZaboData" @closeModal="closeModal" :zaboId="this.computedZaboId" v-if="computedModalState"></zabo-detail-modal>
    </div>
  </div>
</template>
<script>
import axios from "@/axios-auth";
import ZaboDetailModal from "@/components/ZaboDetailModal";
import { baseURL, zaboURL } from "@/variables.js";

export default {
  data() {
    return {
      profileImage: "",
      posterImage: "",
      location: "",
      explaination: "",
      category: "",
      title: "",
      nickName: "",
      content: "",
      likeCount: 0,
      modalState: false,
      modalZaboId: -1,
      modalZaboData: {}
    };
  },
  props: ["zabo"],
  components: {
    ZaboDetailModal
  },
  created() {
    const {
      author,
      content,
      created_time,
      deadline,
      id,
      is_finished,
      like_count,
      location,
      posters,
      time_left,
      title,
      updated_time
    } = this.zabo;
    this.profileImage = author.profile_image;
    this.posterImage = posters[0].image_thumbnail;
    this.location = location;
    this.explaination = this.content;
    this.title = title;
    this.nickName = author.nickName;
    this.content =
      content.length > 100 ? content.substring(0, 85) + "..." : content;
    this.likeCount = like_count;
  },
  computed: {
    computedZaboId() {
      return this.modalZaboId;
    },
    computedModalState() {
      return this.modalState;
    }
  },
  methods: {
    zaboDetail(id, nickname, zaboData) {
      if (nickname !== "None") {
        this.modalZaboData = zaboData;
        window.history.pushState(null, null, [`/zabo/${id}`]);
        this.modalZaboId = id;
        this.modalState = true;
      }
    },
    closeModal() {
      this.modalState = false;
      history.back();
    }
  }
};
</script>
<style lang="scss" scoped>
.yesMiniView {
  margin-top: 12px;
  @include smallBoxShadow();
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .miniViewSpan {
    font-size: $big-font-size;
  }
  .miniViewTotalWrapper {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 12px;
    .posterWrapper {
      position: relative;
      width: 150px;
      height: 200px;
      cursor: pointer;
      .posterOverlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: $big-font-size;
        color: transparent;
        z-index: 20;
        background-color: transparent;
        transition: all 0.2s ease-in-out;
      }
      &:hover {
        .posterOverlay {
          color: white;
          background-color: $transparent-black-dark;
        }
      }
      .posterImage {
        position: absolute;
        width: 150px;
        height: 200px;
      }
      @include breakPoint("phone") {
        width: 100px;
        height: 130px;
        .posterImage {
          width: 100px;
          height: 130px;
        }
      }
    }
    .explainationWrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      margin-left: 10px;
      flex: 1;
      .author {
        display: flex;
        width: 100%;
        align-items: center;
        cursor: pointer;
        .profileImage {
          width: 25px;
          height: 25px;
          border-radius: 50%;
        }
        .authorSpan {
          font-size: $normal-font-size;
          font-weight: $big-font-weight;
          margin-left: 10px;
        }
      }
      .explainationTitle {
        font-size: $normal-font-size;
        font-weight: $big-font-weight;
        margin-top: 8px;
      }
      .category {
        font-size: $normal-font-size;
        font-weight: $big-font-weight;
        margin-top: 8px;
      }
      .explainationLocation {
        font-size: $normal-font-size;
        font-weight: $big-font-weight;
        margin-top: 8px;
      }
      .explainationContent {
        font-size: $normal-font-size;
        margin-top: 8px;
      }
      @include breakPoint("phone") {
        margin-left: 5px;
        .author {
          display: flex;
          width: 100%;
          align-items: center;
          cursor: pointer;
          .profileImage {
            width: 20px;
            height: 20px;
            border-radius: 50%;
          }
          .authorSpan {
            font-size: $small-font-size;
            font-weight: $big-font-weight;
            margin-left: 5px;
          }
        }
        .explainationTitle {
          font-size: $small-font-size;
          font-weight: $big-font-weight;
          margin-top: 4px;
        }
        .category {
          font-size: $small-font-size;
          font-weight: $big-font-weight;
          margin-top: 4px;
        }
        .explainationLocation {
          font-size: $small-font-size;
          font-weight: $big-font-weight;
          margin-top: 4px;
        }
        .explainationContent {
          font-size: $small-font-size;
          margin-top: 4px;
        }
      }
    }
  }
}
.zaboModalWrapper {
  width: 100%;
  position: absolute;
  top: 78px;
  bottom: 68px;
}
</style>