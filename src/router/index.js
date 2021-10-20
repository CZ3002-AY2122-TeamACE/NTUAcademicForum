import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Secret from '../views/Secret.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import StartNewThread from "@/components/StartNewThread";
import ThreadReplies from "@/components/ThreadReplies";
import About from "@/views/About";
import Favourite from "@/components/Favourite";
import post_request from "@/components/swap_index/post_request";
import display_main_list from "@/components/swap_index/display_main_list";
import display_main_list_teammates from "../components/find_teammates/display_main_list_teammates";
import post_request_teammates from "../components/find_teammates/post_request_teammates";
import profilePage from "../components/ProfilePage"
import FeedbackSubmit from "@/components/admin_panel/FeedbackSubmit";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home|StudyHub@NTU',
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
    path:"/post/:id",
    name: 'Post',
    component: StartNewThread,
  },
  {
    path:"/thread/:id",
    name: 'thread',
    component: ThreadReplies,
  },
  {
    path: '/course/:id',
    name: 'Course',
    component: About,
  },
  {
    path:'/favourite',
    name:'Favorites',
    component: Favourite,
  },
  { path: "/display_main_list/:id",
    name:'Search for Index Swap',
    component: display_main_list
  },
  {
    path: "/swap_index_edit/:id",
    name:'Edit Request for Index Swapping',
    component: post_request
  },
  {
    path: "/teammates_main_list/:id",
    name:'Search for Teammates',
    component: display_main_list_teammates
  },
  {
    path: "/teammates_main_edit/:id",
    name:'Edit Request for Teammates',
    component: post_request_teammates
  },
  {
    path: "/profilePage",
    name:'Profile Page',
    component: profilePage
  },
  {
    path: "/submit_feedback",
    name: 'Feedback',
    component: FeedbackSubmit
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  const requiresAuth = to.matched.some(record=> record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  document.title = to.name; // change the tab name
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
})

export default router