<template>
  <div>
    <div class="m-container-small">
      <div class="ui container">
        <form class="ui form">
          <div class="required field">
            <div class="ui left labeled input">
              <div class="ui label"> title
              </div>
              <input type="text" placeholder="title of the thread" v-model="title" name="title">
            </div>
          </div>
          <post-editor></post-editor>
          <div>
            <button class="ui right floated button" v-on:click="savingContent">submit</button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import PostEditor from "@/components/PostEditor";
import main from "../main.js";
export default {
  name: "StartNewThread",
  components:{
    PostEditor,
  },
  data(){
    return {};
  },
  computed: {
    title: {
      get() {
        return this.$store.state.thread.title
      },
      set(value) {
        this.$store.commit('setThreadTitle', value)
      }
    }
  },
  methods: {

    savingContent: function() {
      main.addThread(this.$store.state.thread.title, this.$store.state.post.content, this.$store.state.currentUser.id);

      this.$router.push('/about');


    }},
}
</script>

<style scoped>
.m-container-small{
  max-width: 70em !important;
  margin: auto !important;
}
</style>