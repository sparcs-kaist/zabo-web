<template lang=''>
<v-app id="template">
  <div id = "whole">
    <button @click = "edittoggle">
      {{ edit }}
    </button><br/>
    <div class = "profile" v-if = "this.edit === '편집'">
      {{ name }}
    </div>
    <v-form v-if = "this.edit === '확인'">
      <v-text-field label = "성" v-model = "new_first_name" required class = "input_form"></v-text-field>
      <v-text-field label = "이름" v-model = "new_last_name" required :value = "new_last_name" class = "input_form"></v-text-field>
    </v-form>
  </div>
</v-app>
</template>
<script>
export default {
  name: 'Profile',
  data() {
    return {
      edit: '편집',
      new_first_name: '',
      new_last_name: '',
    };
  },
  computed: {
    name() {
      return this.$store.getters.getName;
    },
    email() {
      return this.$store.getters.getEmail;
    },
    joined_date() {
      return this.$store.getters.getJoinedDate;
    },
    phone() {
      return this.$store.getters.getPhonenumber;
    },
  },
  methods: {
    edittoggle() {
      if (this.edit === '편집') {
        this.edit = '확인';
      } else if (this.edit === '확인') {
        this.$store.commit('SET_USER_PROFILE', [
          this.new_first_name,
          this.new_last_name,
        ]);
        this.name = this.$store.getters.getName;
        this.edit = '편집';
      }
    },
  },
};
</script>
<style lang=''>
#template {
  background-color: white;
}

#whole {
  width: 100%;
  height: 1000px;
}

.input_form {
  width: 200px;
  display: inline-block;
}
</style>
