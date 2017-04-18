import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage'
import RegisterPage from '../components/registerPage'
import Login from '../components/Login'
import Payment from '../components/Payment'
import RequestResetPassword from '../components/resetPassword/RequestResetPassword'
import UpdatePassword from '../components/resetPassword/UpdatePassword'
import EditPromotion from '../components/editPromotion' 
import AddActivity from '../components/addActivity'

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
        },
        {
            path: '/request_reset_password',
            name: 'RequestResetPassword',
            component: RequestResetPassword

        },
        {
            path: '/update_password/:token',
            name: 'UpdatePassword',
            component: UpdatePassword
        },
        {
            path: '/editPromotion',
            name: 'EditPromotion',
            component: EditPromotion
        },
        {
            path: '/addActivity',
            name: 'AddActivity',
            component: AddActivity
        }

    ]

})