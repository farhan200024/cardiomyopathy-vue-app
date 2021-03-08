import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import VerifyEmail from '../views/VerifyEmail.vue'
import Dashboard from '../views/Dashboard.vue'
import CardiomyopathyData from '../views/CardiomyopathyData.vue'
import NotFound from '../views/NotFound.vue'
import ForgotPassword from '../components/ForgotPassword.vue'
import ExternalDatabase from '../views/ExternalDatabase.vue'
import { projectAuth } from '../firebase/config'
import Help from '../views/Help.vue'

const loggedOutGuard = (to, from, next) => {
  let user = projectAuth.currentUser
  // console.log('current user in auth guard: ', user)
  if(!user.emailVerified) {
    next({ name: 'VerifyEmail' })
  } else if(!user) {
    next({ name: 'Login' })
  }
  else next()
}

const loggedInGuard = (to, from, next) => {
  let user = projectAuth.currentUser
  // console.log('current user in auth guard: ', user)
  if (user) next({ path: '/' })
  else next()
}

const verifyEmailGuard = (to,from,next) => {
  let user = projectAuth.currentUser

  if(user && !user.emailVerified) {
    next()
  } else {
    next({ name: 'Home' })
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/help",
    name: "Help",
    component: Help
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: loggedInGuard,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter: loggedInGuard,
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    beforeEnter: loggedInGuard,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: loggedOutGuard,
  },
  {
    path: "/data",
    name: "CardiomyopathyData",
    component: CardiomyopathyData,
    beforeEnter: loggedOutGuard,
  },
  {
    path: "/search",
    name: "Search",
    component: ExternalDatabase
    /*beforeEnter: loggedOutGuard,*/
  },
  {
    path: "/verify-email",
    name: "VerifyEmail",
    component: VerifyEmail,
    beforeEnter: verifyEmailGuard
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
