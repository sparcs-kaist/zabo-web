<template lang=''>
  <div id="background_div">
    <div id="loginbox">
      <v-app :id="currentPage == 'REGISTER' || currentPage == 'REGISTER_DONE' ? 'wideForm' : 'vform'">
        <div @click="reloadPage">
          <img src="../assets/logo.svg" id="logo">
        </div>
          <transition name="slide-fade" mode="out-in">
            <div key="option" v-if="currentPage == 'CHOOSE_METHOD'" style="padding-left: 0px;">
              <v-btn @click="redirectToBack" depressed color="indigo darken-3" class="sso-login">
                sparcs sso로 로그인
              </v-btn>
              <v-btn depressed color="grey lighten-3" class="zabo-login" @click="currentPage = 'LOGGING_IN'">
                zabo 단체 계정으로 로그인
              </v-btn>
              <v-btn depressed color="white" class="zabo-login" @click="currentPage = 'REGISTER'">
                회원가입
              </v-btn>
            </div>
            <div key="teamaccount" v-if="currentPage == 'LOGGING_IN'" style="margin-top: -20px;">
              <div class="zabologin-text" @click="currentPage = 'CHOOSE_METHOD'">
                <div style="width: 10px; float: left;">
                  <img src="../assets/backword.svg" style="width: 10px; padding-top: 5px; margin-left: 60px;">
                </div>
                다른 방식으로 로그인
              </div>
                <v-form v-model="valid" method="get" @submit.prevent="login">
                  <div style="height:15px;"/>
                  <v-text-field
                  required
                  label="이메일"
                  v-model="email"
                  :rules="emailRules"
                  class="field"/>
                  <div style="height:20px;"/>
                  <v-text-field
                  required
                  label="패스워드"
                  v-model="password"
                  :rules="passwordRules"
                  type="password"
                  class="field"/>
                  <v-btn type="submit" :disabled="!valid" depressed :loading="loading" color="indigo darken-3" id="login_button">로그인</v-btn>
                </v-form>
                <div v-if="loginfailed" class="error-message">
                  아이디/비밀번호가 틀렸습니다.
                </div>
            </div>
            <div class="registerWrapper" key="register" v-if="currentPage == 'REGISTER'">
              <div class="zabologin-text" @click="currentPage = 'CHOOSE_METHOD'">
                <div style="width: 10px; float: left;">
                  <img src="../assets/backword.svg" style="width: 10px; padding-top: 5px; margin-left: 60px;">
                </div>
                로그인 하러가기
              </div>
              <div class="registerFormWrapper">
                <v-text-field
                  required
                  label="이메일"
                  v-model="registerEmail"
                  :rules="emailRules"
                  class = "field"/>
                <v-text-field
                  required
                  label="닉네임"
                  v-model="registernickName"
                  class = "field"/>
                <v-text-field
                  required
                  label="이름"
                  v-model="registerFirstName"
                  class = "field"/>
                <v-text-field
                  required
                  label="성"
                  v-model="registerLastName"
                  class = "field"/>
                <v-text-field
                  required
                  label="전화번호"
                  v-model="registerPhone"
                  class = "field"/>
                <v-btn type="submit" @click.prevent.native="register" :loading="registerLoading" depressed color="indigo darken-3" id="login_button">회원가입</v-btn>
              </div>
            </div>
            <div class="registerWrapper" key="registerDone" v-if="currentPage == 'REGISTER_DONE'">
              <div class="zabologin-text" @click="currentPage = 'CHOOSE_METHOD'">
                <div style="width: 10px; float: left;">
                  <img src="../assets/backword.svg" style="width: 10px; padding-top: 5px; margin-left: 60px;">
                </div>
                로그인 하러가기
              </div>
              <div class="registerFormWrapper">
                <span class="registerDoneSpan">회원가입이 완료되었습니다.</span>
                <span class="registerDoneSpan">자보 단체계정을 이용하기 위해선 인증이 필요합니다. 현재</span>
                <span class="registerDoneSpan">회원님의 계정이 승인 심사중에 있으니 연락을 받으신 후</span>
                <span class="registerDoneSpan">이용해주시면 감사하겠습니다.</span>
              </div>
            </div>
          </transition>
        <p class="copyright">
          {{currentPage != 'REGISTER' ? 'Copyright 2018. All right reserved.' : ''}}
        </p>
      </v-app>
    </div>
  </div>
