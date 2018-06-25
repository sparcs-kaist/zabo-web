<template>
  <div>
    <div class="topline"></div>
    <div class="Buttons">
      <router-link to="/">
        <img src="@/logo.svg" class= "logo">
      </router-link>
      <router-link to="/zabo">
        <div class="button">
          Zabo
        </div>
      </router-link>
      <router-link to="/zabo/list">
        <div class="button">
          List
        </div>
      </router-link>
      <router-link to="/zabo/user_profile">
        <div class = "button">
          Profile
        </div>
      </router-link>
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
    width : 100%;
    height : 100px;
  }

  .button {
    float : left;
    font-size: 15pt;
    font-family: Nanumsquare;
    font-weight: 600;
    margin-top: 28px;
    margin-left: 27px;
    color:black;
  }

  .button:active {

  }

  .logo {
    float : left;
    height : 37px;
    margin-top : 18px;
    margin-left : 27px;
  }
</style>

