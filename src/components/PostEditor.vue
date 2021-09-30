<template>
  <!--
  <div class="home">
    <h3>wangEditor with vue</h3>
    <div id="demo1"></div>
  </div>
  -->
  <div id="app">
    <vue-editor v-model="content"></vue-editor>
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
      content: "<h1>Some initial content</h1>"
    };
  }
  /*
  data() {
    return {
      editor: null,
      editorData: ''
    }
  },
  mounted() {
    const editor = new wangEditor(`#demo1`)
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.showMenuTooltips = false
    // 引入 i18next 插件
    editor.i18next = window.i18next
    editor.config.lang = 'en'
    editor.config.onchange = (newHtml) => {
      this.editorData = newHtml
    }
    // 创建编辑器
    editor.create()
    this.editor = editor
  },
  methods: {
    getEditorData() {
      // 通过代码获取编辑器内容
      let data = this.editor.txt.html()
      alert(data)
    },
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  },

   */
}
</script>
<style scoped>

</style>