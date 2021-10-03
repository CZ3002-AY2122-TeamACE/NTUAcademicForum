<template>
  <div class="ui container">
    <div class="ui stackable grid">
      <div class="nine wide column">
        <div class="title">CZ3002</div>
      </div>
      <div class="six wide column">
        <div class="horizontal right aligned link list">
          <button class="ui button">
            Post Thread
          </button>
          <button class="ui button">
            Swap Index
          </button>
          <button class="ui button">
            Find Teammate
          </button>
        </div>
      </div>
    </div>
    <span class="subtitle">1.2k People followed this course</span>

    <div class="ui black segment">
      <div class="ui black top attached label" style="font-size: large">Course Information</div>
      <p>CZ3002 is Advanced Software Engineering course </p>
    </div>
    <div class="ui black segment">
      <div class="ui black top attached label" style="font-size: large">Discussion</div>
      <div class="ui container">
        <thread v-bind:forums="forums"/>
      </div>
    </div>
  </div>

</template>

<script>
import Thread from "@/components/Thread";
export default {
name: "CourseInfo",
  components:{
    Thread,
  },
  data () {
  return {
    forums: [
      {
        id: 1,
        name: 'forum001',
        description: 'empty',
        replyCount:10,
        like:3,
        favourite:2
      },
      {
        id: 2,
        name: 'forum002',
        description: 'empty',
        replyCount:10,
        like:3,
        favourite:2
      },
      {
        id: 3,
        name: 'forum003',
        description: 'empty',
        replyCount:10,
        like:3,
        favourite:2
      }
    ],
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