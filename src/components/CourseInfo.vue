<template>
  <div class="ui container">
<!--    <h1>{{$route.query.id}}</h1>-->
    <div class="ui stackable grid">
      <div class="nine wide column">
        <div class="title">
          <span>{{course.name}}</span>
        </div>
      </div>

      <div class="eight wide column">
        <div class="horizontal right aligned link list">
          <router-link class="ui button" v-bind:to="'/post/'+ this.$route.params.id">
            Post Thread
          </router-link>
          <button class="ui button">
            Swap Index
          </button>
          <button class="ui button">
            Find Teammate
          </button>
          <b-button class="m-1" v-on:click="subscribe">
            <svg v-if="isSubscribe==0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
            </svg>
            <svg v-if="isSubscribe==1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-heart-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg>

          Subscribe
          </b-button>
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
        <div class="ui middle aligned divided list">
          <thread v-for = "(value, key, index) in threads" :key="index" :thread="value" :id="key"/>
        </div>

    </div>
  </div>
</template>

<script>
import Thread from "@/components/Thread";
import store from "../Store";
import main from '../main.js';

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
    // isSubscribe:{
    //   get: function() {
    //     if(this.$store.state.sub){
    //       console.log("collected state: "  + this.$store.state.favouritedCurrentThread)
    //       return 1
    //     } else {
    //       return 0
    //     }
    //   },
    //   set: function (val){
    //     this.isSubscribe = val
    //   }
    // },
  },
  // created() {
  //   setTimeout(
  //       () => {
  //         if(store.state.currentUser.status == 1) {
  //           store.commit('setCourseID',this.$route.params.id)
  //           store.dispatch("getCourseInfo")
  //           store.dispatch('getCourseThreads', store.state.currentUser);
  //         }
  //       },
  //       2000
  //   )
  // },
  mounted() {
    // setTimeout(
    //     () => {
    //       if(store.state.currentUser.status == 1) {
    //         store.commit('setCourseID',this.$route.params.id)
    //         store.dispatch("getCourseInfo")
    //         store.dispatch('getCourseThreads', store.state.currentUser);
    //       }
    //     },
    //     2000
    //)
    store.commit('setCourseID',this.$route.params.id)
    store.dispatch("getCourseInfo")
    store.dispatch('getCourseThreads', store.state.currentUser);
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
    },
    subscribe: function () {
      main.subscribeCourse(this.$route.params.id,this.$store.state.currentUser.id)
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