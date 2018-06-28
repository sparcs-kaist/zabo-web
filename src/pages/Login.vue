<template lang=''>
  <div>
    <form id="loginForm" mehtod="get" @submit.prevent="login">
      <input type="text" v-model="email" />
      <input type="password" v-model="password" />
    </form>
    <button type="submit" form="loginForm" value="Submit">Submit</button>
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
          return console.log(response.data);
        })
        .then(this.$store.dispatch("getMyInfo"))
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
        .catch(err => console.log(err));
    }
  }
};
</script>
<style lang=''>
</style>
