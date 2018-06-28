<template lang=''>
<v-app id="template">
  <div class = "whole">
    <v-btn :disabled="!valid" @click = "edittoggle" :flat="true" :color = "color" style="font-family:Nanumsquare; font-weight:700; width : 130px;" >
      {{edit}}
    </v-btn><br/>
    <p v-if = "edit === '프로필 편집'">
      {{ phone }}
    </p>
    <v-form v-model = "valid" v-if = "edit === '저장'">
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
  name: "Profile",
  props: ["valid", "first", "last"],
  data() {
    return {
      edit: "프로필 편집",
      new_first_name: "",
      new_last_name: "",
      new_phone: ""
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
    color() {
      return this.edit === "프로필 편집" ? "black" : "red";
    }
  },
  methods: {
    edittoggle() {
      if (this.edit === "프로필 편집") {
        this.$emit("editmode");
        this.edit = "저장";
      } else if (this.edit === "저장") {
        var payload = [
          this.first,
          this.last,
          this.new_phone
        ]
        this.$emit("editmode");
        this.$store.dispatch("setMyInfo", payload);
        this.edit = "프로필 편집";
      }
    }
  }
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
