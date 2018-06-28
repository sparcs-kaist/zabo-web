<template lang=''>
<v-app id="template">
  <div class = "whole">
    <v-btn :disabled="!valid" @click = "edittoggle"  color = "indigo darken-4" style="font-family:Nanumsquare; width : 130px; color:white" :loading="loading2">
      {{edit}}
    </v-btn><br/>
    <p v-if = "edit === '프로필 편집'">
      {{ phone }}
    </p>
    <v-form v-model = "valid" v-if = "edit === '확인'">
      <v-text-field
      label = "전화번호"
      v-model = "new_phone"
      class = "textform">
      </v-text-field>
    </v-form>
  </div>
</v-app>
</template>
<script>
export default {
  name: 'Profile',
  props: ['valid'],
  data() {
    return {
      edit: '프로필 편집',
      new_first_name: '',
      new_last_name: '',
      new_phone: '',
    };
  },
  created() {
    this.new_phone = this.phone;
  },
  computed: {
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
      if (this.edit === '프로필 편집') {
        this.$emit('editmode');
        this.edit = '확인';
      } else if (this.edit === '확인') {
        this.$emit('editmode');
        this.name = this.$store.getters.getName;
        this.edit = '프로필 편집';
      }
    },
  },
};
</script>
<style lang=''>
#template {
  background-color: white;
}

.whole {
  width: 100%;
  height: 1000px;
  text-align: center;
}

.button {
  display: inline;
}

.textform {
  width: 300px;
}
</style>
