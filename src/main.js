import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";

// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcNQNGP9tKKBz4-Pz_wgGxkqHJb4rKJEc",
  authDomain: "ntuacademicforum-f11b9.firebaseapp.com",
  projectId: "ntuacademicforum-f11b9",
  storageBucket: "ntuacademicforum-f11b9.appspot.com",
  messagingSenderId: "927176632912",
  appId: "1:927176632912:web:673d21fe6ecf3735677f55"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.prototype.$axios = axios;
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
