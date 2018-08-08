<template>
  <v-app v-if="postState" class="appWrapper">
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
            <v-radio-group class="radioGroup" v-model="selectedcategory" style="width: 100%;">
              <div style="display: flex;">
                <v-radio color="blue" label="리크루팅" value="리크루팅" style="flex: 1;"></v-radio>
                <v-radio color="blue" label="공연" value="공연" style="flex: 1;"></v-radio>
                <v-radio color="blue" label="대회" value="대회" style="flex: 1;"></v-radio>
              </div>
              <div style="display: flex;">
                <v-radio color="blue" label="세미나" value="세미나" style="flex: 1;"></v-radio>
                <v-radio color="blue" label="설명회" value="설명회" style="flex: 1;"></v-radio>
                <v-radio color="blue" label="전시회" value="전시회" style="flex: 1;"></v-radio>
              </div>
            </v-radio-group>
          </div>
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
                {{$t('URL')}}
              </div>
              <span :class="zaboUrlExist ? 'font-heavy' : 'font-light'">{{$t('URL 포함하기')}}</span>
              <div>
                <v-switch v-model="zaboUrlExist" color="green" :value="false"></v-switch>
              </div>
            </span>
            <v-text-field v-if="zaboUrlExist" v-model="zaboUrl" solo label="입력..." style="width: 100%" clearable>
            </v-text-field>
          </div>
          <!-- <div class="formWrapper">
            <span class="topic">
              <div class="topicWrapper">
                {{$t('결제 필요 여부')}}
              </div>
              <span class="font-light">필요하지 않음</span>
              <div>
                <v-switch v-model="paymentRequired" color="green" :value="false" disabled></v-switch>
              </div>
            </span>
          </div> -->
          <div class="formWrapper">
            <span class="topic">
              <div class="topicWrapper">
                {{$t('일정')}}
                <div class="required"></div>
              </div>
            </span>
            <div class="scheduleWrapper">
              <div class="scheduleInputWrapper" v-if="!single">
                <div class="singleScheduleWrapper" v-for="(schedule, index) in scheduleDates" :key="index">
                  <div class="scheduleTimeWrapper">
                    <div class="scheduleSingleTime">
                      <span class="scheduleSpan">{{$t('시작 :')}}</span>
                      <input type="datetime-local" class="scheduleStart" v-model="schedule.start_time" required />
                    </div>
                    <div class="scheduleSingleTime">
                      <span class="scheduleSpan">{{$t('종료 :')}}</span>
                      <input type="datetime-local" class="scheduleEnd" v-model="schedule.end_time" required/>
                    </div>
                  </div>
                  <input type="text" placeholder="제목을 입력해주세요." class="scheduleContent" v-model="schedule.content" />
                  <v-icon class="cancelIcon">cancel</v-icon>
                </div>
              </div>
              <span v-else v-show="!scheduleAdding" class="smallSpan">{{$t('일정이 없습니다. 아래 버튼으로 추가하세요.')}}</span>
              <v-icon @click="zaboScheduleAdd" class="plusIcon icon-small">add_circle</v-icon>
            </div>
          </div>
          <div class="formWrapper">
            <span class="topic">{{$t('참여 기한(데드라인)')}}
              <div class="required"></div>
            </span>
            <input type="datetime-local" class="deadline" v-model="deadline" required/>
          </div>
          <div class="formWrapper">
            <span class="topic">{{$t('자보 설명')}}</span>
            <v-textarea style="width: 100%;" solo label="입력..." v-model="introduction"></v-textarea>
          </div>
        </div>
        <div class="column">
          <div class="formWrapper">
            <div v-if="posterBool[0]" class="zaboAdded">
              <div class="bigZaboPosterWrappper">
                <img class="zaboPoster" :src="imagePreviewUrls[0]">
                <v-icon @click="posterPop(0)" large color="grey lighten-3" class="clearIcon">clear</v-icon>
              </div>
              <div class="zaboSmallPosterWrapper">
                <div v-if="posterBool[1]" class="zaboSmallPoster" :style="`backgroundImage: url(${imagePreviewUrls[1]})`">
                  <v-icon @click="posterPop(1)" color="white" class="clearIcon">clear</v-icon>
                </div>
                <div v-else class="smallZaboAddWrapper" @click="$refs.posterInputA.click()">
                  <v-icon class="plusIcon icon-big">add_circle</v-icon>
                  <input style="display:none" type="file" accept=".jpg, .png, image/jpeg, image/png" @change="posteradd(1, $event)" ref="posterInputA">
                </div>
                <div v-if="posterBool[2]" class="zaboSmallPoster" :style="`backgroundImage: url(${imagePreviewUrls[2]})`">
                  <v-icon @click="posterPop(2)" color="white" class="clearIcon">clear</v-icon>
                </div>
                <div v-else class="smallZaboAddWrapper" @click="$refs.posterInputB.click()">
                  <v-icon class="plusIcon icon-big">add_circle</v-icon>
                  <input style="display:none" type="file" accept=".jpg, .png, image/jpeg, image/png" @change="posteradd(2, $event)" ref="posterInputB">
                </div>
                <div v-if="posterBool[3]" class="zaboSmallPoster" :style="`backgroundImage: url(${imagePreviewUrls[3]})`">
                  <v-icon @click="posterPop(3)" color="white" class="clearIcon">clear</v-icon>
                </div>
                <div v-else class="smallZaboAddWrapper" @click="$refs.posterInputC.click()">
                  <v-icon class="plusIcon icon-big">add_circle</v-icon>
                  <input style="display:none" type="file" accept=".jpg, .png, image/jpeg, image/png" @change="posteradd(3, $event)" ref="posterInputC">
                </div>
                <div v-if="posterBool[4]" class="zaboSmallPoster" :style="`backgroundImage: url(${imagePreviewUrls[4]})`">
                  <v-icon @click="posterPop(4)" color="white" class="clearIcon">clear</v-icon>
                </div>
                <div v-else class="smallZaboAddWrapper" @click="$refs.posterInputD.click()">
                  <v-icon class="plusIcon icon-big">add_circle</v-icon>
                  <input style="display:none" type="file" accept=".jpg, .png, image/jpeg, image/png" @change="posteradd(4, $event)" ref="posterInputD">
                </div>
              </div>
            </div>
            <div v-else class="zaboAddWrapper" @click="$refs.posterInput.click()">
              <span>{{$t('자보 추가')}}</span>
              <v-icon class="plusIcon icon-big">add_circle</v-icon>
              <input style="display:none" type="file" accept=".jpg, .png, image/jpeg, image/png" @change="posteradd(0, $event)" ref="posterInput">
            </div>
          </div>
          <div class="buttonWrapper">
            <div @click="postPoster" :class="zaboUploadValidation ? 'finalButton': 'buttonDisabled' ">
            </div>
            <div @click="$router.go(-1)" class="cancelButton">
              {{$t('취소')}}
            </div>
          </div>
        </div>
      </v-form>
    </div>
  </v-app>
  <div class="postFinished" v-else>
    <span class="postFinishedTitle">자보를 성공적으로 업로드하셨습니다.</span>
    <a href="http://ssal.sparcs.org:16140/">
      <div class="routerLinks">
        {{ $t('페이퍼 생성하러 가기') }}
      </div>
    </a>
    <router-link to="/">
      <div class="routerLinks">
        {{ $t('메인 화면으로 돌아가기') }}
      </div>
    </router-link>
    <router-link to="/user/profile">
      <div class="routerLinks">
        {{ $t('마이페이지') }}
      </div>
    </router-link>
  </div>
