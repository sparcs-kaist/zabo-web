<template>
  <v-app class="appWrapper">
    <div class="zaboUpload">
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
      <v-form class="totalFormWrapper" v-else>
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
                  <v-menu transition="slide-y-transition" offset-y full-width min-width="290px">
                    <v-text-field slot="activator" solo label="날짜 선택..." v-model="eventDate" readonly prepend-icon="event"></v-text-field>
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
              <div v-if="posterBool[0]" class="zaboAdded">
                <img class="zaboPoster" :src="imagePreviewUrls[0]">
                <div class="zaboSmallPosterWrapper">
                  <img v-if="posterBool[1]" class="zaboSmallPoster" :src="imagePreviewUrls[1]">
                  <div v-else class="smallZaboAddWrapper" @click="$refs.posterInputA.click()">
                    <v-icon class="material-icons icon-big">add_circle</v-icon>
                    <input style="display:none" type="file" @change="posteradd(1, $event)" ref="posterInputA">
                  </div>
                  <img v-if="posterBool[2]" class="zaboSmallPoster" :src="imagePreviewUrls[2]">
                  <div v-else class="smallZaboAddWrapper" @click="$refs.posterInputB.click()">
                    <v-icon class="material-icons icon-big">add_circle</v-icon>
                    <input style="display:none" type="file" @change="posteradd(2, $event)" ref="posterInputB">
                  </div>
                  <img v-if="posterBool[3]" class="zaboSmallPoster" :src="imagePreviewUrls[3]">
                  <div v-else class="smallZaboAddWrapper" @click="$refs.posterInputC.click()">
                    <v-icon class="material-icons icon-big">add_circle</v-icon>
                    <input style="display:none" type="file" @change="posteradd(3, $event)" ref="posterInputC">
                  </div>
                  <img v-if="posterBool[4]" class="zaboSmallPoster" :src="imagePreviewUrls[4]">
                  <div v-else class="smallZaboAddWrapper" @click="$refs.posterInputD.click()">
                    <v-icon class="material-icons icon-big">add_circle</v-icon>
                    <input style="display:none" type="file" @change="posteradd(4, $event)" ref="posterInputD">
                  </div>
                </div>
              </div>
              <div v-else class="zaboAddWrapper" @click="$refs.posterInput.click()">
                <span>{{$t('자보 추가')}}</span>
                <v-icon class="material-icons icon-big">add_circle</v-icon>
                <input style="display:none" type="file" @change="posteradd(0, $event)" ref="posterInput">
              </div>
            </div>
          </div>
        </div>
        <div class="buttonWrapper">
          <div @click="postPoster" class="finalButton">
            {{$t('자보 올리기')}}
          </div>
          <div class="cancelButton">
            {{$t('취소')}}
          </div>
        </div>
      </v-form>
    </div>
  </v-app>
</template>

<script>
import axios from '@/axios-auth';

export default {
  data () {
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
      imagePreviewUrls: {
        0: "none",
        1: "none",
        2: "none",
        3: "none",
        4: "none",
      },
    };
  },
  created () {
    var map = new naver.maps.Map(document.getElementById("naverMap"));
    console.log("hell");
  },
  methods: {
    posteradd (num, event) {
      const url = URL.createObjectURL(event.target.files[0]);
      this.imagePreviewUrls[num] = url;
    },
    deletePoster () {
      this.imagePreviewUrls = [];
    },
    postPoster () {
      let selcat = ""
      if (this.selectedcategory == "리크루팅") {
        selcat = "R"
      } else if (this.selectedcategory == "퍼포먼스") {
        selcat = "P"
      } else if (this.selectedcategory == "경쟁") {
        selcat = "C"
      } else if (this.selectedcategory == "설명회") {
        selcat = "F"
      } else if (this.selectedcategory == "강의") {
        selcat = "L"
      } else if (this.selectedcategory == "전람회") {
        selcat = "E"
      }
      let selapp = ""
      if (this.selectedMethod == "자보에서 신청") {
        selapp = "Z"
      } else if (this.selectedMethod == "현장 접수") {
        selapp = "S"
      } else if (this.selectedMethod == "외부 링크를 통한 신청") {
        selapp = "E"
      }

      let uploadposters = [];
      for (let i = 0; i < 5; i++) {
        if (this.imagePreviewUrls[i] != "none") {
          uploadposters.push(this.imagePreviewUrls[i]);
        }
      }
      axios({
        methods: 'post',
        url: 'http://localhost:8000/api/zaboes/',
        headers: {
          'Content-Type': "multipart/form-data",
          Authorization: localStorage.getItem('token')
        },
        data: {
          title: this.name,
          location: this.location,
          content: this.explanation,
          apply: selapp,
          payment: 'F',
          category: selcat,
          posters: uploadposters
        }
      }).then(res => {
        if (res.status === 200) {
          console.log('succedd!')
          console.log(res)
        } else {
          console.log('failed')
          console.log(res);
        }
      });
    }
  },
  computed: {
    loggedIn () {
      return this.$store.getters.loggedInState;
    },
    multipleDaysString () {
      return this.multipleDays ? "여러 날" : "하루";
    },
    today () {
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
    },
    posterBool () {
      let bull = {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
      };
      for (let p = 0; p < 5; p++) {
        bull[p] = this.imagePreviewUrls[p] != "none"
      }
      return bull;
    },
  },
};
</script>

<style scoped>
.appWrapper {
  width: 100%;
  height: 100%;
  background-color: white;
}

.zaboUpload {
  margin: 78px auto 68px auto;
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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
    height: 100%;
  }
}

@media screen and (min-width: 1600px) {
  .mainWrapper {
    min-width: 344px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 50px;
  }
  .column {
    flex: 1;
    position: relative;
    min-height: 614px;
    margin-right: 89px;
    height: 100%;
  }
  .column:last-child {
    margin-right: 0px;
  }
}

.totalFormWrapper {
  width: 100%;
  height: 100%;
}

.column:last-child {
  margin-right: 0;
}

.formWrapper {
  position: relative;
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
  margin-bottom: 20px;
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
  width: 430px;
  height: 614px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
  transition: all 0.3s ease;
  cursor: pointer;
}
.zaboAddWrapper:hover {
  background-color: #e9e9e9;
}

.zaboAdded {
  width: 430px;
  /* min-height: 729px; */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.zaboPoster {
  width: 100%;
  height: 614px;
  margin-bottom: 11px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  transition: all 0.2s ease-in;
}
.zaboPoster:hover {
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
}

.zaboSmallPosterWrapper {
  width: 430px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.zaboSmallPoster {
  width: 100px;
  height: 100px;
  background-color: #777777;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  transition: all 0.2s ease-in;
}

.zaboSmallPoster:hover {
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
}

.smallZaboAddWrapper {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ececec;
  cursor: pointer;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.24);
  transition: all 0.2s ease-in;
  border-radius: 3px;
}
.smallZaboAddWrapper:hover {
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
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
  justify-content: flex-start;
  align-items: baseline;
  width: 100%;
  padding-top: 7px;
  padding-left: 5px;
  height: 65px;
  margin-top: -15px;
}

.one-timeslot {
  width: 90%;
  height: 40px;
  border-radius: 10px;
  background-color: white;
}

.buttonWrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.finalButton {
  width: 332px;
  height: 32px;
  background-color: #12397d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  font-weight: 700;
  cursor: pointer;
}
.cancelButton {
  width: 232px;
  height: 32px;
  margin-left: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  font-weight: 700;
  background-color: white;
  color: #777777;
  border: 1px solid #777777;
  cursor: pointer;
}
</style>
