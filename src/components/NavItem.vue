<template>
  <p class="tab">{{ name }}</p>
</template>

<script>
export default {
  props: ['name'],
};
</script>

<style scoped>
.tab {
  cursor: pointer;
}
</style>
