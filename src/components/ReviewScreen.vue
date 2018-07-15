<template>
  <div class="reviewScreen">
    <comment-box v-for="c in comments" :id="c.id" :author="c.author" :comment_id="c.id" :content="c.content" :depth="0" :replies="c.recomments" :key="c.id">
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
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  /* overflow: scroll; */
}
</style>
