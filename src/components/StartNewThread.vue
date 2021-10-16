<template>
  <div>
    <div class="m-container-small">
      <div class="ui container">
        <div class="alert alert-danger" v-if="this.errors.length > 0">
          <ul>
            <li v-for="(error, index) in this.errors" :key="index">{{ error }}</li>
          </ul>
        </div>
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
            <b-button class="ui right floated button" v-on:click="savingContent">submit</b-button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import PostEditor from "@/components/PostEditor";
import main from "../main.js";
// import store from "../Store";
export default {
  name: "StartNewThread",
  components:{
    PostEditor,
  },
  data(){
    return {
      errors: [],
    };
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
  created() {
  if(this.$store.state.currentUser.status != 1) {
    this.$router.push('/login');
  }
  },
  methods: {

    savingContent: function() {
      this.errors = [];
      if(this.$store.state.thread.title== "") {
        this.errors.push('Your title is empty!');
      }
      if(this.$store.state.thread.content== "") {
        this.errors.push('Your content is empty!');
      }
      if(this.errors.length == 0) {
        main.addThread(this.$route.params.id, this.$store.state.thread.title, this.$store.state.thread.content, this.$store.state.currentUser.id, this.$store.state.currentUser.name);
        const courseId = this.$route.params.id
        this.$router.push({ name: 'Course', params: { id: courseId} });
      }



    }
  },
}
</script>

<style scoped>
.m-container-small{
  max-width: 70em !important;
  margin: auto !important;
}
</style>