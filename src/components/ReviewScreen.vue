<template>
  <div class="review-screen">
    <div class="description">
      <p class="heading">Event name</p>
      <p class="subheading">Date</p>
      <p class="subheading">Organization</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: [],
    };
  },
  methods: {
    fetchComments() {

    },
  },
};
</script>

<style scoped>
.description {
  color: #fff;
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
.review-screen {
  display: flex;
}
.subheading {
  font-weight: bold;
  margin: 0;
}
</style>
