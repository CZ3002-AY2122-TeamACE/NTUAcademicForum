<template>
  <div class="item">
    <div class="ui container">
      <div class="ui vertical segment">
        <div class="ui stackable grid">
          <div class="eleven wide column" :id="id">
            <router-link v-bind:to="'/thread/'+id">{{thread.title}}</router-link>
          </div>
          <div class="five wide column">
            <div class="ui horizontal right aligned link list">
              <div class="item">
                <i class="align justify icon"></i> {{thread.replyCount}}
              </div>
              <div class="item">
                <i class="heart outline icon"></i> {{thread.like}}
              </div>
              <div class="item">
                <i class="star outline icon"></i> {{thread.favourite}}
              </div>
              <div class="item">
                <img :src="thread.user"  alt="" class="ui avatar image">
                {{thread.username}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Thread",
  props:['thread','id'],
  data() {
    return{
      threadId:this.id,
    }
  }
}
</script>

<style scoped>
</style>