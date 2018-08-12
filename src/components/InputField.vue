<template>
  <div class="inputField">
    <form @submit.prevent class="formWrapper">
      <input class="textbox" :class="small && 'smallTextBox'" @keyup.enter="reviewSubmit" v-model="input" :placeholder="placeholderText">
      <button class="button" :class="small && 'smallButton'" type="submit" @click="reviewSubmit">{{$t('작성')}}</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["small", "content", "onClick", "placeholderText"],
  data() {
    return {
      input: ""
    };
  },
  created() {
    this.input = this.content;
  },
  methods: {
    reviewSubmit() {
      this.$emit("update:content", this.input);
      this.input = "";
      this.onClick();
    }
  }
};
</script>

<style scoped lang='scss'>
.inputField {
  width: 100%;
  .formWrapper {
    align-items: center;
    display: flex;
    .textbox {
      background: white;
      border: none;
      color: rgba(0, 0, 0, 0.87);
      font-size: $h2-font-size;
      height: 45px;
      outline: none;
      padding-left: 15px;
      resize: none;
      text-align: left;
      flex: 1;
      border-radius: 1px;
      &[placeholder]:empty:before {
        content: attr(placeholder);
        color: rgb(172, 172, 172);
      }
      &[placeholder]:empty:focus:before {
        content: "";
      }
      @include breakPoint("phone") {
        height: 30px;
        font-size: $small-font-size;
        padding-left: 10px;
      }
    }
    .smallTextBox {
      height: 35px;
      font-size: $normal-font-size;
    }
    .button {
      align-items: center;
      border: 3px solid white;
      cursor: pointer;
      display: flex;
      height: 45px;
      font-size: $h2-font-size;
      justify-content: center;
      margin-left: 10px;
      padding: 0 1em;
      color: white;
      font-weight: bold;
      @include breakPoint("phone") {
        height: 30px;
        font-size: $small-font-size;
        font-weight: $normal-font-weight;
        padding: 0 4px;
        border: 2px solid white;
      }
    }
    .smallButton {
      height: 35px;
      font-size: $normal-font-size;
      border: 2px solid white;
      padding: 0.125em 0.5em;
    }
  }
}
</style>
