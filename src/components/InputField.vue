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
  props: ['small', 'content', 'onClick', 'placeholderText'],
  data () {
    return {
      input: '',
    };
  },
  created () {
    this.input = this.content;
  },
  methods: {
    reviewSubmit () {
      this.$emit('update:content', this.input);
      this.input = '';
      this.onClick();
    },
  },
};
</script>

<style scoped>
.inputField {
  width: 100%;
  max-width: 629px;
}
.button {
  align-items: center;
  border: 3px solid white;
  cursor: pointer;
  display: flex;
  height: 2.8em;
  font-size: 1em;
  justify-content: center;
  margin-left: 10px;
  padding: 0 1em;
  font-size: 1em;
  color: white;
  font-weight: bold;
}
.formWrapper {
  align-items: center;
  display: flex;
}
.textbox {
  background: white;
  border: none;
  color: rgba(0, 0, 0, 0.87);
  font-size: 1em;
  height: 2.8em;
  outline: none;
  padding-left: 15px;
  resize: none;
  text-align: left;
  flex: 1;
  border-radius: 1px;
}
.textbox[placeholder]:empty:before {
  content: attr(placeholder);
  color: rgb(172, 172, 172);
}
.textbox[placeholder]:empty:focus:before {
  content: "";
}
.smallTextBox {
  height: 2em;
  font-size: 0.875em;
}
.smallButton {
  height: 2em;
  font-size: 0.875em;
  border: 2px solid white;
  padding: 0.125em 0.5em;
}
</style>
