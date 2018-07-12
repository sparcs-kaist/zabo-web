<template lang=''>
<v-app id="template">
  <div class = "whole">
    <div style="display: flex">
      <v-btn :disabled="!valid" @click = "edittoggle" depressed :loading = "loading" :color = "color" class="submit_button">
        {{ edit }}
      </v-btn>
      <v-btn v-if = "edit === '저장'" depressed @click = "cancelation" color="red" class="cancel_button">
        취소
      </v-btn>
    </div>
    <p v-if = "edit === '편집'">
      {{ phone }}
      <br>
      {{ nick_name }}
      <br>
      {{ gender }}
    </p>
    <v-layout style="width: 100%; max-width: 900px" row wrap v-if = "edit === '저장'"> 
      <v-flex xs6>
        <v-form v-model = "valid">
          <v-text-field label = "전화번호" v-model = "new_phone" style="width: 90%;">
          </v-text-field>
          <v-text-field label = "닉네임" v-model = "new_nick_name" style="width: 90%;">
          </v-text-field>
          <v-select :items="genders" v-model="dropdown_selected_gender" label="성별" style="width: 90%;" outline></v-select>
        </v-form>
      </v-flex>
      <v-flex xs6>
        오른쪽
      </v-flex>
    </v-layout>
    {{ email }}
  </div>
</v-app>
</template>
<script>
export default {
  name: "Profile",
  props: ["valid", "first", "last", "image"],
  data() {
    return {
      edit: "편집",
      new_first_name: "",
      new_last_name: "",
      new_nick_name: "",
      new_phone: "",
      genders: ["남성", "여성", "기타", "비공개"],
      dropdown_selected_gender: ""
    };
  },
  created() {
    this.new_nick_name = this.nick_name;
    this.new_phone = this.phone;
    this.dropdown_selected_gender = this.gender;
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
    gender() {
      if (this.$store.getters.getGender == "M") {
        return "남성";
      } else if (this.$store.getters.getGender == "F") {
        return "여성";
      } else if (this.$store.getters.getGender == "B") {
        return "비공개";
      } else if (this.$store.getters.getGender == "E") {
        return "기타";
      }
    },
    selected_gender() {
      if (this.dropdown_selected_gender == "남성") {
        return "M";
      } else if (this.dropdown_selected_gender == "여성") {
        return "F";
      } else if (this.dropdown_selected_gender == "비공개") {
        return "B";
      } else if (this.dropdown_selected_gender == "기타") {
        return "E";
      }
    },
    color() {
      return this.edit === "편집" ? "primary" : "green";
    }
  },
  methods: {
    cancelation() {
      this.new_nick_name = this.nick_name;
      this.new_phone = this.phone;
      this.dropdown_selected_gender = this.gender;
      this.$emit("cancel");
      this.edit = "편집";
    },
    edittoggle() {
      if (this.edit === "편집") {
        this.$emit("editmode");
        this.edit = "저장";
      } else if (this.edit === "저장") {
        if (this.image == null) {
          var payload = [
            this.first,
            this.last,
            this.new_nick_name,
            this.new_phone,
            this.selected_gender
          ];
          this.$store.dispatch("setMyInfo", payload);
          this.$emit("editmode");
          this.edit = "편집";
        } else {
          var payload = [
            this.first,
            this.last,
            this.new_nick_name,
            this.new_phone,
            this.selected_gender,
            this.image
          ];
          this.$store.dispatch("setMyInfo", payload);
          this.$emit("editmode");
          this.edit = "편집";
        }
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
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
}

.submit_button {
  font-family: Nanumsquare;
  font-weight: 700;
  font-size: 12pt;
  width: 130px;
  height: 40px;
  color: white;
}

.cancel_button {
  float: left;
  font-family: Nanumsquare;
  font-weight: 700;
  font-size: 12pt;
  height: 40px;
  color: white;
  margin-left: -3px;
}
</style>
