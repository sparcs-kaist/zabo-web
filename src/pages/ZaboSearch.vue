<template lang=''>
<div>
  <div class="totalWrapper">
    <span class="header">{{$t("검색 결과")}}</span>
    <v-progress-circular
        v-if="computedLoading"
        indeterminate
        color="primary"
        class="zaboListWrapper"
      ></v-progress-circular>
    <div class="zaboListWrapper" v-else>
      <div class="zaboWrapper" v-if="zabo.posters.length > 0" :key="zabo.id" v-for="zabo in changedZaboList">
        <img @click="zaboDetail(zabo.id, zabo.founder.nickName)" :src="zabo.posters[0].image" class="zaboImage">
        <span class="zaboTitle">{{zabo.title}}</span>
      </div>
    </div>
  </div>
  <div v-if="computedModalState" class="zaboModalWrapper">
    <zabo-detail-modal @closeModal="closeModal" :zaboId="this.computedZaboId" v-if="computedModalState"></zabo-detail-modal>
  </div>
</div>
</template>
<script>
import axios from '@/axios-auth';
import ZaboDetailModal from '@/components/ZaboDetailModal';

export default {
  created () {
    console.log(this.$route.params.search)
    this.searchZaboes();
  },
  data () {
    return {
      zaboList: [],
      isLoading: true,
      modalZaboId: -1,
      searchTerm: "",
      modalState: false,
    }
  },
  components: {
    ZaboDetailModal
  },
  computed: {
    searchValue () {
      return this.$route.params.search
    },
    changedZaboList () {
      return this.zaboList
    },
    computedLoading () {
      return this.isLoading
    },
    searchedZaboList () {
      return this.zaboList
    },
    computedZaboId () {
      return this.modalZaboId
    },
    computedModalState () {
      return this.modalState
    }
  },
  watch: {
    '$route.params.search': function (search) {
      this.isLoading = true;
      this.searchTerm = search
      this.searchZaboes();
    }
  },
  methods: {
    searchZaboes () {
      axios({
        methods: 'get',
        url: `/zaboes?search=${this.$route.params.search}`
      }).then(response => response.data.data)
        .then(data => {
          this.zaboList = data;
          this.isLoading = false;
        })
    },
    closeModal () {
      this.modalState = false;
      window.history.pushState(null, null, [`/search/${this.searchTerm}`]);
    },
    zaboDetail (id, nickname) {
      if (nickname !== "None") {
        this.modalState = true;
        window.history.pushState(null, null, [`/zabo/${id}`]);
        this.modalZaboId = id;
      }
    },
  }
}
</script>
<style scoped lang=''>
.totalWrapper {
  width: 100%;
  position: absolute;
  top: 78px;
  left: 0;
  bottom: 0;
  right: 0;
  padding-top: 27px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.header {
  font-size: 1.375em;
  font-weight: 900;
  width: 75%;
  min-width: 900px;
  text-align: left;
  margin-bottom: 20px;
  padding-left: 9px;
}
.zaboListWrapper {
  width: 75%;
  min-width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}
.zaboWrapper {
  display: flex;
  min-width: 201px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2em;
}
.zaboImage {
  width: 183px;
  height: 286px;
  margin-bottom: 0.75em;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.24), 0px 5px 10px rgba(0, 0, 0, 0.16);
  cursor: pointer;
}
.zaboTitle {
  font-size: 1.25em;
  font-weight: 900;
}
.zaboModalWrapper {
  width: 100%;
  position: absolute;
  top: 78px;
  bottom: 68px;
}
</style>
