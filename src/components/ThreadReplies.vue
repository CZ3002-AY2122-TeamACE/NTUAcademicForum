<template>
  <div class="ui container">
<!--    <span>-->
<!--          {{ this.$route.params.id }}-->
<!--      </span>-->
    <div class="ui segment">
      <h2 class="ui header">{{thread.title}}</h2>
      <div class="ui horizontal link list">
        <div class="item">
          <a class="ui right aligned avatar image">
            <img src="../assets/default profile.jpeg">
          </a>
        </div>
        <div class="item">
          <div class="content"><a href="#" class="header">Tom</a></div>
        </div>
        <div class="item">
          <i class="calendar icon"></i>2021-2-20
        </div>
      </div>
      <div class="markdown-body" v-html="thread.content">{{ thread.content }}</div>
    </div>
    <div class="alert alert-danger" v-if="this.errors.length > 0">
      <ul>
        <li v-for="(error, index) in this.errors" :key="index">{{ error }}</li>
      </ul>
    </div>

    <div class="ui horizontal left aligned link list">
      <!-- Using modifiers -->
<!--      <b-button v-b-toggle.collapse-2 class="m-1">Toggle Collapse</b-button>-->

      <!-- Using value -->
      <b-button v-b-toggle="'collapse-2'" class="m-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text-fill" viewBox="0 0 16 16">
          <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
        </svg>    Reply</b-button>
      <b-button class="m-1" v-on:click="heart">
        <svg v-if="isHeart==0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
        </svg>
        <svg v-if="isHeart==1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
        </svg>
        Like
      </b-button>
      <b-button class="m-1" v-on:click="collect">
        <svg v-if="isCollect==0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
        <svg v-if="isCollect==1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="yellow" class="bi bi-star-fill" viewBox="0 0 16 16">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
        Favourite
      </b-button>


      <!-- Element to collapse -->
      <b-collapse id="collapse-2">
<!--        <b-card>I am collapsible content!</b-card>-->
        <post-editor></post-editor>
        <b-button v-b-toggle="'collapse-2'" class="m-1" v-on:click="postReply">Submit</b-button>
      </b-collapse>
    </div>
    <h4 class="ui horizontal divider header">
      <i class="tag icon"></i>
      Reply
    </h4>
    <div class="ui segment">
      <div class="ui middle aligned divided list">
        <reply v-for = "(value,key,index) in replies" :key="index" :reply="value" :id ="key"/>
<!--        <reply v-for = "reply in replies" :key= :reply=reply/>-->
      </div>
    </div>
  </div>
</template>

<script>
import Reply from "@/components/Reply";
import PostEditor from "@/components/PostEditor";
import store from "../Store";
import main from "../main";
export default {
  name: "ThreadReplies",
  components:{
    Reply,
    PostEditor,
  },
  data() {
    return {
      errors: [],
      isHeart: 0,
      isCollect: 0
    }
  },
  watch: {
    $route: {
      handler() {
        store.commit('setKey',this.$route.params.id)
        store.dispatch("getThreadInfo", {route: this.$route})
        store.dispatch("getThreadReplies")
      }
    }
  },
  computed: {
    thread() {
      return this.$store.state.currentThread
    },
    replies(){
      return this.$store.state.currentThreadReplies
    }
  },
  mounted() {
    setTimeout(
        () => {
          if(store.state.currentUser.status == 1) {
            store.commit('setKey',this.$route.params.id)
            this.$store.dispatch("getThreadInfo"),{route: this.$route}
            store.dispatch("getThreadReplies")
          }
        },
        1000
    )

  },
  methods: {

    postReply: function() {
      var replyTo = null;
      this.errors = [];
      if(this.$store.state.thread.content== "") {
        this.errors.push('Reply content is empty');
      }
      if(this.errors.length > 0) {
        return false;
      }
      main.addReply(this.$store.state.key, this.$store.state.thread.content, this.$store.state.currentUser.id, replyTo, this.$store.state.currentUser.name);

    },

    heart: function() {
      if(this.isHeart==0){
        this.isHeart=1
      }else{
        this.isHeart=0
      }
    },

    collect: function() {
      if(this.isCollect==0){
        this.isCollect=1
      }else{
        this.isCollect=0
      }
    }

  },
}
</script>

<style scoped>

</style>