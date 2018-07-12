<template>
  <v-app style="background-color: white; padding-top: 0px;">
    <div class="zaboUpload">
      <div style="height: 90px;"/>
      <div class="headingWrapper">
        <span class="heading">
          {{$t('자보 올리기')}}
        </span>
        <div class="explanationWrapper">
          <div class="required"></div>
          <span class="font-light">| {{$t('필수 항목')}}</span>
        </div>
      </div>
      <div v-if="!loggedIn" class="warning">You're not logged In!</div>
      <v-form v-else>
        <div class="mainWrapper">
          <div class="column">
            <div class="formWrapper">
              <span class="topic">{{$t('자보 이름')}}
                <div class="required"></div>
              </span>
              <v-text-field v-model="name" label="입력..." single-line solo style="width: 100%;" clearable></v-text-field>
            </div>
            <div class="formWrapper">
              <span class="topic">{{$t('장소')}}
                <div class="required"></div>
              </span>
              <v-text-field v-model="location" solo label="입력..." style="width: 100%" clearable>
              </v-text-field>
            </div>
            <div class="formWrapper">
              <span class="topic">{{$t('카테고리')}}
                <div class="required"></div>
              </span>
                <v-radio-group v-model="selectedcategory" style="width: 100%;">
                  <div style="display: flex;">
                    <v-radio color="blue" label="리크루팅" value="recruiting" style="flex: 1;"></v-radio>
                    <v-radio color="blue" label="공연" value="performance" style="flex: 1;"></v-radio>
                    <v-radio color="blue" label="대회" value="competition" style="flex: 1;"></v-radio>
                  </div>
                  <div style="display: flex;">
                    <v-radio color="blue" label="세미나" value="seminar" style="flex: 1;"></v-radio>
                    <v-radio color="blue" label="설명회" value="information" style="flex: 1;"></v-radio>
                    <v-radio color="blue" label="전시회" value="expo" style="flex: 1;"></v-radio>
                  </div>
                </v-radio-group>
            </div>
            <div class="formWrapper">
              <span class="topic">
                <div class="topicWrapper">
                  {{$t('일정')}}
                  <div class="required"></div>
                </div>
                <div>
                  <div style="float: right; height: 100%;">
                    <v-switch v-model="multipleDays" color="green" :value="true" disabled></v-switch>
                  </div>
                  <span class="label-text">
                    {{ multipleDaysString }}
                  </span>
                </div>
              </span>
              <div v-if="multipleDays" class="multi-days">
                hey
              </div>
              <div v-else class="one-day">
                 <v-flex xs11>
                  <v-menu
                    transition="slide-y-transition"
                    offset-y
                    full-width
                    min-width="290px">
                    <v-text-field
                      slot="activator"
                      solo
                      label="날짜 선택..."
                      v-model="eventDate"
                      readonly
                      prepend-icon="event"
                    ></v-text-field>
                    <v-date-picker v-model="eventDate" no-title scrollable :min="today">
                    </v-date-picker>
                  </v-menu>
                </v-flex>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="formWrapper">
              <span class="topic">{{$t('참여 방법')}}
                <div class="required"></div>
              </span>
              <v-select v-model="selectedMethod" :items="participateMethods" label="선택..." solo style="width: 100%;">
              </v-select>
            </div>
            <div class="formWrapper">
              <span class="topic">
                <div class="topicWrapper">
                  {{$t('결제 필요 여부')}}
                </div>
                <span class="font-light">필요하지 않음</span>
                <div>
                  <v-switch v-model="paymentRequired" color="green" :value="false" disabled></v-switch>
                </div>
              </span>
            </div>
            <div class="formWrapper">
              <span class="topic">{{$t('자보 설명')}}</span>
              <v-textarea style="width: 100%;" solo label="입력..." v-model="introduction"></v-textarea>
            </div>
            <div class="formWrapper">
              <span class="topic">{{$t('참여 인원')}}</span>
              <v-text-field v-model="participateMembers" type="number" label="입력..." solo style="width: 100%" clearable/>
            </div>
          </div>
          <div class="column">
            <div class="formWrapper">
              <div v-if="imagePreviewUrls.length == 0" class="zaboAddWrapper">
                <span>{{$t('자보 추가')}}</span>
                <v-icon class="material-icons icon-big" @click="$refs.posterInput.click()">add_circle</v-icon>
                <input style="display:none" type="file" @change="posteradded" ref="posterInput">
              </div>
              <div v-else>
                <img :src="imagePreviewUrls[0]" style="width: 100%;height: 100%">
                <div @click="deletePoster" style="width: 100px; height:100px;">
                  delete
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="upload_submit">
          upload
        </div>
      </v-form>
    </div>
    <div style="height: 78px"/>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      selectedcategory: "",
      location: "",
      multipleDays: false,
      participateMethods: [
        "자보에서 신청",
        "현장 접수",
        "외부 링크를 통한 신청"
      ],
      selectedMethod: "",
      eventDate: "",
      multiEventDates: [],
      paymentRequired: false,
      explanation: "",
      participateMembers: 0,
      introduction: ``,
      zaboPoster: [],
      imagePreviewUrls: []
    };
  },
  methods: {
    posteradded(event) {
      this.zaboPoster = event.target.files[0];
      this.imagePreviewUrls.push(URL.createObjectURL(this.zaboPoster));
    },
    deletePoster() {
      this.zaboPoster = [];
      this.imagePreviewUrls = [];
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedInState;
    },
    multipleDaysString() {
      return this.multipleDays ? "여러 날" : "하루";
    },
    today() {
      var day = new Date();
      var dd = day.getDate() + "";
      if (dd.length < 2) {
        dd = "0" + dd;
      }
      var mm = day.getMonth() + 1 + "";
      if (mm.length < 2) {
        mm = "0" + mm;
      }
      var yyyy = day.getFullYear();
      return yyyy + "-" + mm + "-" + dd;
    }
  },
  created() {
    var map = new naver.maps.Map(document.getElementById("naverMap"));
    console.log("hell");
  }
};
</script>

