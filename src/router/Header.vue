<template>
  <div>
    <div class="Buttons">
      <router-link to="/"> Home </router-link>
      <router-link to="/zabo"> Zabo </router-link>
      <router-link to="/zabo/list"> List </router-link>
      <router-link to="/zabo/user_profile"> Profile </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name : "Header"
}
</script>

<style>
  .Buttons {
    text-align: left;
    font-size: 30pt;
    background-color:rgb(168, 186, 233);
    width : 100%;
    height : 100px;
  }
</style>

