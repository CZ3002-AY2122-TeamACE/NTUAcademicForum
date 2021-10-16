<template>
  <div class="about">
    <course-info/>
  </div>
</template>

<script>
import CourseInfo from "@/components/CourseInfo"
export default {
  name:"about",
  components:{
    CourseInfo,
  },mounted() {
    // setTimeout(
    //     () => {
    //       if(store.state.currentUser.status == 1) {
    //         store.commit('setCourseID',this.$route.query.id)
    //         store.dispatch("getCourseInfo")
    //         store.dispatch('getCourseThreads', store.state.currentUser);
    //       }
    //     },
    //     2000
    // )
    }
}
</script>