</template>

<script>
import axios from "@/axios-auth";

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
      scheduleDates: [],
      paymentRequired: false,
      introduction: "",
      zaboPosters: ["none", "none", "none", "none", "none"],
      imagePreviewUrls: {
        0: "none",
        1: "none",
        2: "none",
        3: "none",
        4: "none"
      },
      scheduleAdding: false,
      zaboPosterBool: false,
      zaboUrl: "",
      zaboUrlExist: false,
      postState: true,
      deadline: ""
    };
  },
  methods: {
    posteradd(num, event) {
      const url = URL.createObjectURL(event.target.files[0]);
      const file = event.target.files[0];
      this.imagePreviewUrls[num] = url;
      this.zaboPosters[num] = file;
    },
    posterPop(num) {
      if (num == 0) {
        this.imagePreviewUrls = {
          0: "none",
          1: "none",
          2: "none",
          3: "none",
          4: "none"
        };
        this.zaboPosters = ["none", "none", "none", "none", "none"];
      } else {
        this.imagePreviewUrls[num] = "none";
        this.zaboPosters[num] = "none";
      }
    },
    deletePoster() {
      this.imagePreviewUrls = [];
    },
    postPoster() {
      if (this.zaboUploadValidation) {
        let selcat = "";
        if (this.selectedcategory == "리크루팅") {
          selcat = "R";
        } else if (this.selectedcategory == "공연") {
          selcat = "P";
        } else if (this.selectedcategory == "대회") {
          selcat = "C";
        } else if (this.selectedcategory == "설명회") {
          selcat = "F";
        } else if (this.selectedcategory == "세미나") {
          selcat = "L";
        } else if (this.selectedcategory == "전시회") {
          selcat = "E";
        }

        let selapp = "";
        if (this.selectedMethod == "자보에서 신청") {
          selapp = "Z";
        } else if (this.selectedMethod == "현장 접수") {
          selapp = "S";
        } else if (this.selectedMethod == "외부 링크를 통한 신청") {
          selapp = "E";
        }
        let formData = new FormData();

        let uploadposters = [];
        for (let i = 0; i < 5; i++) {
          if (this.zaboPosters[i] != "none") {
            uploadposters.push(this.zaboPosters[i]);
            formData.set(`posters[${i}]`, this.zaboPosters[i]);
          }
        }
        formData.append("title", this.name);
        formData.append("location", this.location);
        formData.append("content", this.introduction);
        formData.append(
          "deadline",
          this.deadline.split("T")[0] +
            " " +
            this.deadline.split("T")[1] +
            ":00"
        );
        formData.append("apply", selapp);
        formData.append("payment", "F");
        formData.append("category", selcat);
        formData.append(
          "timeslots",
          JSON.stringify(this.computedScheduleDates)
        );
        if (this.zaboUrlExist) {
          formData.append("link_url", this.zaboUrl);
        }

        axios({
          method: "post",
          url: "api/zaboes/",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token")
          },
          data: formData
        })
          .then(res => {
            if (res.status === 201) {
              this.postState = false;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert("You should fill out every form!");
      }
    },
    zaboScheduleAdd() {
      this.scheduleAdding = !this.scheduleAdding;
      this.scheduleDates.push({
        content: "",
        start_time: "",
        end_time: ""
      });
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedInState;
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
    },
    posterBool() {
      let bull = {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false
      };
      for (let p = 0; p < 5; p++) {
        bull[p] = this.imagePreviewUrls[p] != "none";
      }
      return bull;
    },
    single() {
      return this.scheduleDates.length < 1;
    },
    computedScheduleDates() {
      let scheduleArray = [];
      this.scheduleDates.map(schedule => {
        scheduleArray.push({
          ...schedule,
          end_time:
            schedule.end_time.split("T")[0] +
            " " +
            schedule.end_time.split("T")[1] +
            ":00",
          start_time:
            schedule.start_time.split("T")[0] +
            " " +
            schedule.start_time.split("T")[1] +
            ":00"
        });
      });
      return scheduleArray;
    },
    zaboUploadValidation() {
      if (this.name == "") {
        return false;
      }
      if (!this.posterBool[0]) {
        return false;
      }
      if (this.selectedcategory == "") {
        return false;
      }
      if (this.selectedMethod == "") {
        return false;
      }
      if (this.location == "") {
        return false;
      }
      if (this.introduction == "") {
        return false;
      }
      if (this.scheduleDates.length == 0) {
        return false;
      } else {
        for (let s = 0; s < this.scheduleDates.length; s++) {
          if (this.scheduleDates[s].content == "") {
            return false;
          }
          if (this.scheduleDates[s].end_time == "") {
            return false;
          }
          if (this.scheduleDates[s].start_time == "") {
            return false;
          }
        }
      }
      if (this.zaboUrlExist) {
        if (this.zaboUrl == "") {
          return false;
        }
      }
      return true;
    }
  }
};
</script>

<style scoped>
.appWrapper {
  width: 100%;
  height: 100%;
  padding-top: 78px;
  padding-bottom: 68px;
  background-color: white;
}

.zaboUpload {
  margin: 0 auto 0 auto;
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

@media screen and (max-width: 1200px) {
  .column {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .column:last-child {
    height: 100%;
  }
  .totalFormWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
}
@media screen and (max-width: 1200px) {
  .zaboUpload {
    width: 90%;
  }
}

@media screen and (min-width: 1200px) and (max-width: 1599px) {
  .column {
    flex: 2;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .column:first-child {
    height: 100%;
    margin-right: 89px;
  }
  .column:last-child {
    flex: 1;
    height: 100%;
  }
  .totalFormWrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}

@media screen and (min-width: 1600px) {
  .column {
    flex: 2;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .column:first-child {
    height: 100%;
    margin-right: 89px;
  }
  .column:last-child {
    flex: 1;
    height: 100%;
  }
  .totalFormWrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.formWrapper {
  width: 100%;
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
.radioGroup {
  height: 100%;
}
.scheduleWrapper {
  width: 100%;
  padding: 10px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
  transition: all 0.3s ease;
}
.scheduleWrapper:hover {
  background-color: #e9e9e9;
}
.smallSpan {
  font-size: 0.75em;
  color: #a5a5a5;
}
.scheduleInputWrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.singleScheduleWrapper {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 0.5em;
  margin-bottom: 10px;
}
.singleScheduleWrapper:last-child {
  margin-bottom: 0;
}
.cancelIcon {
  font-size: 2em;
  color: black;
}
.scheduleTimeWrapper {
  display: flex;
  /* flex-direction: column; */
  justify-content: flex-start;
  align-items: center;
  flex: 2;
  height: 37px;
  font-size: 1em;
}
.scheduleSingleTime {
  flex: 1;
  height: 23px;
  font-size: 1.125em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.scheduleSpan {
  margin-right: 0.5em;
  font-size: 16px;
  font-weight: 700;
}
.scheduleStart {
  flex: 1;
  color: black;
  height: 23px;
  font-size: 16px;
}
.scheduleEnd {
  flex: 1;
  color: #848484;
  height: 23px;
  font-size: 16px;
}
.deadline {
  color: rgba(0, 0, 0, 0.87);
  font-size: 18px;
  font-weight: 700;
}
.scheduleContent {
  flex: 1;
  word-wrap: break-word;
  word-break: break-all;
  height: 37px;
  font-size: 16px;
  font-weight: 400;
  color: black;
  text-align: right;
  padding-right: 0.5em;
}
.scheduleContent:focus {
  outline: none;
}

.plusIcon {
  color: #12397d;
  cursor: pointer;
}
.icon-small {
  margin-top: 0.25em;
  font-size: 1.5em;
}
.icon-big {
  font-size: 2.25em;
}
.headingWrapper {
  width: 100%;
  height: 50px;
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
  font-size: 0.75em;
  margin-right: 10px;
}
.font-heavy {
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.75em;
  margin-right: 10px;
  font-weight: 700;
}

.label-text {
  color: #b8b8b8;
  font-size: 0.75em;
  margin-right: 10px;
  float: right;
  margin-top: 27px;
}

.topicWrapper {
  flex: 1;
  height: 100%;
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
  height: 100%;
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
  height: 100%;
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
  height: 0;
  min-width: 300px;
  padding-top: 75%;
  padding-bottom: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
  transition: all 0.3s ease;
  cursor: pointer;
  margin-bottom: 10px;
}
.zaboAddWrapper:hover {
  background-color: #e9e9e9;
}

.zaboAdded {
  width: 100%;
  height: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.bigZaboPosterWrappper {
  width: 100%;
  height: auto;
  position: relative;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  transition: all 0.2s ease-in;
  margin-bottom: 11px;
}
.bigZaboPosterWrapper:hover {
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
}

.zaboPoster {
  width: 100%;
  height: auto;
}

.zaboSmallPosterWrapper {
  width: 100%;
  height: 0;
  padding-top: 12.5%;
  padding-bottom: 12.5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.zaboSmallPoster {
  width: 22%;
  height: 0;
  position: relative;
  background-size: cover;
  padding-top: 11%;
  padding-bottom: 11%;
  background-color: #777777;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  transition: all 0.2s ease-in;
}

.zaboSmallPoster:hover {
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
}

.clearIcon {
  position: absolute;
  top: 0;
  right: 0;
}

.smallZaboAddWrapper {
  width: 22%;
  height: 0;
  padding-top: 11%;
  padding-bottom: 11%;
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
  height: 100%;
  font-size: 1em;
  height: 2em;
  padding-left: 0.5em;
  border: 1px solid #b6b6b6;
  cursor: pointer;
}
option {
  cursor: pointer;
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
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.finalButton {
  /* flex: 1; */
  width: 100%;
  height: 38px;
  margin-bottom: 0.5em;
  background-color: #12397d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}
.finalButton::before {
  content: "자보 올리기";
}
.finalButton:hover {
  background-color: #123958;
}
.buttonDisabled {
  width: 100%;
  height: 38px;
  margin-bottom: 0.5em;
  background-color: #ff4444;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  /* opacity: 0.3; */
}
.buttonDisabled::before {
  content: "모든 입력란을 채워주세요.";
}
.buttonDisabled:hover {
  background-color: rgba(255, 0, 0, 0.9);
  color: white;
}

.cancelButton {
  /* flex: 1; */
  width: 100%;
  height: 38px;
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
.postFinished {
  position: absolute;
  top: 78px;
  bottom: 78px;
  left: 15%;
  right: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.postFinishedTitle {
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 20px;
}
.routerLinks {
  width: 100%;
  padding: 10px;
  text-align: center;
  font-size: 25px;
}
</style>
