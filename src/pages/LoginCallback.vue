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
      localStorage.setItem("token", "ZABO " + this.$route.params.token);
      window.location.reload();
    }
  }
};
</script>
<style lang=''>
</style>