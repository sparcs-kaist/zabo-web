<template lang=''>
<div id="searchBar">
  <input type="text" class="searchInput" @keyup.enter="onEnter" v-model="computedSearchValue"></input>
  <v-icon @click="onEnter" class="searchIcon">search</v-icon>
</div>
</template>
<script>
export default {
  props: {
    'searchValue': String
  },
  data () {
    return {
      computedSearchValue: this.searchValue
    }
  },
  methods: {
    onEnter () {
      this.$emit('submitValue', this.computedSearchValue)
      this.computedSearchValue = ""
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
