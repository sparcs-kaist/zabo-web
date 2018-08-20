<template lang=''>
<div>
  Logging In...
</div>
</template>
<script>
import axios from "@/axios-auth";

export default {
  created() {
    sessionStorage.setItem("token", "ZABO " + this.$route.params.token);
    window.location.reload();
  }
};
</script>
<style lang=''>
</style>
