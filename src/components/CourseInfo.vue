<template>
  <div class="ui container">
<!--    <h1>{{$route.query.id}}</h1>-->
    <button class="ui right floated button" v-on:click="load">load course</button>
    <div class="ui stackable grid">
      <div class="nine wide column">
        <div class="title">
          <span>{{course.name}}</span>
        </div>
      </div>
      <div class="six wide column">
        <div class="horizontal right aligned link list">
          <router-link class="ui button" to="/post">
            Post Thread
          </router-link>
          <button class="ui button">
            Swap Index
          </button>
          <button class="ui button">
            Find Teammate
          </button>
        </div>
      </div>
    </div>
    <span class="subtitle">1.2k People followed this course</span>

    <div class="ui black segment">
      <div class="ui black top attached label" style="font-size: large">Course Information</div>
      <p>{{course.information}} </p>
    </div>

    <div class="ui black segment">
      <div class="ui black top attached label" style="font-size: large">Discussion</div>
      <div class="ui container">
        <thread v-for = "(value, key, index) in threads" :key="index" :thread="value" :id="key"/>
      </div>
    </div>
  </div>
</template>

<script>
import Thread from "@/components/Thread";
import store from "../Store";
// import main from "../main.js";
export default {
  name: "CourseInfo",
  components:{
    Thread,
  },
  watch: {
    $route: {
      handler() {
        store.commit('setCourseID',this.$route.params.id)
        store.dispatch("getCourseInfo")
        store.dispatch('getCourseThreads', store.state.currentUser);
    }
}
  },
  computed: {
    course() {
      return this.$store.state.course
    },
    threads() {
      return this.$store.state.courseThreads
    },
  },
  created() {
    setTimeout(
        () => {
          if(store.state.currentUser.status == 1) {
            store.commit('setCourseID',this.$route.params.id)
            store.dispatch("getCourseInfo")
            store.dispatch('getCourseThreads', store.state.currentUser);
          }
        },
        1000
    )
    //console.log(this.$route.query.id)

  },
  // data(){
  //   return {
  //     'threads':[{
  //       'title': 'cz3002',
  //       'replyCount':20,
  //       'like':20,
  //       'favourite':10,
  //       'content':'hello',
  //       'user': require('../assets/default profile.jpeg') ,
  //     },{
  //       'title': 'cz3003',
  //       'replyCount':20,
  //       'like':20,
  //       'favourite':10,
  //       'user': require('../assets/default profile.jpeg') ,
  //     },
  //       {
  //         'title': 'cz3004',
  //         'replyCount':20,
  //         'like':20,
  //         'favourite':10,
  //         'user': require('../assets/default profile.jpeg') ,
  //       }, {
  //         'title': 'cz3006',
  //         'replyCount':20,
  //         'like':20,
  //         'favourite':10,
  //         'user': require('../assets/spec profile.jpeg') ,
  //       }]
  //   }
  // },
  methods:{
    load(){
      // this.$store.commit('setCourseID',"CZ2006")
      // this.$store.dispatch("getCourseInfo")
    }
  }
}
</script>

<style scoped>
.title{
  font-size: 40px;
  font-weight: 900;
}
.subtitle{
  font-size: small;
  color: darkgrey;
}
</style>