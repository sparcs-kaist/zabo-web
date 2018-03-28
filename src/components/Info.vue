<template>
  <div style="color: red">
    <p>Event name</p>
    <p>Date</p>
    <p>Organization</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Nunc vestibulum nisl id urna mattis dignissim.
      Mauris molestie tellus aliquet ante cursus convallis.
      Nam vestibulum leo nisl, consectetur auctor sapien iaculis non.
      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
      posuere cubilia Curae; Nullam pellentesque neque id augue consectetur,
      eu gravida velit sollicitudin.</p>
  </div>
</template>

<script>
export default {
  props: ['name'],
};
</script>

<style scoped>
.tab {
  color: rgb(220, 220, 220);
  cursor: pointer;
  margin: 8px 0 8px 0;
}
</style>
