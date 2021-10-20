<template>
  <!-- the list display page -->
  <!-- Todo: add authority check on post
   -->
<div>
  <h1>All Request</h1>
  <b-button variant="primary" >Post Request</b-button>
  <b-container fluid>
    <div class="row" v-for="r in getRequests()" v-bind:key="r.id">
      <div class="col main-info">
        [{{r.courseId}}] From {{r.sourceIndex}} To {{r.targetIndexes}}
      </div>
      <div class="col main-info">
        <img src="r.userAvatar" class="rounded-circle img-thumbnail" alt="the avatar of the user post the request">
        {{r.user}}
      </div>
      <div class="col interest">
        <b-icon icon="people-fill"></b-icon>
        {{r.interestsReceived}} Interests Received
      </div>
      <div class="col operation">
        <b-button variant="primary">Apply</b-button>
      </div>
    </div>
  </b-container>
</div>
</template>

<script>
import Database from "@/components/Database";

export default {
  name: "MainList",

  methods: {
    getRequests() {
      return Database.swapIndexRequests;
    }
  }
}
</script>

<style scoped>

</style>