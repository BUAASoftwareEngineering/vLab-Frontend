import Vue from 'vue'
import Router from 'vue-router'
import Terminal from '@/components/Terminal'
import MainPage from '@/components/MainPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Terminal',
      component: Terminal
    },
    {
      path: '/test',
      name: 'MainPage',
      component: MainPage
    }
  ]
})
