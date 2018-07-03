<template lang=''>
<div id="searchBar" :searchValue="searchValue">
  <input type="text" class="searchInput">{{searchValue}}</input>
  <router-link to="/search"><v-icon class="searchIcon">search</v-icon></router-link>
</div>
</template>
<script>
export default {
  data () {
    return {
      searchValue: ""
    }
  }
}
</script>
<style lang=''>
#searchBar {
  min-width: 16em;
  height: 35px;
  border: 2px solid #12397d;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
}
.searchIcon {
  margin-right: 0.25em;
}
.searchInput {
  border: none;
  flex: 1;
  height: 31px;
  text-align: left;
  padding-left: 0.75em;
}
.searchInput:focus {
  outline: none;
}
</style>
