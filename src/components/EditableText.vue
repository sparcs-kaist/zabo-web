<template>
  <div class="textbox" contenteditable="true" @input="$emit('update:content', $event.target.innerText)" placeholder="리뷰를 입력하세요...">
  </div>
</template>

<script>
export default {
  props: ['content'],
  methods: {
    emitChange(e) {
      this.$emit('update', e.target.innerText);
    },
  },
  mounted() {
    this.$el.innerText = this.content;
  },
  watch: {
    content() {
      this.$el.innerText = this.content;
    },
  },
};
</script>

<style scoped>
.textbox {
  border-bottom: 3px solid white;
  outline: none;
  padding: 5px;
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
