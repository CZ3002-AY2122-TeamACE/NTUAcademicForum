<template>
  <div class="ui container">

    <div class="ui stackable grid">
      <div class="nine wide column">
        <div class="title">
          <span>All Courses Available</span>
        </div>
      </div>
    </div>

    <div class="ui black segment">
      <div class="ui black top attached label" style="font-size: large">Courses</div>

      <div class="ui middle aligned divided list">
        <course v-for = "(value, key, index) in courses" :key="index" :course="value" :id="key"/>
<!--        <div class="button">-->
<!--          <router-link :to="`/course/CZ2006`">CZ2006</router-link>-->
<!--        </div>-->
<!--        <div class="button">-->
<!--          <router-link :to="`/course/CZ3002`">CZ3002</router-link>-->
<!--        </div>-->
      </div>
    </div>



  </div>
</template>

<script>

import Course from "@/components/Course";
//import store from "@/Store";
import store from "../Store";

export default {
  name: "AllCourse",
  components: {
    Course
  },
  watch: {
    $route: {
      handler() {
        store.dispatch("getCourses")
      }
    }
  },
  computed: {
    courses() {
      return this.$store.state.courses
    },
  },
  created() {
    store.dispatch("getCourses")
    // setTimeout(
    //     () => {
    //       if(store.state.currentUser.status == 1) {
    //         store.dispatch("getCourses")
    //       }
    //     },1000
    // )
  },
  methods:{
    load(){
    }
  }

}
</script>

<style scoped>
.title{
  font-size: 40px;
  font-weight: 900;
}
</style>