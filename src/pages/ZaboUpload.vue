<template>
  <div class="zaboUpload">
    <div v-if="!loggedIn" class="warning">You're not logged In!</div>
    <div class="mainWrapper" v-else>
      <div class="column">
        <div class="headingWrapper">
          <span class="heading">
            {{$t('자보 올리기')}}
          </span>
          <div class="explanationWrapper">
            <div class="required"></div>
            <span class="font-light">| {{$t('필수 항목')}}</span>
          </div>
        </div>
        <div class="formWrapper">
          <span class="topic">{{$t('자보 이름')}}
            <div class="required"></div>
          </span>
          <input class="textbox" placeholder="이름을 입력해주세요." type="text" v-model="name" />
        </div>
        <div class="formWrapper">
          <span class="topic">{{$t('장소')}}
            <div class="required"></div>
          </span>
          <div class="googleAPI"> </div>
        </div>
        <div class="formWrapper">
          <span class="topic">{{$t('카테고리')}}
            <div class="required"></div>
          </span>
          <div class="categoriesWrapper">
            <div v-for="(category, index) in categoryList" :key="index" class="radioWrapper">
              <input :id="category" class="categoryRadio" :value="category" type="radio" v-model="selectedcategory" />
              <label :for="category" class="categoryLabel">{{$t(category)}}</label>
            </div>
          </div>
        </div>
        <div class="formWrapper">
          <span class="topic">
            <div class="topicWrapper">
              {{$t('일정')}}
              <div class="required"></div>
            </div>
            <div class="checkboxWrapper">
              <label for="multipleDays">{{$t('여러 날')}}</label>
              <input id="multipleDays" type="checkbox" v-model="multipleDays" />
            </div>
          </span>
          <div class="scheduleWrapper">
            <span>{{$t('일정이 없습니다. 아래 버튼으로 추가하세요.')}}</span>
            <v-icon class="material-icons icon-small">add_circle</v-icon>
          </div>
        </div>
        <div class="formWrapper">
          <span class="topic">{{$t('참여 방법')}}
            <div class="required"></div>
          </span>
          <select class="selectTag" v-model="selectedMethod">
            <option disabled value="">참여 방법을 선택하세요.</option>
            <option v-for="(method, index) in participateMethods" :key="index">{{method}}</option>
          </select>
        </div>
      </div>
      <div class="column">
        <div class="formWrapper">
          <span class="topic">
            <div class="topicWrapper">
              {{$t('결제 필요 여부')}}
            </div>
            <div class="checkboxWrapper">
              <label for="paymentRequired">{{$t('필요하지 않음')}}</label>
              <input id="paymentRequired" type="checkbox" v-model="paymentRequired" />
            </div>
          </span>
        </div>
        <div class="formWrapper">
          <span class="topic">{{$t('자보 설명')}}</span>
          <textarea class="textarea" v-model="explanation" placeholder="입력..."></textarea>
        </div>
        <div class="formWrapper">
          <span class="topic">{{$t('참여 인원')}}</span>
          <input class="textbox" v-model="participateMembers" type="number" placeholder="인원 수" />
        </div>
      </div>
      <div class="column">
        <div class="formWrapper">
          <div class="zaboAddWrapper">
            <span>{{$t('자보 추가')}}</span>
            <v-icon class="material-icons icon-big">add_circle</v-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: "",
      selectedcategory: "",
      categoryList: [
        "리크루팅",
        "퍼포먼스",
        "대회",
        "페어",
        "강의",
        "전시"
      ],
      multipleDays: false,
      participateMethods: [
        "자보에서 신청", "현장 접수", "외부 링크를 통한 신청"
      ],
      selectedMethod: "",
      paymentRequired: false,
      explanation: "",
      participateMembers: 0
    }
  },
  computed: {
    loggedIn () {
      return this.$store.getters.loggedInState
    }
  },
  beforeDestroy () {
    console.log(this.name, this.selectedcategory, this.multipleDays, this.selectedMethod, this.paymentRequired, this.participateMembers)
  },
};
</script>

<style scoped>
.zaboUpload {
  position: absolute;
  top: 90px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
.warning {
  font-size: 100px;
}
.required {
  width: 0.5em;
  height: 0.5em;
  background-color: #e52f2f;
  border-radius: 50%;
  margin-left: 0.25em;
  margin-right: 0.25em;
}
.mainWrapper {
  display: flex;
  width: 65%;
  min-width: 344px;
  margin: 0 auto;
  justify-content: center;
  align-items: flex-start;
}
.column {
  flex: 1;
  /* padding: 0 3%; */
  position: relative;
  min-height: 614px;
  margin-right: 89px;
}
.column:last-child {
  flex: 1.2;
  margin-right: 0;
}
.googleAPI {
  width: 100%;
  height: 172px;
  background-color: aqua;
}
.formWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 2em;
}
.categoriesWrapper {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-start;
}
.categoryRadio {
  width: 0.75em;
  height: 0.75em;
  margin-right: 0.25em;
  margin-bottom: 0.75em;
}
.categoryLabel {
  font-size: 1em;
  margin-right: 0.25em;
  margin-bottom: 0.75em;
}
.scheduleWrapper {
  width: 100%;
  height: 4em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
  font-size: 0.75em;
  color: #a5a5a5;
  transition: all 0.3s ease;
}
.scheduleWrapper:hover {
  background-color: #e9e9e9;
}
/* .multipleDays {

} */
.material-icons {
  color: #12397d;
  cursor: pointer;
}
.icon-small {
  margin-top: 0.25em;
  font-size: 1.5em;
}
.icon-big {
  font-size: 3em;
}
.headingWrapper {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.heading {
  font-size: 2em;
  font-weight: 700;
}
.explanationWrapper {
  margin-left: 1.5em;
  display: flex;
  align-items: center;
}
.topic {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1em;
  font-size: 1em;
}
.font-light {
  color: #b8b8b8;
  font-size: 0.75em;
}
.topicWrapper {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.checkboxWrapper {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #b6b6b6;
  font-size: 0.75em;
}
.textarea {
  width: 100%;
  min-height: 10em;
  background-color: #f6f6f6;
  font-size: 0.75em;
  border: none;
  resize: none;
  outline: none;
  padding: 0.75em;
  transition: all 0.3s ease;
}
.textarea:hover {
  background-color: #e9e9e9;
}
.textbox {
  width: 100%;
  background-color: #f6f6f6;
  padding: 0.75em;
  font-size: 0.75em;
  transition: all 0.3s ease;
}
.textbox:focus {
  outline: none;
}
.textbox:hover {
  background-color: #e9e9e9;
}
.zaboAddWrapper {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
  transition: all 0.3s ease;
}
.zaboAddWrapper:hover {
  background-color: #e9e9e9;
}
.selectTag {
  width: 100%;
  font-size: 1em;
  height: 2em;
  padding-left: 0.5em;
  border: 1px solid #b6b6b6;
  cursor: pointer;
}
option {
  cursor: pointer;
}
</style>
