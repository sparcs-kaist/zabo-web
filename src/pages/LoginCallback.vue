<template lang=''>
<div>
  Logging In...
</div>
</template>
<script>
import axios from "@/axios-auth";

export default {
  created() {
    console.log(this.$route.params.email);
    if (localStorage.getItem("token")) {
      this.$router.push({ name: "ZaboListDetailAdded" });
    } else {
      axios({
        url: "/api-token-auth/",
        method: "post",
        data: {
          email: this.$route.params.email,
          password: this.$route.params.email
        }
      }).then(res => {
        console.log(res);
        localStorage.setItem("token", "ZABO " + res.data.token);
        window.location.reload();
      });
    }
  }
};
</script>
<style lang=''>
</style>
