<template>
  <div>
    <div>
      <div id="app">
        <vue-editor v-model="content"></vue-editor>

      </div>
    </div>
    <br>
  </div>
</template>

<script>

import { VueEditor } from "vue2-editor";


export default {
  name: "PostEditor",
  components: {
    VueEditor
  },
  data() {
    return {

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