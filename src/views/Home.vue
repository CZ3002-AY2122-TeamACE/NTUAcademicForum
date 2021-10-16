<template>
  <div class="home">
    <all-course/>
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<!--    <div>这是测试</div>-->

  </div>
</template>


<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import AllCourse from "@/components/AllCourse";

export default {
  name: 'Home',
  components: {
    //HelloWorld,
    AllCourse
  }
}
</script>
