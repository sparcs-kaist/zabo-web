<template lang=''>
<div>
  bullshit
</div>
</template>
<script>
import axios from "@/axios-auth";

export default {
  created() {
    console.log("hey!!");
    axios({
      url: "/api-token-auth/",
      method: "post",
      data: {
        email: this.$route.params.email,
        password: this.$route.params.email
      }
    }).then(res => {
      localStorage.setItem("token", res.data.token);
      window.location = "http://localhost:8080/";
    });
  }
};
</script>
<style lang=''>
</style>
