<template>
  <div class="main">
    <div class="body" :style="{ paddingLeft: `${(this.depth * 30) + 15}px`}">
      <img :src="author.profile_image" class="pic">
      <span class="name">
        {{ author.nickName }}
      </span>
      <span class="recommentContent" v-if="isLong() && !seeMore && !editing">
        {{ shortenedComment }}
        <span class="more" @click="seeMore = true">더 보기</span>
      </span>
      <input-field :small="true" v-if="editing" class="commentInputField" :content.sync="newReply" :on-click="onSubmitReply">
      </input-field>
      <span class="recommentContent" v-else>{{ content }}</span>
      <div class="commentEditHandler">
        <v-icon class="moreHorizIcon" @click="commentEditHandlerModalState = !commentEditHandlerModalState">more_horiz</v-icon>
        <div class="commentEditHandlerModal" v-show="commentEditHandlerModalState">
          <div @click="deleteReply" class="modalIconWrapper">
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
</template>

<script>
import axios from 'axios';
import InputField from './InputField';

export default {
  components: {
    InputField,
  },
  props: ['author', 'commentId', 'content', 'depth', 'replies'],
  name: 're-comment-box',
  data () {
    return {
      newReply: '',
      seeMore: false,
      commentEditHandlerModalState: false,
      editing: false
    };
  },
  methods: {
    isLong () {
      return this.content.length > 200;
    },
    onSubmitReply () {
      this.editing = false;
      axios({
        method: 'PUT',
        url: `api/comments/${this.commentId}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem('token')
        },
        data: {
          "content": this.newReply,
          "is_private": true,
          "is_deleted": true,
          "is_blocked": true
        }
      })
    },
    editModal () {
      this.commentEditHandlerModalState = false;
      this.editing = true;
    },
    deleteReply () {
      this.commentEditHandlerModalState = false;
      axios({
        method: 'DELETE',
        url: `api/recomments/${this.commentId}/`,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        if (res.status == 204) {
          this.$emit('delete', { id: this.commentId })
        }
      })
    }
  },
  computed: {
    shortenedComment () {
      return `${this.content.substring(0, 200)}...`;
    },
  },
};
</script>

<style scoped>
.body {
  font-size: 1em;
  text-align: left;
  display: flex;
  align-items: center;
}
.header {
  align-items: center;
  display: flex;
  justify-content: flex-start;
}
.input {
  padding-left: 15px;
}
.main {
  margin: 20px 0 0 0;
}
.more {
  color: rgb(140, 140, 140);
  cursor: pointer;
}
.name {
  color: white;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.01em;
}
.pic {
  border-radius: 50%;
  background-color: white;
  min-height: 30px;
  max-height: 30px;
  margin-right: 10px;
  min-width: 30px;
  max-width: 30px;
}
.recommentContent {
  margin-left: 0.5em;
}
.commentEditHandler {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  height: 100%;
  position: relative;
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
  top: 33px;
  right: -2px;
  border-radius: 0.125em;
  background-color: white;
  padding: 0.125em 0.25em;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
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
