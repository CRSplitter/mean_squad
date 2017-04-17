// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import NavBar from './components/NavBar'
import router from './router'
import vueResource from 'vue-resource'


Vue.use(vueResource);
Vue.config.productionTip = false
Vue.use(vueResource)
Vue.http.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('id_token');
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<NavBar></NavBar>',
  components: { NavBar }
})
