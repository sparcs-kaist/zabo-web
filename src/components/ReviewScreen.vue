<template>
  <div class="reviewScreen">
    <div class="form">
      <textarea class="textbox" v-model="newComment" placeholder="리뷰를 입력하세요..."></textarea>
      <!-- <editable-text
        :content="newComment"
        @update="updateComment"
      >
      </editable-text> -->
      <span class="button" @click="onClick">작성</span>
    </div>
    <comment-box
      v-for="(c, index) in comments"
      :content="c.content"
      :depth="0"
      :replies.sync="c.replies"
      :user="c.user"
      :key="index"
    >
    </comment-box>
  </div>
</template>

<script>
import EditableText from './EditableText';
import CommentBox from './CommentBox';

export default {
  components: {
    CommentBox,
    EditableText,
  },
  data() {
    return {
      comments: [
        {
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nunc vestibulum nisl id urna mattis dignissim.
            Mauris molestie tellus aliquet ante cursus convallis.`,
          replies: [
            {
              content: "I'm a reply!",
              user: '홍길동2',
            },
            {
              content: "I'm a reply too!",
              user: '홍길동2',
            },
          ],
          user: '홍길동',
        },
        {
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nunc vestibulum nisl id urna mattis dignissim.
            Mauris molestie tellus aliquet ante cursus convallis.`,
          replies: [
            {
              content: "I'm a reply!!",
              user: '홍길동2',
            },
            {
              content: "I'm a reply too!!",
              user: '홍길동2',
            },
          ],
          user: '홍길동',
        },
      ],
      newComment: '',
    };
  },
  methods: {
    onClick() {
      this.comments.push({
        content: this.newComment,
        replies: [],
        user: '홍길동',
      });
      this.newComment = '';
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
.reviewScreen {
  color: white;
  display: flex;
  flex-direction: column;
}
</style>
