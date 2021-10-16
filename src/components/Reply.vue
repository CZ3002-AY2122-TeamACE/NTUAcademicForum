<template>
  <div class="item">
    <div class="ui comments">
      <div class="alert alert-danger" v-if="this.errors.length > 0">
        <ul>
          <li v-for="(error, index) in this.errors" :key="index">{{ error }}</li>
        </ul>
      </div>
      <div class="ui container">
        <div class="comment">
          <a class="avatar">
            <img src="../assets/default profile.jpeg">
          </a>
          <div class="content">
            <a class="author">{{reply.username}}</a>
            <i class="calendar icon"></i>{{reply.created_at}}
            <div class="markdown-body" v-if="upstream != null"> Replying
              <a class="markdown-body" v-html="upstream" v-if="upstream != null"></a>
            </div>

            <div class="markdown-body" v-html="content">{{content}}</div>

            <div class="actions">
              <div style="float:left"><a type="button" v-on:click.once="addlike" ><i class="thumbs up outline icon"></i></a>{{reply.like}}</div>
              <div style="float:left"> &nbsp; </div>
              <div style="float:left"><a type="button" v-on:click.once="adddislike"><i class="thumbs down outline icon"></i></a>{{reply.dislike}}</div>
              <div style="float:left"> &nbsp; </div>
              <div style="float:left"><a v-b-toggle="id" type="button" >

                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" fill="currentColor" class="bi bi-chat-left-text-fill" viewBox="0 0 16 16">
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
                </svg></a></div>
              <div style="clear:both"></div>
              <b-collapse :id="id">
                <post-editor></post-editor>
                <b-button v-b-toggle="id" class="m-1" v-on:click="postReply">Submit</b-button>
              </b-collapse>
            </div>
          </div>
        </div>
    </div>

    </div>
  </div>
</template>
<script>
import PostEditor from "@/components/PostEditor";
import main from "../main";
import store from "../Store";
export default {

name: "Reply",
  props:['reply','id'],
  components:{
    PostEditor,
  },
  data() {
    return{
      showReply:false,
      errors: [],
      upstream: null

    }
  },
  computed: {
    content() {
      return this.reply.content
    },
  },
  mounted: function(){
    let reply
    if(this.reply.reply_to == null)
    {reply = null}
    else{
    main.getRepliesByKey(this.reply.reply_to, function (response) {
      if(response){
        if(response.username)
        store.commit('setUpstreamUserName',response.username)
      }
    })
    reply = "@" +this.$store.state.sourceUsername}
    // console.log(upstream)
    this.upstream = reply
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
      main.addReply(this.$store.state.key, this.$store.state.thread.content, this.$store.state.currentUser.id, replyTo, this.$store.state.currentUser.name);

    },

    addlike: function() {

      main.updateReplyLikeCount(this.id)

    },


    adddislike: function() {

      main.updateReplyDisLikeCount(this.id)

    }
  },

}
</script>
<style scoped>

.display-reply {
  margin-top: 5px;
}
</style>