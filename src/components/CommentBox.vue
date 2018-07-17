<template>
  <div class="main">
    <div class="body">
      <img class="pic" :src="author.profile_image">
      <div class="contentWrapper">
        <span class="name">
          {{ author.nickName }}
        </span>
        <span v-if="!editing" class="commentBoxContent">
          {{ content }}
        </span>
        <input-field :small="true" v-if="editing" class="commentInputField" :content.sync="newComment" :on-click="editComment">
        </input-field>
        <div class="commentEditHandler">
          <v-icon class="moreHorizIcon" @click="commentEditHandlerModalState = !commentEditHandlerModalState">more_horiz</v-icon>
          <div class="commentEditHandlerModal" v-show="commentEditHandlerModalState">
            <div @click="deleteComment" class="modalIconWrapper">
              <v-icon color="grey darken-4">delete</v-icon>
              <span>Delete</span>
            </div>
            <div @click="editModal" class="modalIconWrapper">
              <v-icon color="grey darken-4">edit</v-icon>
              <span>Edit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="handlerWrapper">
      <div class="replyHandler" v-show="loggedInState" @click="recommentInputState = !recommentInputState">답글 달기</div>
      <div class="recommentBoxHandler" v-show="recommentBoxState" @click="recommentBoxOpen = !recommentBoxOpen">
        답글 {{recommentBoxLength}}개
        <v-icon v-show="!recommentBoxOpen">arrow_drop_down</v-icon>
        <v-icon v-show="recommentBoxOpen">arrow_drop_up</v-icon>
      </div>
    </div>
    <re-comment-box v-if="recommentBoxOpen" class="recomment-box" v-for="r in replies" :author="r.author" :comment_id="r.id" :content="r.content" :depth="depth + 1" :key="r.id">
    </re-comment-box>
    <input-field v-show="recommentInputState" class="input" :content.sync="newReply" :on-click="onSubmitReply" placeholder-text="댓글을 작성하세요...">
    </input-field>
  </div>
</template>

<script>
import axios from 'axios';
import InputField from './InputField';
import ReCommentBox from './ReCommentBox';

export default {
  components: {
    InputField,
    ReCommentBox
  },
  props: ['id', 'author', 'comment_id', 'content', 'depth', 'replies'],
  name: 'comment-box',
  data () {
    return {
      newReply: '',
      seeMore: false,
      recommentInputState: false,
      recommentBoxOpen: false,
      commentEditHandlerModalState: false,
      newComment: "",
      editing: false
    };
  },
  methods: {
    isLong () {
      return this.content.length > 200;
    },
    onSubmitReply () {
      axios({
        method: 'post',
        url: 'http://localhost:8000/api/recomments/',
        data: {
          content: this.newReply,
          comment: this.comment_id,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem('token')
        }
      })
        .then((response) => {
          console.log('what!')
          console.log(response);
          this.replies.push(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteComment () {
      this.commentEditHandlerModalState = false;
      axios({
        method: 'DELETE',
        url: `http://localhost:8000/api/comments/${this.id}/`,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => console.log(res))
    },
    editComment () {
      this.editing = false;
      axios({
        method: 'PUT',
        url: `http://localhost:8000/api/comments/${this.id}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem('token')
        },
        data: {
          "content": this.newComment,
          "is_private": true,
          "is_deleted": true,
          "is_blocked": true
        }
      }).then(res => console.log(res));
    },
    editModal () {
      this.newComment = this.content;
      this.commentEditHandlerModalState = false;
      this.editing = true;
    }
  },
  computed: {
    shortenedComment () {
      return `${this.content.substring(0, 200)}...`;
    },
    recommentBoxLength () {
      return this.replies.length
    },
    recommentBoxState () {
      return this.recommentBoxLength > 0;
    },
    loggedInState () {
      return this.$store.getters.loggedInState;
    },
    getMyId () {
      if (this.loggedInState) {
        return this.$store.getters.getMyId;
      }
    },
  },
};
</script>

<style scoped>
.body {
  font-size: 1.125em;
  margin-top: 10px;
  text-align: left;
  width: 100%;
  display: flex;
  align-items: flex-start;
}
.header {
  align-items: center;
  display: flex;
  justify-content: flex-start;
}
.input {
  margin-left: 15px;
  padding-left: 15px;
  margin-top: 1em;
}
.contentWrapper {
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin-top: 6px;
  position: relative;
}
.main {
  margin: 20px 0 0 0;
  display: flex;
  flex-direction: column;
}
.more {
  color: rgb(140, 140, 140);
  cursor: pointer;
}
.name {
  color: white;
  font-weight: bold;
  letter-spacing: 0.01em;
  margin-right: 0.5em;
}
.pic {
  border-radius: 50%;
  min-height: 30px;
  max-height: 30px;
  margin-right: 10px;
  min-width: 30px;
  max-width: 30px;
}
.replyHandler {
  cursor: pointer;
  margin-left: 38px;
  margin-top: 0.25em;
  width: 70px;
}
.recommentBoxHandler {
  cursor: pointer;
  margin-left: 0.5em;
  width: 100px;
  display: flex;
  align-items: center;
}
.commentBoxContent {
  width: 100%;
  padding-right: 15px;
}
.handlerWrapper {
  display: flex;
  align-items: center;
}
.commentEditHandler {
  height: 100%;
}
.moreHorizIcon {
  font-size: 1.5em;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
}
.moreHorizIcon:hover {
  color: rgba(255, 255, 255, 1);
}
.commentEditHandlerModal {
  position: absolute;
  right: 0;
  border-radius: 0.125em;
  background-color: white;
  padding: 0.125em 0.25em;
}
.commentEditHandlerModal::after {
  content: "";
  position: absolute;
  top: 0;
  left: 85%;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-bottom-color: white;
  border-top: 0;
  margin-left: -8px;
  margin-top: -8px;
}
.modalIconWrapper {
  color: #212121;
  font-weight: 700;
  cursor: pointer;
}
</style>
