<template lang=''>
  <div>
    <v-app style="background-color: white; text-align: center;">
      <v-form @submit = "login" id="loginForm" mehtod="get" @submit.prevent="login" class="loginform">
        <v-text-field
        label = "E-mail"
        v-model = "email"
        class = "form"/>
        <br>
        <v-text-field
        label = "비밀번호"
        v-model = "password"
        type = "password"
        class = "form"/><br>
        <v-btn type="submit" :flat="true" :outline="true" color="indigo darken-4" class="loginbutton">로그인</v-btn>
      </v-form>
    </v-app>
  </div>
</template>
<script>
import axios from "@/axios-auth";

export default {
  data () {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    login: async function () {
      await axios.post(
        "http://localhost:8000/api-token-auth/",
        {
          email: this.email,
          password: this.password
        }
      )
        .then(response => {
          localStorage.setItem("token", `ZABO ${response.data.token}`)
          this.$emit('logged-in');
          this.$store.dispatch('getMyInfo')
          return console.log(response.data);
        })
        // .then(data => {
        //   this.$http({
        //     method: "get",
        //     url: "http://localhost:8000/api/users/myInfo",
        //     headers: {
        //       Authorization: localStorage.getItem('token')
        //     }
        //   }).then(result => {
        //     this.$store.commit("LOGIN", result.data)
        //   })
        // }
        // )
        .catch(err => console.log(err))
    }
  }
}
</script>
<style lang=''>
.class {
  position: absolute;
  width: 310px;
  height: 300px;
  background-color: black;
  top: 50%;
  /* left: 50%; */
  margin-top: -155px;
  /* margin-left: -150px; */
}

.form {
  display : inline-block;
  width : 300px;
}

.loginbutton {
  width: 300px;
  height: 50px;
  font-size: 34;
  font-family: Nanumsquare;
  font-weight: 700;
  display: inline-block;
}
</style>
