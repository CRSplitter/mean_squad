import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage'
import RegisterPage from '../components/registerPage'
import Login from '../components/Login'
import Payment from '../components/Payment'

Vue.use(Router)

export default new Router({

    mode: 'history',
    routes: [{
            path: '/home',
            name: 'HomePage',
            component: HomePage
        },
        {
            path: '/register',
            name: 'RegisterPage',
            component: RegisterPage
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/Payment',
            name: 'Payment',
            component: Payment
        }

    ]

})
