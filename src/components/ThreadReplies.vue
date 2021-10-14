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
import store from "../Store";
export default {
  name: "ThreadReplies",
  components:{
    Reply,
  },
  data() {
    return {
    }
  },
  watch: {
    $route: {
      handler() {
        store.commit('setKey',this.$route.params.id)
        store.dispatch("getThreadInfo", {route: this.$route})
      }
    }
  },
  computed: {
    thread() {
      return this.$store.state.currentThread
    },
  },
  mounted() {
    setTimeout(
        () => {
          if(store.state.currentUser.status == 1) {
            store.commit('setKey',this.$route.params.id)
            this.$store.dispatch("getThreadInfo"),{route: this.$route}
          }
        },
        1000
    )

  },
  // data(){
  //   return {
  //     'thread':{
  //       'title': 'cz3002',
  //       'replyCount':20,
  //       'like':20,
  //       'favourite':10,
  //       'content':'hello',
  //       'user': require('../assets/default profile.jpeg') ,
  //     }
  //   }
  // }
}
</script>

<style scoped>

</style>