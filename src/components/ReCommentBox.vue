<template>
  <div class="main">
    <div class="body" :style="{ paddingLeft: `${(this.depth * 30) + 15}px`}">
      <img class="pic" :src="author.profile_image" v-if="author.profile_image != null">
      <img class="pic" src="../assets/default_person.png" v-else/>
      <span class="name">
        {{ author.nickName }}
      </span>
      <span class="recommentContent" v-if="isLong() && !seeMore && !editing">
        {{ shortenedComment }}
        <span class="more" @click="seeMore = true">더 보기</span>
      </span>
      <input-field :small="true" v-if="editing" :content.sync="newReply" @on-submit="onSubmitReply">
      </input-field>
      <span class="recommentContent" v-else>{{ recomment }}</span>
      <div v-if="loggedInState && currentUser.id == author.id" class="commentEditHandler">
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
import axios from "@/axios-auth";
import InputField from "./InputField";

export default {
  components: {
    InputField
  },
  props: ["author", "commentId", "recommentId", "content", "depth", "replies"],
  name: "re-comment-box",
  data() {
    return {
      newReply: "",
      recomment: "",
      seeMore: false,
      commentEditHandlerModalState: false,
      editing: false
    };
  },
  created() {
    this.recomment = this.content;
  },
  methods: {
    isLong() {
      return this.recomment.length > 200;
    },
    onSubmitReply() {
      this.editing = false;
      axios({
        method: "PUT",
        url: `/api/recomments/${this.recommentId}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
        data: {
          content: this.newReply,
          comment: this.commentId
        }
      }).then(res => {
        if (res.status == 200) {
          this.recomment = this.newReply;
        }
      });
    },
    editModal() {
      this.newReply = this.recomment;
      this.commentEditHandlerModalState = false;
      this.editing = true;
    },
    deleteReply() {
      this.commentEditHandlerModalState = false;
      axios({
        method: "DELETE",
        url: `/api/recomments/${this.recommentId}/`,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
        .then(res => {
          if (res.status == 204) {
            this.$emit("delete", { id: this.recommentId });
          }
        })
        .catch(err => {
          if (err) {
            this.$emit("delete", { id: this.recommentId });
          }
        });
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    shortenedComment() {
      return `${this.recomment.substring(0, 200)}...`;
    },
    loggedInState() {
      return this.$store.getters.loggedInState;
    }
  }
};
</script>

<style scoped lang='scss'>
.header {
  align-items: center;
  display: flex;
  justify-content: flex-start;
}
.input {
  padding-left: 15px;
  @include breakPoint("phone") {
    padding-left: 0;
  }
}
.main {
  margin: 20px 0 0 0;
  @include breakPoint("phone") {
    margin: 10px 0 0 -10px;
  }
  .body {
    font-size: $normal-font-size;
    text-align: left;
    display: flex;
    align-items: center;
    .pic {
      border-radius: 50%;
      background-color: white;
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
    .name {
      color: white;
      font-weight: bold;
      letter-spacing: 0.01em;
    }
    .recommentContent {
      margin-left: 0.5em;
      .more {
        color: rgb(140, 140, 140);
        cursor: pointer;
      }
    }
    .commentEditHandler {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      height: 100%;
      position: relative;
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
        top: 33px;
        right: -2px;
        border-radius: 0.125em;
        background-color: white;
        padding: 0.125em 0.25em;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
        z-index: 300;
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
</style>
