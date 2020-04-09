<style >
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .demo-split{
        height: 200px;
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 10px;
    }
    .ivu-btn{
        border-radius: 0px;
        color:#464e57;background-color:#464e57;border-color:#464e57
    }
    .ivu-layout-header{
        height:36px;
        line-height:36px;
        padding:0;
        
    }
</style>

<template>
  <div id="app">
    <MyLayout></MyLayout>
    
  </div>
</template>

<script>
import MyLayout from './components/MyLayout'
export default {
  name: 'App',
  components: {
    MyLayout
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
