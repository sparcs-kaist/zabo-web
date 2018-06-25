<template>
  <div class="column">
    <div class="user-profile">
      프로필
    </div>
    <img v-bind:src = "imagesrc" class = "profile-image">
    <p> {{ name }} </p>
    <p> {{ data }} </p>
 </div>
</template>

<script>
export default {
  name : "userprofile",
  data () {
    return {
      name : "",
      imagesrc : "",
      data : ""
    }
  },
  created: function () {
    this.$http({
      method: 'get',
      url: 'http://localhost:8000/users/1',
      auth: {
        username : 'thinkratomos@gmail.com',
        password : 'Michael5'
      }
    })
    .then((result)=>{
      this.name = result.data.first_name + " " + result.data.last_name;
      this.imagesrc = result.data.profile_image;
      this.data = result.data;
    })
  }
}
</script>

<style>
  .column {
    width : 70%;
    height : 1000px;
    margin-left : 15%;
    margin-top:90px;
  }

  .user-profile {
    width : 100px;
    height : 20px;
    text-align: left;
    font-size: 22pt;
    font-family: Nanumsquare;
    font-weight: 800;
  }

  .profile-image {
    height : 100px;
    width : 100px;
    border-radius: 100px;
  }
</style>
