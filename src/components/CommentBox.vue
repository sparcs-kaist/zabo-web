<template>
  <div class="main">
    <div class="body">
      <img class="pic" :src="author.profile_image" v-if="author.profile_image != null">
      <img class="pic" src="../assets/default_person.png" v-else/>
      <div class="contentWrapper">
        <span class="name">
          {{ author.nickName }}
        </span>
        <span v-if="!editing" class="commentBoxContent">
          {{ newComment }}
        </span>
        <input-field :small="true" v-if="editing" :content.sync="newComment" @on-submit="editComment">
        </input-field>
        <div v-if="loggedInState && currentUser.id == author.id" class="commentEditHandler">
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
    <re-comment-box @delete="deleteReply" v-if="recommentBoxOpen" v-for="r in computedReplies" :author="r.author" :recommentId="r.id" :commentId="comment_id" :content="r.content" :depth="depth + 1" :key="r.id">
    </re-comment-box>
    <input-field v-show="recommentInputState" class="input" :content.sync="newReply" @on-submit="onSubmitComment" placeholder-text="댓글을 작성하세요...">
    </input-field>
  </div>
</template>

<script>
import axios from "@/axios-auth";
import InputField from "./InputField";
import ReCommentBox from "./ReCommentBox";

export default {
  components: {
    InputField,
    ReCommentBox
  },
  props: ["id", "author", "comment_id", "content", "depth", "replies"],
  name: "comment-box",
  data() {
    return {
      newReply: "",
      seeMore: false,
      recommentInputState: false,
      recommentBoxOpen: false,
      commentEditHandlerModalState: false,
      newComment: "",
      editing: false,
      deletedId: []
    };
  },
  created() {
    console.log(this.comment_id);
  },
  methods: {
    isLong() {
      return this.content.length > 200;
    },
    onSubmitComment() {
      console.log(this.newReply);
      console.log("why the fick!");
      axios({
        method: "post",
        url: "/api/recomments/",
        data: {
          content: this.newReply,
          comment: this.comment_id
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token")
        }
      }).then(response => {
        this.replies.push(response.data);
      });
    },
    deleteComment() {
      this.commentEditHandlerModalState = false;
      axios({
        method: "DELETE",
        url: `/api/comments/${this.id}/`,
        headers: {
          Authorization: sessionStorage.getItem("token")
        }
      })
        .then(res => {
          if (res.status == 204 || res.status == 404) {
            this.$emit("delete", { id: this.id });
          }
        })
        .catch(err => {
          if (err) {
            this.$emit("delete", { id: this.comment_id });
          }
        });
    },
    editComment() {
      this.editing = false;
      axios({
        method: "PUT",
        url: `/api/comments/${this.id}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token")
        },
        data: {
          content: this.newComment,
          is_private: true,
          is_deleted: true,
          is_blocked: true
        }
      });
    },
    editModal() {
      this.commentEditHandlerModalState = false;
      this.editing = true;
    },
    deleteReply(payload) {
      this.deletedId.push(payload.id);
    }
  },
  created() {
    this.newComment = this.content;
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    shortenedComment() {
      return `${this.content.substring(0, 200)}...`;
    },
    recommentBoxLength() {
      return this.computedReplies.length;
    },
    recommentBoxState() {
      return this.recommentBoxLength > 0;
    },
    loggedInState() {
      return this.$store.getters.loggedInState;
    },
    getMyId() {
      if (this.loggedInState) {
        return this.$store.getters.getMyId;
      }
    },
    computedReplies() {
      if (this.deletedId.length == 0) {
        return this.replies;
      } else {
        let finalReplies = [];
        this.replies.map(reply => {
          if (this.deletedId.indexOf(reply.id) == -1) {
            finalReplies.push(reply);
          }
        });
        return finalReplies;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.main {
  margin: 20px 0 0 0;
  @include breakPoint("phone") {
    margin: 10px 0 0 0;
  }
  display: flex;
  flex-direction: column;
  .body {
    font-size: $normal-font-size;
    margin-top: 10px;
    text-align: left;
    width: 100%;
    display: flex;
    align-items: flex-start;
    .pic {
      border-radius: 50%;
      min-height: 30px;
      max-height: 30px;
      margin-right: 10px;
      min-width: 30px;
      max-width: 30px;
    }
    @include breakPoint("phone") {
      font-size: $h2-font-size;
      .pic {
        min-width: 25px;
        max-width: 25px;
        min-height: 25px;
        max-height: 25px;
      }
    }
    .contentWrapper {
      width: 100%;
      display: flex;
      align-items: flex-start;
      margin-top: 6px;
      position: relative;
      .name {
        color: white;
        font-weight: bold;
        letter-spacing: 0.01em;
        margin-right: 0.5em;
      }
      .commentBoxContent {
        width: 100%;
        padding-right: 15px;
      }
      .commentEditHandler {
        height: 100%;
        .moreHorizIcon {
          font-size: 1.5em;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          &:hover {
            color: rgba(255, 255, 255, 1);
          }
        }
        .commentEditHandlerModal {
          position: absolute;
          right: 0;
          border-radius: 0.125em;
          background-color: white;
          padding: 0.125em 0.25em;
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
          &::after {
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
        }
      }
    }
  }
  .handlerWrapper {
    display: flex;
    align-items: center;
    .replyHandler {
      cursor: pointer;
      margin-left: 38px;
      width: 70px;
      @include breakPoint("phone") {
        margin-left: 30px;
      }
    }
    .recommentBoxHandler {
      cursor: pointer;
      padding-left: 0.5em;
      width: 100px;
      display: flex;
      align-items: center;
    }
    @include breakPoint("phone") {
      font-size: $small-font-size;
      font-weight: $normal-font-weight;
      .recommentBoxHandler {
        padding-left: 0px;
      }
    }
  }
  .input {
    padding-left: 30px;
    margin-top: 1em;
  }
}
</style>