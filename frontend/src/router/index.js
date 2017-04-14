import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage'
import RegisterForm from '../components/registerForm'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/home',
            name: 'HomePage',
            component: HomePage
        },
        {
            path: '/test',
            name: 'RegisterForm',
            component: RegisterForm
        }
    ]
})
