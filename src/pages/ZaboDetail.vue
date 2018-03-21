<template>
  <div class="zaboDetail">
    Header Component
    <div class="headerStyle">
      <nav-item name="Info"></nav-item>
      <nav-item name="Review"></nav-item>
      <nav-item name="신청"></nav-item>
    </div>
  </div>
</template>

<script>
import NavItem from '../components/NavItem';

export default {
  components: {
    NavItem,
  },
};
</script>

<style scoped>
.headerStyle {
  display: flex;
  justify-content: space-between;
  margin: 100px;
}
</style>
