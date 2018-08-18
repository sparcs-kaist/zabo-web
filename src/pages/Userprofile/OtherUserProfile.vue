<template lang=''>
<v-app id="template">
  <div class = "whole">
    <div style="width: 100%; display: flex; margin-bottom: 10px">
      <span class="sub-header">
        기본 정보
      </span>
    </div>
    <div class="small-col" style="margin-top: 10px">
      <div class="small-col-wrapper">
        <div class="singleInfo">
          <span class="info-label">닉네임</span>
          <div class="data-slot">{{ nickName }}</div>
        </div>
        <div class="singleInfo">
          <span class="info-label">전화번호</span>
          <div class="data-slot">{{ phone }}</div>
        </div>
      </div>
      <div class="small-col-wrapper">
        <div class="singleInfo">
          <span class="info-label">성별</span>
          <div class="data-slot">{{ computedGender }}</div>
        </div>
        <div class="singleInfo">
          <span class="info-label">이메일</span>
          <div class="data-slot">{{ email }}</div>
        </div>
      </div>
    </div>
  </div>
</v-app>
</template>
<script>
export default {
  props: ["valid", "first", "last", "image", "gender", "email", "nickName"],
  computed: {
    computedGender() {
      if (this.gender == "M") {
        return "남성";
      } else if (this.gender == "F") {
        return "여성";
      } else if (this.gender == "B") {
        return "비공개";
      } else if (this.gender == "E") {
        return "기타";
      }
    }
  }
};
</script>
<style lang='scss' scoped>
#template {
  background-color: white;
  .whole {
    width: 100%;
    // height: 1000px;
    display: flex;
    /* justify-content: center; */
    flex-direction: column;
    align-items: center;
    .submit_button {
      font-family: Nanumsquare;
      font-weight: 700;
      font-size: 12pt;
      width: 130px;
      height: 40px;
      color: white;
    }
    .cancel_button {
      float: left;
      font-family: Nanumsquare;
      font-weight: 700;
      font-size: 12pt;
      height: 40px;
      color: white;
      margin-left: -3px;
    }
    .sub-header {
      font-family: Nanumsquare;
      font-weight: 900;
      font-size: $big-font-size;
      position: relative;
      margin-top: 22px;
      margin-right: auto;
      @include breakPoint("phone") {
        font-size: $h1-font-size;
      }
    }
    .small-col {
      width: 100%;
      display: flex;
      flex-direction: column;
      .small-col-wrapper {
        display: flex;
        @include breakPoint("phone") {
          flex-direction: column;
        }
        width: 100%;
        .singleInfo {
          margin-bottom: 15px;
          flex: 1;
          text-align: left;
          .info-label {
            font-family: Nanumsquare;
            font-size: $big-font-size;
            @include breakPoint("phone") {
              font-size: $normal-font-size;
            }
          }
          .data-slot {
            display: flex;
            align-items: center;
            padding-left: 10px;
            width: 90%;
            background-color: #f6f6f6;
            height: 50px;
            margin-top: 9px;
          }
        }
      }
    }
  }
}
</style>