</template>
<script>
import axios from "@/axios-auth";
import { baseURL } from "@/variables.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      valid: true,
      emailRules: [
        v => !!v || "이메일을 입력해주세요.",
        v => /.+@.+/.test(v) || "유효한 이메일 형식이 아닙니다."
      ],
      passwordRules: [v => !!v || "비밀번호를 입력해주세요."],
      loginfailed: false,
      currentPage: "CHOOSE_METHOD",
      registerEmail: "",
      registernickName: "",
      registerFirstName: "",
      registerLastName: "",
      registerPhone: "",
      registerLoading: false
    };
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
    login() {
      this.$store.commit("START_AJAX");
      axios
        .post("/api-token-auth/", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          console.log(response.status);
          if (response.status == 200) {
            sessionStorage.setItem("token", `ZABO ${response.data.token}`);
            this.$store.dispatch("login", response.data.token);
            return response.status;
          } else if (response.status == 401) {
            this.loginfailed = true;
            this.$store.commit("GOT_RESPONSE");
          }
        })
        .then(status => {
          if (status == 200) {
            axios("api/users/myInfo/", {
              method: "GET",
              headers: {
                Authorization: sessionStorage.getItem("token")
              }
            })
              .then(response => {
                this.$store.commit("SET_CURRENT_USER", response.data);
              })
              .then(() => {
                this.$store.commit("GOT_RESPONSE");
              })
              .then(() => {
                this.$emit("logged-in");
                this.$store.dispatch("getNotifications");
              });
          }
        })
        .catch(err => {
          this.loginfailed = true;
          this.$store.commit("GOT_RESPONSE");
        });
    },
    redirectToBack() {
      window.location = baseURL + "/api/login/";
    },
    register() {
      console.log(
        this.registerEmail,
        this.registernickName,
        this.registerFirstName,
        this.registerLastName,
        this.registerPhone
      );
      this.registerLoading = true;
      axios({
        method: "post",
        url: "/api/users/",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          email: this.registerEmail,
          nickName: this.registernickName,
          first_name: this.registerFirstName,
          last_name: this.registerLastName,
          phone: this.registerPhone
        }
      }).then(res => {
        if (res.status == 201) {
          this.currentPage = "REGISTER_DONE";
        }
      });
    }
  },
  computed: {
    loading() {
      return !this.$store.getters.isAjaxfinished;
    }
  }
};
</script>
<style lang='' scoped>
#background_div {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: auto auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("../assets/login.jpg");
  background-size: cover;
  z-index: 300;
}
#loginbox {
  width: 500px;
  height: 500px;
  /* transform: translateX(-50%); */
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  background-color: white;
  box-shadow: 0px 15px 65px #1f1f1f;
}

#vform {
  width: 300px;
  height: 240px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
  position: relative;
  background-color: white;
}
#wideForm {
  width: 900px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;
  background-color: white;
}
.registerWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.registerFormWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 80%;
  height: 400px;
  margin-top: 30px;
}
.registerDoneSpan {
  font-size: 18px;
  padding: 5px 0;
}
#logo {
  /* display: inline-block; */
  width: 130px;
  height: 70px;
  left: 50%;
  transform: translateX(-50%);
  position: relative;
  margin-left: -10px;
  margin-bottom: 20px;
}

.sso-login {
  width: 300px;
  height: 80px;
  font-size: 14pt;
  font-family: Nanumsquare;
  font-weight: 700;
  color: white;
  margin-left: 0px;
}

.zabo-login {
  width: 300px;
  height: 80px;
  font-size: 14pt;
  font-family: Nanumsquare;
  font-weight: 700;
  margin-left: 0px;
}
.zabo-login:last-child {
  height: 50px;
}

.zabologin-text {
  width: 300px;
  height: 30px;
  text-align: center;
  font-family: Nanumsquare;
  color: #12397d;
  font-size: 13pt;
  font-weight: 800;
  /* margin-top: -10px; */
  cursor: pointer;
}

.field {
  margin-top: 0px;
  width: 100%;
}

#login_button {
  width: 300px;
  height: 55px;
  margin-left: 0px;
  font-size: 13pt;
  font-family: Nanumsquare;
  font-weight: 700;
  color: white;
}

.copyright {
  width: 300px;
  text-align: center;
  font-size: 8pt;
  position: absolute;
  top: 360px;
}

.slide-fade-enter-active {
  transition: all 0.1s ease-in-out;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translate(30px);
  opacity: 0;
}

.error-message {
  text-align: center;
  font-size: 10pt;
  color: red;
}
</style>
