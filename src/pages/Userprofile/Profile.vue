<template lang=''>
<v-app id="template">
  <div class = "whole">
    <v-btn :disabled="!valid" @click = "edittoggle" :flat="true" :outline="true" :loading = "loading" :color = "color" class="submit" >
      {{ edit }}
    </v-btn><br/>
    <p v-if = "edit === '편집'">
      {{ phone }}
      <br>
      {{ nick_name }}
      <br>
    </p>
      {{ email }}
    <v-form v-model = "valid" v-if = "edit === '저장'">
      <v-text-field
      label = "전화번호"
      v-model = "new_phone"
      class = "textform">
      </v-text-field>
      <v-text-field
      label = "닉네임"
      v-model = "new_nick_name"
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
      edit: "편집",
      new_first_name: "",
      new_last_name: "",
      new_nick_name: "",
      new_phone: ""
    };
  },
  created() {
    this.new_nick_name = this.nick_name;
    this.new_phone = this.phone;
  },
  computed: {
    loading() {
      return !this.$store.getters.isAjaxfinished;
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
    nick_name() {
      return this.$store.getters.getNickName;
    },
    email() {
      return this.$store.getters.getEmail;
    },
    color() {
      return this.edit === "편집" ? "gray" : "green";
    }
  },
  methods: {
    async edittoggle() {
      if (this.edit === "편집") {
        this.$emit("editmode");
        this.edit = "저장";
      } else if (this.edit === "저장") {
        var payload = [
          this.first,
          this.last,
          this.new_nick_name,
          this.new_phone
        ];
        this.$store.dispatch("setMyInfo", payload);
        this.$emit("editmode");
        this.edit = "편집";
      }
    }
  }
};
</script>
<style lang='' scoped>
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

.submit {
  font-family: Nanumsquare;
  font-weight: 700;
  font-size: 12pt;
  width: 110px;
  height: 40px;
}
</style>
