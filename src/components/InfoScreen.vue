<template>
  <div class="infoScreen">
    <div class="description">
      <div @click="userDetail(author.id)" class="userWrapper">
        <span class="userContent">작성자 :</span>
        <img :src="author.profile_image" class="profile_image"/>
        <span class="userContent">{{author.nickName}}</span>
      </div>
      <h1 class="header">카테고리</h1>
      <p class="content">{{this.computedCategory}}</p>
      <h1 class="header">결제 여부</h1>
      <p class="content">{{this.computedPayment}}</p>
      <h1 class="header">자보 설명</h1>
      <p class="content" v-if="!isLong">
        {{ shortenedInfo }}
        <span class="more" @click="seeMore = true">더 보기</span>
      </p>
      <p v-else>{{ info }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["info", "category", "payment", "author"],
  data() {
    return {
      seeMore: false
    };
  },
  computed: {
    shortenedInfo() {
      return `${this.info.substring(0, 1000)}...`;
    },
    computedCategory() {
      if (this.category == "R") {
        return "리크루팅";
      } else if (this.category == "P") {
        return "공연";
      } else if (this.category == "C") {
        return "대회";
      } else if (this.category == "F") {
        return "설명회";
      } else if (this.category == "L") {
        return "세미나";
      } else if (this.category == "E") {
        return "전람회";
      }
    },
    computedPayment() {
      if (this.payment == "F") {
        return "무료";
      }
    }
  },
  methods: {
    isLong() {
      if (this.info.length > 1000) {
        return true;
      } else {
        return false;
      }
    },
    userDetail(id) {
      this.$router.push({ name: "UserDetail", params: { userId: id } });
    },
  }
};
</script>

<style scoped lang='scss'>
.infoScreen {
  width: 100%;
  .description {
    color: #fff;
    font-size: $normal-font-size;
    text-align: left;
    font-weight: $normal-font-weight;
    .userWrapper {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover {
        .profile_image {
          @include smallBoxShadow();
        }
      }
      .profile_image {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .userContent {
        font-size: $h1-font-size;
        font-weight: $big-font-weight;
        margin-left: 8px;
        &:first-child {
          margin-left: 0;
          margin-right: 8px;
          font-weight: $normal-font-weight;
        }
      }
    }
    .header {
      font-size: $big-font-size;
      margin-bottom: 5px;
    }
    .content {
      font-size: $normal-font-size;
      margin-bottom: 15px;
      .more {
        color: rgb(140, 140, 140);
        cursor: pointer;
      }
    }
  }
  @include breakPoint("phone") {
    .description {
      font-size: $h2-font-size;
      .userWrapper {
        .profile_image {
          width: 25px;
          height: 25px;
        }
        .userContent {
          font-size: $normal-font-size;
        }
      }
      .header {
        font-size: $normal-font-size;
      }
      .content {
        font-size: $h2-font-size;
      }
    }
  }
}
</style>
