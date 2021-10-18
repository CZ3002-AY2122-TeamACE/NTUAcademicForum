<template>
  <div class="ui container">

    <div class="ui stackable grid">
      <div class="nine wide column">
        <div class="title">
          <span>Favourite<i class="yellow star icon"></i></span>
        </div>
      </div>
    </div>

    <div class="ui segment">
      <div class="ui middle aligned divided list">
        <thread v-for = "(value, index) in threads" :key="index" :thread="value" :id="value.key"/>
      </div>
    </div>

  </div>
</template>

<script>
import Thread from "@/components/Thread";
import store from "../Store";

export default {
  name: "Favourite",
  components:{
    Thread,
  },
  computed:{
    threads(){
      return this.$store.state.favoriteThreads
    }
  },
  mounted() {
    setTimeout(function () {
      store.dispatch('getFavoriteThreads')
    },1000)
  }
}
</script>

<style scoped>
.title{
  font-size: 40px;
  font-weight: 900;
}
</style>