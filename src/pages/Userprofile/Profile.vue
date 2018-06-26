<template lang=''>
  <div id="whole">
    {{ email }}<br/>
    {{ joined_date }}<br/>
    {{ phone }}
  </div>
</template>
<script>
export default {
  name: "Profile",
  computed: {
    email: function() {
      return this.$store.getters.getEmail;
    },
    joined_date() {
      return this.$store.getters.getJoinedDate;
    },
    phone() {
      return this.$store.getters.getPhonenumber;
    }
  }
};
</script>
<style lang=''>
#whole {
  width: 100%;
  height: 1000px;
  background-color: aquamarine;
}
</style>
