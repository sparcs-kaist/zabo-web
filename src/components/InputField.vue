<template>
  <div class="inputField">
    <div class="form">
      <textarea class="textbox" v-model="input" :placeholder="placeholderText">
      </textarea>
      <!-- <editable-text
          :content="newComment"
          @update="updateComment"
        >
        </editable-text> -->
      <span class="button" @click="onButtonClick">작성</span>
    </div>
  </div>
</template>

<script>
import EditableText from './EditableText';

export default {
  components: {
    EditableText,
  },
  props: ['content', 'onClick', 'placeholderText'],
  data() {
    return {
      input: '',
    };
  },
  methods: {
    onButtonClick() {
      this.$emit('update:content', this.input);
      this.input = '';
      this.onClick();
    },
  },
};
</script>

<style scoped>
.button {
  align-items: center;
  border: 3px solid white;
  cursor: pointer;
  display: flex;
  height: 2em;
  justify-content: center;
  margin-left: 10px;
  width: 40px;
}
.form {
  align-items: center;
  display: flex;
}
.textbox {
  background: transparent;
  border: 0;
  border-bottom: 3px solid white;
  color: white;
  font-size: 1em;
  height: 1em;
  outline: none;
  padding: 5px;
  resize: none;
  text-align: left;
  width: 100%;
}
.textbox[placeholder]:empty:before {
  content: attr(placeholder);
  color: rgb(172, 172, 172);
}
.textbox[placeholder]:empty:focus:before {
  content: "";
}
</style>
