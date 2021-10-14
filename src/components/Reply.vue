<template>
  <div class="item">
    <div class="ui comments">

      <div class="ui container">
        <div class="comment">
          <a class="avatar">
            <img src="../assets/default profile.jpeg">
          </a>
          <div class="content">
            <a class="author">{{reply.username}}</a>
            <i class="calendar icon"></i>{{reply.created_at}}
            <div class="markdown-body" v-html="reply.content">{{ reply.content }}</div>
            <div class="actions">
              <a type="button" ><i class="thumbs up outline icon"></i></a>
              <a type="button" aria-label="Close"><i class="thumbs down outline icon"></i></a>
              <a v-b-toggle="id" type="button" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" fill="currentColor" class="bi bi-chat-left-text-fill" viewBox="0 0 16 16">
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
                </svg></a>
              <b-collapse :id="id">
                <!--        <b-card>I am collapsible content!</b-card>-->
                <post-editor></post-editor>
                <b-button v-b-toggle="id" class="m-1" v-on:click="postReply">Submit</b-button>
              </b-collapse>
            </div>
          </div>

          <!--<div class="content display-reply">
            <a>show 3 replies<i class="angle down icon"></i></a>
          </div>-->
        </div>
    </div>

    </div>
  </div>
</template>
<script>
import PostEditor from "@/components/PostEditor";
import main from "../main";
export default {

name: "Reply",
  props:['reply','id'],
  components:{
    PostEditor,
  },
  data(){
    return{
      showReply:false,
      error: [],
    }
  },
  methods: {

    postReply: function() {
      var replyTo = this.id;
      this.errors = [];
      if(this.$store.state.thread.content== "") {
        this.errors.push('Reply content is empty');
      }
      if(this.errors.length > 0) {
        return false;
      }
      main.addReply(this.$store.state.key, this.$store.state.thread.content, this.$store.state.currentUser.id,replyTo,this.$store.state.currentUser.name);
    }},
}
</script>

<style scoped>

.display-reply {
  margin-top: 5px;
}
</style>