<template>
  <div class="home">
    <div id="monaco"></div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
export default {
  mounted() {
    monaco.editor.create(document.getElementById("monaco"),{
            value:`print('this is a editor')`,
            language:"python",
            theme: "vs-dark"
    })
  }
}
</script>

<style lang="less" scoped>
#monaco {
  height: 93vh;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  font: 1em sans-serif;
}
</style>