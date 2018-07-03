<template lang=''>
  <div style="text-align: center;">
    <img src="@/logo.svg" id="logo">
    <v-app id="whole">
      <v-form @submit = "login" id="loginForm" mehtod="get" @submit.prevent="login">
        <v-text-field
        label = "E-mail"
        v-model = "email"
        class = "form"/>
        <br>
        <v-text-field
        label = "Password"
        v-model = "password"
        type = "password"
        class = "form"/><br>
        <v-btn type="submit" depressed color="indigo darken-3" id="login_button">로그인</v-btn>
      </v-form>
    </v-app>
  </div>
</template>
<script>
import axios from "@/axios-auth";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: async function() {
      await axios
        .post("http://localhost:8000/api-token-auth/", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.$emit("logged-in");
          localStorage.setItem("token", `ZABO ${response.data.token}`);
          return true;
        })
        .then(() => {
          this.$store.commit("LOGIN");
          this.$store.dispatch("getMyInfo");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
<style lang=''>
#whole {
  width: 100%;
  background-color: white;
  text-align: center;
  /* left: 50%; */
  /* margin-left: -150px; */
}

#logo {
  /* display: inline-block; */
  width: 100px;
  height: 50px;
  margin-left: -20px;
  margin-bottom: 30px;
}

.form {
  display: inline-block;
  width: 300px;
}

#login_button {
  width: 300px;
  height: 50px;
  font-size: 12pt;
  font-family: Nanumsquare;
  font-weight: 700;
  color: white;
  display: inline-block;
}
</style>
