import Vue from 'vue'
import App from './App.vue'
//import SuiVue from 'semantic-ui-vue';
import firebase from "firebase/compat/app";
// import firebase from 'firebase';
import "firebase/compat/auth";
import "firebase/compat/database";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import store from './Store'
// import {initializeApp} from "firebase/firebase-app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcNQNGP9tKKBz4-Pz_wgGxkqHJb4rKJEc",
  authDomain: "ntuacademicforum-f11b9.firebaseapp.com",
  databaseURL: "https://ntuacademicforum-f11b9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ntuacademicforum-f11b9",
  storageBucket: "ntuacademicforum-f11b9.appspot.com",
  messagingSenderId: "927176632912",
  appId: "1:927176632912:web:673d21fe6ecf3735677f55",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
//Vue.use(SuiVue);

Vue.config.productionTip = false

let app;
// let app = initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(user=> {
  console.log(user)
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

const db = firebase.database();
export default {
  authenticate(email, password, successcallback, errorcallback) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(successcallback).catch(errorcallback);
  },
  logout(successcallback, errorcallback) {
    firebase.auth().signOut().then(successcallback).catch(errorcallback);
  },
  getCurrentUser(callback) {
    firebase.auth().onAuthStateChanged(callback);
  },
  register(email, password, successcallback, errorcallback) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(successcallback).catch(errorcallback);
  },
  // updateUserDisplayname(name) {
  //   var user = firebase.auth().currentUser;
  //   user.updateProfile({
  //     displayName: name,
  //   }).then(function() {
  //     // Update successful.
  //   }).catch(function(error) {
  //     // An error happened.
  //   });
  // },
  addUser(name, email, uid) {
    const usersRef = db.ref('users');
    const usersPush = usersRef.push();
    const key = usersPush.getKey();
    usersPush.set({
      name: name,
      email: email,
      uid: uid,
      created_at: (new Date()).toLocaleString()
    });
    return key;
  },
  getUserByUID(UID, callback) {
    const userRef = db.ref('users').orderByChild("uid").equalTo(UID);
    userRef.on('value', function(snapshot) {
      if(snapshot.val() != null) {
        callback(Object.keys(snapshot.val())[0], snapshot.val());
      } else {
        callback(null, null);
      }
    });
  },
  addPost(content, user_id) {
    const postRef = db.ref('posts');
    const postPush = postRef.push();
    postPush.set({
      content: content,
      user_id: user_id,
      created_at: (new Date()).toLocaleString()
    });
  },

}