<template>
  <div id="app">
    <nav-bar-component/>
    <side-bar-component/>
<!--    <SwapIndex></SwapIndex>-->
  </div>
</template>

<script>
import NavBarComponent from "@/components/NavBarComponent";
import SideBarComponent from "@/components/SideBarComponent";

export default {
  name: 'App',
  components: {
    NavBarComponent,
    SideBarComponent
  }
}
</script>

<style>
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
</style>
