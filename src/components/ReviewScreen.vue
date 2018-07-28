<template>
  <div class="reviewScreen">
    <comment-box @delete="deleteComment" v-for="c in computedComments" :id="c.id" :author="c.author" :comment_id="c.id" :content="c.content" :depth="0" :replies="c.recomments" :key="c.id">
    </comment-box>
  </div>
</template>

<script>
import EditableText from "./EditableText";
import CommentBox from "./CommentBox";

export default {
  props: ["comments"],
  data() {
    return {
      deletedId: []
    };
  },
  components: {
    CommentBox,
    EditableText
  },
  methods: {
    deleteComment(payload) {
      this.deletedId.push(payload.id);
    }
  },
  computed: {
    computedComments() {
      if (this.deletedId.length == 0) {
        return this.comments;
      } else {
        let finalComments = [];
        this.comments.map(comment => {
          if (this.deletedId.indexOf(comment.id) == -1) {
            finalComments.push(comment);
          }
        });
        return finalComments;
      }
    }
  }
};
</script>

<style scoped>
.reviewScreen {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
}
</style>
