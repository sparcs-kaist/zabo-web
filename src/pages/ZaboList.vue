<template lang=''>
<v-app>
  <div class="totalWrapper">
    <div class="filterWrapper">
      <div class="singleFilter">
      <v-select
          :items="categoryList"
          v-model="selectedCategory"
          :menu-props="{ maxHeight: '400' }"
          hint="카테고리를 선택해주세요."
          persistent-hint
        ></v-select>
      </div>
      <div class="singleFilter">
      <v-select
          :items="orderingList"
          v-model="selectedOrder"
          :menu-props="{ maxHeight: '400' }"
          hint="정렬 기준을 선택해주세요."
          persistent-hint
        ></v-select>
      </div>
    </div>
    <div class="ListWrapper" v-if="!zaboIsLoading">
      <div class="zaboWrapper">
        <div v-if="!zaboIsLoading && zaboList.length > 0" :key="zabo.id" v-for="zabo in zaboList" class="miniViewWrapper">
          <mini-view @userDetail="userDetail" :zabo="zabo"></mini-view>
        </div>
        <button v-if="nextURL != null && !zaboIsLoading" @click="fetchData()" class="more">더보기</button>
      </div>
      <div class="doesNotExist" v-show="zaboList.length == 0">
        <span>{{$t('자보가 존재하지 않습니다.')}}</span>
      </div>
    </div>
  </div>
  <v-progress-circular
      v-if="zaboIsLoading"
      indeterminate
      color="primary"
      class="ListWrapper"
    ></v-progress-circular>
  <div v-if="computedModalState" class="zaboModalWrapper">
    <zabo-detail-modal :modalZaboData="modalZaboData" @closeModal="closeModal" :zaboId="this.computedZaboId" v-if="computedModalState"></zabo-detail-modal>
  </div>
</v-app>
</template>
<script>
import axios from "@/axios-auth";
import ZaboDetailModal from "@/components/ZaboDetailModal";
import MiniView from "@/components/MiniView";

const PAGES_PER_LOAD = 10;

export default {
  created() {
    this.searchZaboes(true);
  },
  data() {
    return {
      zaboList: [],
      zaboIsLoading: true,
      modalZaboId: -1,
      modalState: false,
      following: {},
      modalZaboData: {},
      nextURL: false,
      reRender: false,
      selectedCategory: "리크루팅",
      selectedOrder: "생성 날짜",
      categoryList: ["리크루팅", "공연", "대회", "설명회", "세미나", "전람회"],
      orderingList: ["생성 날짜", "좋아요 수", "제목"]
    };
  },
  components: {
    ZaboDetailModal,
    MiniView
  },
  computed: {
    computedZaboId() {
      return this.modalZaboId;
    },
    computedModalState() {
      return this.modalState;
    }
  },
  watch: {
    selectedCategory() {
      this.searchZaboes(true);
    },
    selectedOrder() {
      this.searchZaboes(true);
    }
  },
  methods: {
    fetchData() {
      axios({
          methods: "get",
          url: this.nextURL
        })
          .then(response => {
            this.nextURL = response.data.links.next;
            if (response.status == 200) {
              this.zaboList = this.zaboList.concat(response.data.data);
              console.log(this.zaboList);
              this.zaboIsLoading = false;
            } else if (response.status == 404) {
              this.zaboIsLoading = false;
            }
          })
          .catch(err => {
            this.zaboIsLoading = false;
          });
    },
    searchZaboes(first) {
      if (first) {
        this.zaboIsLoading = true;
        this.zaboList = [];

        let method = null;
        let order = null;

        if (this.selectedCategory == "리크루팅") {
          method = "R";
        } else if (this.selectedCategory == "공연") {
          method = "P";
        } else if (this.selectedCategory == "대회") {
          method = "C";
        } else if (this.selectedCategory == "설명회") {
          method = "F";
        } else if (this.selectedCategory == "세미나") {
          method = "L";
        } else if (this.selectedCategory == "전람회") {
          method = "E";
        }

        if (this.selectedOrder == "생성 날짜") {
          order = "-created_time";
        } else if (this.selectedOrder == "좋아요 수") {
          order = "likes";
        } else if (this.selectedOrder == "제목") {
          order = "title";
        }

        this.nextURL = `/api/zaboes/?category=${method}&ordering=${order}&page_size=${PAGES_PER_LOAD}`;
      }
      this.fetchData();
    },
    closeModal() {
      this.modalState = false;
      window.history.pushState(null, null, [`/search`]);
    },
    zaboDetail(id, nickname, zaboData) {
      if (nickname !== "None") {
        this.modalState = true;
        this.modalZaboData = zaboData;
        window.history.pushState(null, null, [`/zabo/${id}`]);
        this.modalZaboId = id;
      }
    },
    userDetail(id) {
      this.$router.push({ name: "UserDetail", params: { userId: id } });
    }
  }
};
</script>
<style scoped lang='scss'>
.totalWrapper {
  background-color: white;
  width: 100%;
  padding-top: 80px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 80px 20px;
  min-height: 100vh;
  .filterWrapper {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
    .singleFilter {
      width: 30%;
      min-width: 150px;
      margin-right: 20px;
    }
    @include breakPoint("desktop") {
      width: 90%;
    }
    button {
      @include smallButton(theme);
    }
  }
  .ListWrapper {
    width: 100%;
    // min-width: 400px;
    display: flex;
    // justify-content: flex-s;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: 2em;
    .zaboWrapper {
      width: 100%;
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 2em;
      margin-right: 10px;
      .miniViewWrapper {
        width: 100%;
      }
    }
    @include breakPoint("desktop") {
      width: 90%;
      .zaboWrapper {
        .miniViewWrapper {
          width: 45%;
        }
      }
    }
    .doesNotExist {
      width: 100%;
      height: 100px;
      background-color: #ececec;
      font-size: 2em;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.more {
  @include largeButton(theme);
  margin-top: 2em;
}
</style>
