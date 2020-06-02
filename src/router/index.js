const Vue = require('vue')
const VueRouter = require('vue-router')
/*引入页面*/
import Login from '@/components/Login/login.vue'
import Home from '@/components/Home/home.vue'
import Ide from '@/components/MyLayout.vue'
import Draft from '@/components/MyDraft.vue'

// Vue.use(VueRouter)

/*配置路由*/
export default new VueRouter({
  //mode:'history',
  base: '/dist/',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },

    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/ide',
      name: 'Ide',
      component: Ide
    },
    {
      path: '/draft',
      name: 'Draft',
      component: Draft
    }
  ]
})