import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage'
import RegisterPage from '../components/registerPage'
import Activity from '../components/activityPage'
import Login from '../components/Login'
import CreatePromo from '../components/PromotionForm'
import Payment from '../components/Payment'
import RequestResetPassword from '../components/resetPassword/RequestResetPassword'
import UpdatePassword from '../components/resetPassword/UpdatePassword'
import ActivityDetails from '../components/activity/activityDetails'
import EditActivity from '../components/activity/activityEditForm'


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
             path: '/createPromo',
             name: 'CreatePromo',
             component : CreatePromo
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
        },
        {
          path: '/editActivity',
          name: 'EditActivity',
          component: EditActivity
        }


    ]

})
