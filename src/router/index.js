import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Secret from '../views/Secret.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import RichTextEditor from 'rich-text-editor-vuetify'
import StartNewThread from "@/components/StartNewThread";
import ThreadReplies from "@/components/ThreadReplies";

Vue.use(VueRouter)
Vue.use(RichTextEditor)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/secret',
    name: 'secret',
    component: Secret,
    meta: {requiresAuth: true}
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:"/post",
    name: 'Post',
    component: StartNewThread,
  },
  {
    path:"/thread",
    name: 'thread',
    component: ThreadReplies,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  const requiresAuth = to.matched.some(record=> record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
})

export default router
