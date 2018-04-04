<template>
  <div class="main">
    <div class="description">
      <p class="heading">Event name</p>
      <p class="subheading">Date</p>
      <p class="subheading">Organization</p>
      <p v-if="!seeMore">
        {{ shortenedInfo }} <span class="more" @click="seeMore = true">더 보기</span>
      </p>
      <p v-else>{{ info }}</p>
    </div>
    <img class="image" src="http://via.placeholder.com/340x500" height="450" width="300"/>
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
      return `${this.info.substring(0, 100)}...`;
    },
  },
};
</script>

<style scoped>
.description {
  color: #FFF;
  display: flex;
  flex-direction: column;
  font-size: 0.9em;
  justify-content: center;
  overflow: scroll;
  padding: 30px;
  text-align: left;
  width: 50%;
}
.heading {
  font-size: 2em;
  font-weight: bold;
  letter-spacing: 0.01em;
  margin: 0;
}
.image {
  display: block;
  margin: 50px 50px 50px 0;
}
.main {
  display: flex;
}
.more {
  color: rgb(140, 140, 140);
  cursor: pointer;
}
.subheading {
  font-weight: bold;
  margin: 0;
}
</style>
