import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import CardiomyopathyData from '../views/CardiomyopathyData.vue'
import ForgotPassword from '../components/ForgotPassword.vue'
import LineChartExample from '../components/LineChartExample.vue'
import { projectAuth } from '../firebase/config'

const authenticationGuard = (to, from, next) => {
  let user = projectAuth.currentUser
  // console.log('current user in auth guard: ', user)
  if(!user) {
    next({ name: 'Login' })
  }else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: authenticationGuard
  },
  {
    path: '/data',
    name: 'CardiomyopathyData',
    component: CardiomyopathyData,
    beforeEnter: authenticationGuard
  },
  {
    path: '/chart-example',
    name: 'LineChartExample',
    component: LineChartExample,
    beforeEnter: authenticationGuard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
