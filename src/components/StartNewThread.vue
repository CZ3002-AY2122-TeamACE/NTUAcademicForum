<template>
  <div>
    <div class="m-container-small">
      <div class="ui container">
        <form class="ui form">
        <div class="required field">
          <div class="ui left labeled input">
            <div class="ui label"> title
            </div>
            <input type="text" placeholder="title of the thread" name="title">
          </div>
        </div>
        <post-editor></post-editor>
      </form>

      </div>
    </div>
  </div>
</template>

<script>
import PostEditor from "@/components/PostEditor";
export default {
name: "StartNewThread",
  components:{
    PostEditor,
  },
  data(){
    return {};
  }
}
</script>

<style scoped>
.m-container-small{
  max-width: 70em !important;
  margin: auto !important;
}
</style>