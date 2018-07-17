<template lang=''>
  <div id="background_div">
    <div id="loginbox">
      <v-app id="vform">
        <a href="http://localhost:8080">
          <img src="../assets/logo.svg" id="logo">
        </a>
          <transition name="slide-fade" mode="out-in">
            <div key="option" v-if="isZabologin === false" style="padding-left: 0px;">
              <v-btn depressed color="indigo darken-3" class="sso-login">
                sparcs sso로 로그인
              </v-btn>
              <v-btn depressed color="grey lighten-3" class="zabo-login" @click="zabologin">
                zabo 단체 계정으로 로그인
              </v-btn>
            </div>
            <div key="teamaccount" v-if="isZabologin === true" style="margin-top: -20px;">
              <div class="zabologin-text" @click="zabologin">
                <div style="width: 10px; float: left;">
                  <img src="../assets/backword.svg" style="width: 10px; padding-top: 5px; margin-left: 60px;">
                </div>
                단체 계정으로 로그인
              </div>
                <v-form v-model="valid" method="get" @submit.prevent="login">
                  <div style="height:15px;"/>
                  <v-text-field
                  required
                  label = "E-mail"
                  v-model = "email"
                  :rules="emailRules"
                  class = "field"/>
                  <div style="height:20px;"/>
                  <v-text-field
                  required
                  label = "Password"
                  v-model = "password"
                  :rules="passwordRules"
                  type = "password"
                  class = "field"/>
                  <v-btn type="submit" :disabled="!valid" depressed :loading="loading" color="indigo darken-3" id="login_button">로그인</v-btn>
                </v-form>
                <div v-if="loginfailed" class="error-message">
                  아이디/비밀번호가 틀렸습니다.
                </div>
            </div>
          </transition>
        <p class="copyright">
          Copyright 2018. All right reserved.
        </p>
      </v-app>
    </div>
  </div>
</template>
<script>
import axios from "@/axios-auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      isZabologin: false,
      valid: true,
      emailRules: [
        v => !!v || "이메일을 입력해주세요.",
        v => /.+@.+/.test(v) || "유효한 이메일 형식이 아닙니다."
      ],
      passwordRules: [v => !!v || "비밀번호를 입력해주세요."],
      loginfailed: false
    };
  },
  methods: {
    zabologin() {
      this.isZabologin = !this.isZabologin;
    },
    login() {
      this.$store.commit("START_AJAX");
      axios
        .post("http://localhost:8000/api-token-auth/", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          localStorage.setItem("token", `ZABO ${response.data.token}`);
        })
        .catch(err => {
          this.loginfailed = true;
          this.$store.commit("GOT_RESPONSE");
        })
        .then(() => {
          axios("/users/myInfo", {
            method: "GET",
            headers: {
              Authorization: localStorage.getItem("token")
            }
          })
            .then(response => {
              this.$store.commit("LOGIN", response.data);
            })
            .then(() => {
              this.$store.commit("GOT_RESPONSE");
            })
            .then(() => {
              this.$emit("logged-in");
              this.$store.dispatch("getNotifications");
            });
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
    url("../assets/ozan-safak-484829-unsplash.jpg");
  background-size: cover;
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

#logo {
  /* display: inline-block; */
  width: 130px;
  height: 70px;
  left: 50%;
  transform: translateX(-50%);
  position: relative;
  margin-left: -10px;
  margin-bottom: 35px;
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
