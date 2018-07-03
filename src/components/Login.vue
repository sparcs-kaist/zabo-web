<template lang=''>
  <div style="height: 700px">
    <v-app id="whole">
      <div>
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
    </div>
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
    login: function() {
      // var payload = [this.email, this.password];
      // this.$store.dispatch("login", payload).then(() => {
      //   this.$emit("logged-in");
      // });
      this.$store.commit("START_AJAX");
      axios
        .post("http://localhost:8000/api-token-auth/", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          localStorage.setItem("token", `ZABO ${response.data.token}`);
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
#whole {
  width: 300px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  background-color: white;
}

#logo {
  /* display: inline-block; */
  width: 100px;
  height: 50px;
  left: 50%;
  transform: translateX(-50%);
  position: relative;
  margin-left: -10px;
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