<style scoped>
.zaboUpload {
  width: 70%;
  margin-left: 15%;
}
.warning {
  font-size: 100px;
}
.required {
  width: 5px;
  height: 5px;
  background-color: #e52f2f;
  border-radius: 50%;
  margin-left: 10px;
  margin-right: 10px;
}

@media screen and (max-width: 1599px) {
  .mainWrapper {
    display: relative;
  }
  .column {
    margin-bottom: 40px;
  }
}

@media screen and (min-width: 1600px) {
  .mainWrapper {
    display: flex;
    min-width: 344px;
    margin: 0 auto;
    justify-content: center;
    align-items: flex-start;
  }
  .column {
    flex: 1;
    position: relative;
    min-height: 614px;
    margin-right: 89px;
  }
}

.column:last-child {
  flex: 1.2;
  margin-right: 0;
}

.formWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 15px;
}
.categoriesWrapper {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-start;
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
  margin-bottom: 45px;
}
.heading {
  font-size: 22pt;
  font-weight: 900;
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
  margin-bottom: 9px;
  font-size: 15pt;
}
.font-light {
  color: #b8b8b8;
  font-size: 10pt;
  margin-right: 10px;
}

.label-text {
  color: #b8b8b8;
  font-size: 10pt;
  margin-right: 10px;
  float: right;
  margin-top: 27px;
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
  /* position: absolute; */
  height: 700px;
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

.multi-days {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
}

.one-day {
  display: flex;
  justify-content: center;
  align-items: baseline;
  width: 100%;
  padding-top: 7px;
  height: 65px;
  background-color: #f6f6f6;
  margin-top: -15px;
}

.one-timeslot {
  width: 90%;
  height: 40px;
  border-radius: 10px;
  background-color: white;
}

.upload_submit {
  width: 300px;
  height: 40px;
  background-color: #12397d;
  color: white;
}
</style>
