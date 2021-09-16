import Vue from 'vue'
import App from './App.vue'
//import firebase from "firebase/compat/app";
import firebase from "firebase/app";
import "firebase/compat/auth";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import {initializeApp} from "firebase/firebase-app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcNQNGP9tKKBz4-Pz_wgGxkqHJb4rKJEc",
  authDomain: "ntuacademicforum-f11b9.firebaseapp.com",
  projectId: "ntuacademicforum-f11b9",
  storageBucket: "ntuacademicforum-f11b9.appspot.com",
  messagingSenderId: "927176632912",
  appId: "1:927176632912:web:673d21fe6ecf3735677f55",
  databaseURL: "https://ntuacademicforum-f11b9-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
let app = initializeApp(firebaseConfig);
const database = app.databaseURL

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

let app;

firebase.auth().onAuthStateChanged(user=> {
  console.log(user)
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
