import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage'
import profile from '../components/profile'
import vueResource from 'vue-resource'

Vue.use(vueResource)

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/profile/:username',
      name: 'profile',
      component: profile
    }
  ]
})
