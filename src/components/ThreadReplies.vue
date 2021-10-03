<template>
  <div class="ui container">
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
      <div class="text">
        {{thread.content}}
      </div>
    </div>
    <h4 class="ui horizontal divider header">
      <i class="tag icon"></i>
      Reply
    </h4>
    <div class="ui segment">
      <div class="ui middle aligned divided list">
        <reply></reply>
        <reply></reply>
        <reply></reply>
      </div>
    </div>
  </div>
</template>

<script>
import Reply from "@/components/Reply";
export default {
  name: "ThreadReplies",
  components:{
    Reply,
  },
  data(){
    return {
      'thread':{
        'title': 'cz3002',
        'replyCount':20,
        'like':20,
        'favourite':10,
        'content':'hello',
        'user': require('../assets/default profile.jpeg') ,
      }
    }
  }
}
</script>

<style scoped>

</style>