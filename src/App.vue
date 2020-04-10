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
        color:#fff;background-color:#464e57;border-color:#464e57;
		border: 0px solid transparent;
        padding: 6px 16px 6px;
        margin:-3px;
    }
	.ivu-btn:hover{
      background-color: dimgrey;
    }
    .ivu-dropdown-rel{
        padding: -3px;
    }
    .ivu-dropdown-menu{
        max-height: 400px;
    }
    .ivu-dropdown-item{
     padding: 0px 16px;
      height: 20px;
        float: none;
    }
    .ivu-dropdown-item-divided{
      height: 20px;
      margin-top: 4px;
      margin-bottom: 7px;
      padding: 0px 16px 0px;
      line-height: 20px;
      border-top: 2px solid #e8eaec;
        float: none;
    }
    .ivu-layout-header{
        height:36px;
        line-height:36px;
        padding:0;
        background-color: #464e57;
        margin: 0;
    }
	.ivu-select-dropdown{
      border-radius: 0px;
      margin-top: 0px;
      max-height: 200px;
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
