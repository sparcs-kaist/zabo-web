<template>
  <div class="sandbox">
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
  name: "Header"
};
</script>

<style>
.sandbox {
  width: 100%;
  height: 78px;
  position: fixed;
  background-color: white;
}

.topline {
  width: 100%;
  height: 5px;
  background-color: #12397d;
}
.Buttons {
  text-align: left;
  width: 100%;
  height: 100px;
}

.button {
  float: left;
  font-size: 15pt;
  font-family: Nanumsquare;
  font-weight: 400;
  margin-top: 28px;
  margin-left: 27px;
  color: black;
  opacity: 0.7;
}
.button:hover {
  opacity: 1;
}

.logo {
  float: left;
  height: 37px;
  margin-top: 18px;
  margin-left: 27px;
}
</style>