<template>
  <div id="app">
    <nav-bar-component/>
    <side-bar-component/>
    <notifications></notifications>
    <!--    <SwapIndex></SwapIndex>-->
    <router-view />
  </div>
</template>

<script>
import NavBarComponent from "@/components/NavBarComponent";
import SideBarComponent from "@/components/SideBarComponent";
import store from './Store.js';


export default {
  name: 'App',
  components: {
    NavBarComponent,
    SideBarComponent,
  },
  mounted: function() {
    store.dispatch('getCurrentUser')
    setTimeout(
         () => {
           if(store.state.currentUser.status == 1) {
             store.dispatch('getCurrentUsername');
             store.dispatch('getCurrentProfile');
             store.dispatch("getSubCourses");
             store.dispatch("getFavoriteThreads");
           }
         },
         1500
     )
    // if user is already login then load user forums
    // setTimeout(
    //     () => {
    //       if(store.state.currentUser.status == 1) {
    //         store.dispatch('getCourseThreads', store.state.currentUser);
    //       }
    //     },
    //     2000
    // )
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
