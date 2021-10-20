<template>
  <div>
    <b-jumbotron bg-variant="secondary" text-variant="light">
      <template #header><p class="text-center font-weight-bolder">{{course.id + ": " + course.name}} </p> </template>
    </b-jumbotron>
  <div class="ui container">
    <div class="ui stackable grid">
<!--      <div class="nine wide column">-->
<!--        <div class="title">-->
<!--          <span>{{course.name}}</span>-->
<!--        </div>-->
<!--      </div>-->

      <div class="eight wide column">
        <div class="horizontal right aligned link list">
          <router-link class="ui button" v-bind:to="'/post/'+ this.$route.params.id">
            Post Thread
          </router-link>
          <router-link class="ui button" v-bind:to="'/display_main_list/'+ this.$route.params.id">
            Swap Index
          </router-link>
          <router-link class="ui button" v-bind:to="'/teammates_main_list/'+ this.$route.params.id">
            Find Teammate
          </router-link>
          <router-link class="ui button" v-bind:to="'/submit_feedback'">
            Feedback
          </router-link>

          <b-button class="m-1" v-on:click="subscribe">
            <svg v-if="subscribed==0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
            </svg>
            <svg v-if="subscribed==1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-bell-fill" viewBox="0 0 16 16">
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
            </svg>

          Subscribe
          </b-button>
        </div>
      </div>
    </div>
    <span class="subtitle">{{course.subCount}} People followed this course</span>

    <div class="ui black segment">
      <div class="ui black top attached label" style="font-size: large">Course Information</div>
      <br>
      <br>
      <p>{{course.information}} </p>
    </div>

    <div class="ui black segment">
      <div class="ui black top attached label" style="font-size: large">Discussion</div>
        <div class="ui middle aligned divided list">
          <thread v-for = "(value, key, index) in threads" :key="index" :thread="value" :id="key"/>
        </div>

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
        setTimeout(function () {
          let course_id = store.state.course.id
          store.dispatch('getSubscribeStateForCurrentCourse',course_id)
        },800)
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
    subscribed: {
      get: function (){
        if(this.$store.state.subscribeCurrentCourse){
          return 1
        } else {
          return 0
        }
      },
      set: function (val){
        this.subscribe = val
      }
    }
  },
  mounted() {
    store.commit('setCourseID',this.$route.params.id)
    store.dispatch("getCourseInfo")
    store.dispatch('getCourseThreads', store.state.currentUser);
    //store.dispatch('getSubscribeStateForCurrentCourse',this.$store.state.course.id)
    setTimeout(function () {
      let course_id = store.state.course.id
      store.dispatch('getSubscribeStateForCurrentCourse',course_id)
    },2000)
  },

  destroyed() {
    store.commit("setSubscribeCurrentCourse",false)
  },

  methods:{
    load(){
    },
    subscribe: function () {
      if(this.$store.state.currentUser.status != 1) {
        this.$router.push('/login');
      }
      if(this.subscribed){
        main.unsubscribeCourse(this.$route.params.id,this.$store.state.currentUser.id)
        this.$store.commit('setSubscribeCurrentCourse',false)
      } else {
        main.subscribeCourse(this.$route.params.id,this.$store.state.currentUser.id)
        this.$store.commit('setSubscribeCurrentCourse',true)
      }
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