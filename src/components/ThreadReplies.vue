<template>
  <div class="ui container">
    <div class="ui black segment">
      <div class="ui middle aligned divided list">
        <reply></reply>
        <reply></reply>
        <reply></reply>
      </div>
    </div>
  </div>
</template>

<script>
import Reply from "@/components/Reply";
export default {
  name: "ThreadReplies",
  components:{
    Reply,
  },
  data(){
    return {}
  }
}
</script>

<style scoped>

</style>