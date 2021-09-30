<template>
  <div>
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
      <div class="ui middle aligned divided list">
          <thread v-for="thread in threads"
                  :key="thread.title"
                  :thread="thread"/>
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
  data(){
    return {
      'threads':[{
        'title': 'cz3002',
        'replyCount':20,
        'like':20,
        'favourite':10,
      },{
        'title': 'cz3003',
        'replyCount':20,
        'like':20,
        'favourite':10,
      },
        {
          'title': 'cz3004',
          'replyCount':20,
          'like':20,
          'favourite':10,
        }]
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