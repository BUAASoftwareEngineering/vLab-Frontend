<style> 
 #app { 
 font-family: 'Avenir', Helvetica, Arial, sans-serif; 
 -webkit-font-smoothing: antialiased; 
 -moz-osx-font-smoothing: grayscale; 
 text-align: left; 
 color: #2c3e50; 
 margin-top: 0px; 
 } 
 .ivu-select-dropdown{ 
 overflow: hidden; 
 border-radius: 0vh; 
 max-height: 400px; 
 padding-bottom: 0px; 
 } 
 </style> 

<template>
  <div id="app" ref="app">
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
