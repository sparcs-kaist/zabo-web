<template>
  <div class="reviewScreen">
    <input-field
      :content.sync="newComment"
      :on-click="onSubmitComment"
      placeholder-text="리뷰를 입력하세요..."
    >
    </input-field>
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
import InputField from './InputField';

export default {
  components: {
    CommentBox,
    EditableText,
    InputField,
  },
  data() {
    return {
      comments: [
        {
          author: '홍길동',
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nunc vestibulum nisl id urna mattis dignissim.
            Mauris molestie tellus aliquet ante cursus convallis.`,
          replies: [
            {
              author: '홍길동2',
              content: "I'm a reply!",
            },
            {
              author: '홍길동2',
              content: "I'm a reply too!",
            },
          ],
        },
        {
          author: '홍길동',
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nunc vestibulum nisl id urna mattis dignissim.
            Mauris molestie tellus aliquet ante cursus convallis.`,
          replies: [
            {
              author: '홍길동2',
              content: "I'm a reply!!",
            },
            {
              author: '홍길동2',
              content: "I'm a reply too!!",
            },
          ],
        },
      ],
      newComment: '',
    };
  },
  methods: {
    onSubmitComment() {
      this.comments.push({
        author: '홍길동',
        content: this.newComment,
        replies: [],
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
