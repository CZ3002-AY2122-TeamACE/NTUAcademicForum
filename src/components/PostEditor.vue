<template>
  <!--
  <div class="home">
    <h3>wangEditor with vue</h3>
    <div id="demo1"></div>
  </div>
  -->
  <div>
    <div>
      <div id="app">
        <vue-editor v-model="content"></vue-editor>

      </div>
    </div>
    <br>
<!--    <div>-->
<!--      <button class="ui right floated button" v-on:click="savingContent">submit</button>-->
<!--    </div>-->
  </div>
</template>

<script>
//import wangEditor from 'wangeditor'

import { VueEditor } from "vue2-editor";


export default {
  name: "PostEditor",
  components: {
    VueEditor
  },
  data() {
    return {
      // content: "write your post here."

    };
  },
  computed: {
    content: {
      get() {
        return this.$store.state.thread.content
      },
      set(value) {
        this.$store.commit('setThreadContent', value)
      }
    }
  },

}
</script>
<style scoped>

</style>