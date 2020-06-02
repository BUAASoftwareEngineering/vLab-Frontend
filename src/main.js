
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
const Vue = require('vue')
const ViewUI = require('view-design')
const VueResource = require('vue-resource')


import App from './App'
import router from './router'
// import ViewUI from 'view-design'
// import 'view-design/dist/styles/iview.css'
// import VueResource from 'vue-resource'
import uploader from 'vue-simple-uploader'

Vue.use(VueResource)
Vue.config.productionTip = false
Vue.use(ViewUI) //使用iview组件 
Vue.use(uploader)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
