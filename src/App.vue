<style >
    .layout{
        border: 0.2vh solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 0.5vh;
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
        border-radius: 0vh;
        color:#fff;background-color:#464e57;border-color:#464e57;
		    border: 0vh solid transparent;
        padding: 0vh 0vh 0.5vh;
        margin:-1vh;
    }
	  .ivu-btn:hover{
      background-color: dimgrey;
    }
    .ivu-dropdown-rel{
        padding: -1vh;
    }
    .ivu-dropdown-menu{
        overflow: hidden;
    }
    .ivu-dropdown-item{
     padding: 0vh 1vh 0vh 1vh;
      height: 2.5vh;
        float: none;
        font-size: 1.8vh;
    }
    .ivu-dropdown-item-divided{
      height: 2.5vh;
      margin-top: 0vh;
      margin-bottom: 0.5vh;
      padding: 0.1vh 1vh 0vh 1vh;
      line-height: 2.5vh;
      border-top: 0.2vh solid #e8eaec;
        float: none;
        font-size: 1.8vh;
    }
    .ivu-layout-header{
        height:3.6vh;
        line-height:3.6vh;
        padding:0;
    background-color: #464e57;
        margin: 0;
    }
	.ivu-select-dropdown{
      border-radius: 0vh;
      margin-top: 0.2vh;
      padding: 0vh;
      z-index: 20000;
    }
    .ivu-tree-title{
      border-radius:0vh;
      color:#fff;
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
