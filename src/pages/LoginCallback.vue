<template lang=''>
<div>
  Logging In...
</div>
</template>
<script>
import axios from "@/axios-auth";

export default {
  created() {
    if (sessionStorage.getItem("token")) {
      this.$router.push({ name: "ZaboListDetailAdded" });
    } else {
      sessionStorage.setItem("token", "ZABO " + this.$route.params.token);
      window.location.reload();
    }
  }
};
</script>
<style lang=''>
</style>