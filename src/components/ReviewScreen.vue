<template>
  <div class="reviewScreen">
    <comment-box
      v-for="(c, index) in comments"
      :author="c.author"
      :content="c.content"
      :depth="0"
      :replies.sync="c.replies"
      :key="index"
    >
    </comment-box>
  </div>
</template>

<script>
import EditableText from './EditableText';
import CommentBox from './CommentBox';

export default {
  props: ['comments'],
  components: {
    CommentBox,
    EditableText,
  },
};
</script>

<style scoped>
.reviewScreen {
  color: white;
  display: flex;
  flex-direction: column;
}
</style>
