<template lang=''>
  <div id="background_div">
    <div id="loginbox">
      <v-app id="vform">
        <img src="@/logo.svg" id="logo">
        <v-form method="get" @submit.prevent="login">
          <v-text-field
          label = "E-mail"
          v-model = "email"
          class = "form"/>
          <v-text-field
          label = "Password"
          v-model = "password"
          type = "password"
          class = "form"/>
          <v-btn type="submit" depressed :loading="loading" color="indigo darken-3" id="login_button">로그인</v-btn>
        </v-form>
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
      password: ""
    };
  },
  methods: {
    login: function() {
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
          console.log("Wrong Email/password.");
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
              console.log("hey");
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
  box-shadow: 0px 15px 65px #424242;
}

#vform {
  width: 300px;
  height: 200px;
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

/* .form {
  width: 290px;
} */

#login_button {
  width: 300px;
  height: 50px;
  margin-left: 0px;
  font-size: 13pt;
  font-family: Nanumsquare;
  font-weight: 700;
  color: white;
}
</style>
