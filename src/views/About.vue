<template>
  <div class="about">
    <h1>This is an about page</h1>
    <course-info/>
  </div>
</template>

<script>
import CourseInfo from "@/components/CourseInfo"
export default {
  name:"about",
  components:{
    CourseInfo,
  },
}
</script>
