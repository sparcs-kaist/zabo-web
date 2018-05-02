<template>
  <div class="infoScreen">
    <div class="description">
      <p v-if="!seeMore">
        {{ shortenedInfo }} <span class="more" @click="seeMore = true">더 보기</span>
      </p>
      <p v-else>{{ info }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nunc vestibulum nisl id urna mattis dignissim.
        Mauris molestie tellus aliquet ante cursus convallis.
        Nam vestibulum leo nisl, consectetur auctor sapien iaculis non.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
        posuere cubilia Curae; Nullam pellentesque neque id augue consectetur,
        eu gravida velit sollicitudin.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nunc vestibulum nisl id urna mattis dignissim.
        Mauris molestie tellus aliquet ante cursus convallis.
        Nam vestibulum leo nisl, consectetur auctor sapien iaculis non.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
        posuere cubilia Curae; Nullam pellentesque neque id augue consectetur,
        eu gravida velit sollicitudin.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nunc vestibulum nisl id urna mattis dignissim.
        Mauris molestie tellus aliquet ante cursus convallis.
        Nam vestibulum leo nisl, consectetur auctor sapien iaculis non.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
        posuere cubilia Curae; Nullam pellentesque neque id augue consectetur,
        eu gravida velit sollicitudin.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nunc vestibulum nisl id urna mattis dignissim.
        Mauris molestie tellus aliquet ante cursus convallis.
        Nam vestibulum leo nisl, consectetur auctor sapien iaculis non.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
        posuere cubilia Curae; Nullam pellentesque neque id augue consectetur,
        eu gravida velit sollicitudin.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nunc vestibulum nisl id urna mattis dignissim.
        Mauris molestie tellus aliquet ante cursus convallis.
        Nam vestibulum leo nisl, consectetur auctor sapien iaculis non.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
        posuere cubilia Curae; Nullam pellentesque neque id augue consectetur,
        eu gravida velit sollicitudin.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nunc vestibulum nisl id urna mattis dignissim.
        Mauris molestie tellus aliquet ante cursus convallis.
        Nam vestibulum leo nisl, consectetur auctor sapien iaculis non.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
        posuere cubilia Curae; Nullam pellentesque neque id augue consectetur,
        eu gravida velit sollicitudin.`,
      seeMore: false,
    };
  },
  computed: {
    shortenedInfo() {
      return `${this.info.substring(0, 1000)}...`;
    },
  },
};
</script>

<style scoped>
.description {
  color: #FFF;
  font-size: 0.9em;
  text-align: left;
}
.infoScreen {
  height: 100%;
  width: 80%;
}
.more {
  color: rgb(140, 140, 140);
  cursor: pointer;
}
</style>
