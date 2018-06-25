<template>
  <div>
    <div class="topline"></div>
    <div class="Buttons">
      <router-link to="/">
        <img src="@/logo.svg" class= "logo">
      </router-link>
      <router-link to="/zabo" class = "Button"> Zabo </router-link>
      <router-link to="/zabo/list" class = "Button"> List </router-link>
      <router-link to="/zabo/user_profile" class = "Button"> Profile </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name : "Header"
}
</script>

<style>
  .topline {
    width : 100%;
    height : 5px;
    background-color: #12397D; 
  }
  .Buttons {
    text-align: left;
    font-size: 30pt;
    width : 100%;
    height : 100px;
  }

  .Button {

  }

  .logo {
    height : 37px;
    margin-top : 18px;
    margin-left : 18px;
  }
</style>

