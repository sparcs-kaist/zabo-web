<template lang=''>
  <div id="background_div">
    <div id="loginbox">
      <v-app id="vform">
        <a href="http://localhost:8080">
          <img src="@/logo.svg" id="logo">
        </a>
        <div v-if="isZabologin === false" style="padding-left: 0px;">
          <v-btn depressed color="indigo darken-3" class="sso-login">
            SPARCS SSO로 로그인
          </v-btn>
          <v-btn depressed color="grey lighten-3" class="zabo-login" @click="zabologin">
            Zabo 단체 계정으로 로그인
          </v-btn>
        </div>
        <div v-else style="margin-top: -20px;">
          <div class="backward" @click="zabologin">
            뒤로
          </div>
          <p class="zabologin-text">
            단체 계정으로 로그인
          </p>
          <v-form v-model="valid" method="get" @submit.prevent="login">
            <v-text-field
            required
            label = "E-mail"
            v-model = "email"
            :rules="emailRules"
            class = "field"/>
            <v-text-field
            required
            label = "Password"
            v-model = "password"
            :rules="passwordRules"
            type = "password"
            class = "field"/>
            <v-btn type="submit" :disabled="!valid" depressed :loading="loading" color="indigo darken-3" id="login_button">로그인</v-btn>
          </v-form>
        </div>
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
      passwordRules: [v => !!v || "비밀번호를 입력해주세요."]
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
          console.warn("Wrong Email/password.");
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
  background-image: linear-gradient(rgba(0, 0, 0, 0.4)),
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
  height: 230px;
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
  margin-bottom: 25px;
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

.backward {
  width: 30px;
  height: 20px;
  float: left;
  font-family: Nanumsquare;
  font-size: 11pt;
  font-weight: 700;
  cursor: pointer;
  position: absolute;
  margin-top: -5px;
}

.zabologin-text {
  width: 300px;
  text-align: center;
  font-family: Nanumsquare;
  color: #12397d;
  font-size: 13pt;
  font-weight: 800;
  margin-top: -10px;
}

.field {
  margin-top: 0px;
}

#login_button {
  width: 300px;
  height: 50px;
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
  top: 350px;
}
</style>
