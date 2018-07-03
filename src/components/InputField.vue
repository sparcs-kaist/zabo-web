<template>
  <div class="inputField">
    <form class="formWrapper">
      <input class="textbox" v-model="input" :placeholder="placeholderText">
      <span class="button" @click="onButtonClick">작성</span>
    </form>
    <editable-text :content="newComment" @update="updateComment">
    </editable-text>
  </div>
</template>

<script>
import EditableText from './EditableText';

export default {
  components: {
    EditableText,
  },
  props: ['content', 'onClick', 'placeholderText'],
  data () {
    return {
      input: '',
    };
  },
  methods: {
    onButtonClick () {
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
}
.textbox[placeholder]:empty:before {
  content: attr(placeholder);
  color: rgb(172, 172, 172);
}
.textbox[placeholder]:empty:focus:before {
  content: "";
}
</style>
