<template>
  <div class="home">
    <side-bar-component/>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div>这是测试</div>
  </div>
</template>


<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import SideBarComponent from "@/components/SideBarComponent";

export default {
  name: 'Home',
  components: {
    HelloWorld,
    SideBarComponent
  }
}
</script>
