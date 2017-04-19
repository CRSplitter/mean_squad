import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage'
import profile from '../components/profile'
import vueResource from 'vue-resource'

Vue.use(vueResource)
import RegisterPage from '../components/registerPage'
import Activity from '../components/activityPage'
import Login from '../components/Login'
import Payment from '../components/Payment'
import RequestResetPassword from '../components/resetPassword/RequestResetPassword'
import UpdatePassword from '../components/resetPassword/UpdatePassword'
import ActivityDetails from '../components/activity/activityDetails'
import BusinessCard from '../components/businessCard'
import PromotionCard from '../components/promotionCard'
import ReservationForm from '../components/reservationForm'
import PaymentDetails from '../components/paymentDetails'
import ReservationDetails from '../components/reservationsPage'
import adminPage from '../components/siteAdminPage'
import notFound from '../components/notFound'

Vue.use(Router)

export default new Router({

    mode: 'history',
    routes: [{
            path: '/home',
            name: 'HomePage',
            component: HomePage
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/activity',
            name: 'Activity',
            component: Activity
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
            path: '/activity/:id',
            name: 'ActivityDetails',
            component: ActivityDetails
<<<<<<< HEAD
         },
         {
             path: '/businessCard',
             name: 'BusinessCard',
             component: BusinessCard
         },
         {
             path: '/promotionCard',
             name: 'PromotionCard',
             component: PromotionCard
         },
         {
             path: '/payment/:id',
             name: 'PaymentDetails',
             component: PaymentDetails
         }
=======
        },
        {
            path: '/reservation/:id',
            name: 'ReservationDetails',
            component: ReservationDetails
        },
        {
            path: '/adminPage',
            name: 'siteAdminPage',
            component: adminPage
        },
        {
            path: '/profile/:username',
            name: 'profile',
            component: profile
        },
        {
            path: '/register',
            name: 'RegisterPage',
            component: RegisterPage
        }
>>>>>>> 9399dbefdc5c1d386b93536b16c53cd63dca25e2
    ]
})