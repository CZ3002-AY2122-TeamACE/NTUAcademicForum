<template>
  <div class="item">
    <div class="ui comments">

      <div class="ui container">
        <div class="comment">
          <a class="avatar">
            <img src="../assets/default profile.jpeg">
          </a>
          <div class="content">
            <a class="author">{{reply.user_id}}</a>
            <i class="calendar icon"></i>{{reply.created_at}}
            <div class="text">
              {{reply.content}}
            </div>
            <div class="actions">
              <a><i class="thumbs up outline icon"></i></a>
              <a><i class="thumbs down outline icon"></i></a>
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
export default {

name: "Reply",
  props:['reply'],
  data(){
    return{
      showReply:false,
    }
  }
}
</script>

<style scoped>

.display-reply {
  margin-top: 5px;
}
</style>