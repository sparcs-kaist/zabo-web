<template lang=''>
<div>
  Logging In...
</div>
</template>
<script>
import axios from "@/axios-auth";

export default {
  created() {
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
        localStorage.setItem("token", res.data.token);
        window.location.reload();
      });
    }
  }
};
</script>
<style lang=''>
</style>
