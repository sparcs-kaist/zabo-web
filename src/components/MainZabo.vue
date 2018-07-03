<template lang=''>
  <div class="totWrapper">
    <div class="mainZaboWrapper">
      <div class="row">
        <div class="column">
          <button class="button">참여하기</button>
          <span class="heading">Fight Club</span>
          <span id="subheading">Airbnb</span>
          <p class="description">
            비싼 가구들로 집 안을 채우지만 삶에 강한 공허함을 느끼는 자동차 리콜 심사관 ‘잭’. 거부할 수 없는 매력의 거친 남자 ‘테일러 더든’과의 우연한 만남으로 본능이 이끄는 대로 삶을 살기로 결심한다. 어느 날, “싸워봐야 네 자신을 알게 된다”라는 테일러 더든의 말에 통쾌한 한 방을 날리는 잭. 두 사람은 여태껏 경험해보지 못한 강렬한 카타르시스를 느끼며 ‘파이트 클럽’이라는 비밀 조직을 결성하고, 폭력으로 세상에 저항하는 거대한 집단이 형성된다. 하지만, 걷잡을 수 없이 커진 ‘파이트 클럽’은 시간이 지날수록 의미가 변질되고, 잭과 테일러 더든 사이의 갈등도 점차 깊어져 가는데…
          </p>
        </div>
        <div class="column">
          <img :src="this.img" height="600" width="500" class="image"/>
        </div>
      </div>
      <div @click="closeMain" class="row">
        <v-icon class="icon">keyboard_arrow_up</v-icon>
        더 많은 자보 확인하기
      </div>
    </div>
    <div class="backgroundImageWrapper">
      <img :src="this.background" class="backgroundImage"/>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      img: "",
      background: ""
    }
  },
  mounted () {
    fetch("http://localhost:8000/api/zaboes/1", {
      method: "get",
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(response => {
        console.log(response)
        return response.json()
      })
      .then(json => {
        const { posters } = json
        this.img = posters[0].image
        this.background = posters[0].image
      })
  },
  methods: {
    closeMain: function () {
      this.$store.commit("MAIN_ZABO_SEEN")
    }
  }
}
</script>

<style scoped lang=''>
.mainZaboWrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.7);
  margin: auto auto;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  position: fixed;
  z-index: 900;
}
.column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
  height: 100vh;
  width: 55%;
}
.row {
  z-index: 1000;
}
.row:first-child {
  flex: 1;
  display: flex;
}
.row:last-child {
  height: 6em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.25em;
  color: white;
  cursor: pointer;
}
.column:first-child {
  padding-right: 3.75em;
  text-align: right;
  color: white;
}
.column:last-child {
  width: 45%;
  align-items: flex-start;
}
.icon {
  font-size: 2em;
  margin-bottom: 0.2em;
}
.button {
  padding: 11px 38px 10px 38px;
  background-color: #12397d;
  font-size: 1.25em;
  margin-bottom: 26px;
}
.heading {
  font-size: 6.25em;
  font-weight: 900;
}
#subheading {
  font-size: 2.4em;
  margin-bottom: 0.5em;
}
.description {
  width: 60%;
  font-size: 1.25em;
}
.backgroundImageWrapper {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  width: 100%;
  margin: auto auto;
  z-index: 800;
}
.backgroundImage {
  width: 150%;
  height: auto;
  z-index: 800;
  filter: blur(8px);
}
</style>
