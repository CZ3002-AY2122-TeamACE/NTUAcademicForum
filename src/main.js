import Vue from 'vue'
import App from './App.vue'
import SideBarComponent from './components/SideBarComponent.vue';
Vue.component('side-bar-component', SideBarComponent);
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
import FirebaseAPI from "./firebase_api/FirebaseAPI";
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

import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false
Vue.prototype.$firebaseApi = new FirebaseAPI()

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
      created_at: (new Date()).toLocaleString(),
      AY: "NA",
      bio: "NA",
      phone: "NA",
      tele: "NA",
      major: "NA",
    });
    return key;
  },
  updateProfile(key,AY,bio,phone,tele,major) {
    const userRef = db.ref("users/"+key);
    userRef.update({
      AY: AY,
      bio: bio,
      phone: phone,
      tele: tele,
      major: major
    });
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
  getUserByID(ID, callback) {
    const userRef = db.ref('users').child(ID);
    userRef.once('value', function(snapshot) {
      if (snapshot.val() != null) {
        callback(snapshot);
      } else {
        callback(null);
      }
    });
  },

  getCourseByID(ID, callback) {
    const courseRef = db.ref('courses').orderByChild("id").equalTo(ID);
    courseRef.on('value', function(snapshot) {
      if (snapshot.val() != null) {
        callback(snapshot);
      } else {
        callback(null);
      }
    })
  },

    getThreadsByCourse(course, callback) {
    const threadRef = db.ref('threads').orderByChild("course").equalTo(course);
    threadRef.on('value', function(snapshot) {
      callback(snapshot.val());
    });
  },

  getThreadByKey(key, callback) {
    const itemRef = db.ref('threads').child(key);
    itemRef.once('value', function(snapshot) {
      callback(snapshot.val())
    });
  },

    addThread(course, title, content, user_id, username) {
    const threadRef = db.ref('threads');
    const threadPush = threadRef.push();
    const key = threadPush.getKey();
    threadPush.set({
      title: title,
      course: course,
      content: content,
      user_id: user_id,
      like:0,
      favourite:0,
      replyCount:0,
      username: username,
      created_at: (new Date()).toLocaleString()
    })
    return key;
    },

  getReplyOfThread(thread, callback) {
    const replyRef = db.ref('replies').orderByChild("thread").equalTo(thread);
    replyRef.on('value', function(snapshot) {
      callback(snapshot.val())
    });
  },

  addReply(thread, content, user_id, reply_to, username) {
    const replyRef = db.ref('replies');
    const replyPush = replyRef.push();
    const key = replyPush.getKey();
    this.updateReplyCount(thread)
    replyPush.set({
      thread: thread,
      content: content,
      user_id: user_id,
      reply_to: reply_to,
      username: username,
      like: 0,
      dislike: 0,
      created_at: (new Date()).toLocaleString()
    })
    // this.updateReplyCount(thread)
    return key;
  },
  updateReplyCount(key)
  {
    var ThreadRef = db.ref('threads').child(key).child('replyCount');

    ThreadRef.transaction(function(reply) {
      // if (views) {
      reply = reply + 1;
      // }
      return reply;
    },);
  },
  checkFavouriteCurrentThread(user_id,callback){
    var favouriteThreadPairRef = db.ref('threadFavourite').orderByChild('user_id').equalTo(user_id)
    favouriteThreadPairRef.on('value', callback)
  },
  checkLikeCurrentThread(user_id,callback){
    var likeThreadPairRef = db.ref('threadLike').orderByChild('user_id').equalTo(user_id)
    likeThreadPairRef.on('value', callback)
  },
  updateThreadFavouriteRelation(thread_key, user_id) {
    console.log('user ' + user_id + " thread " + thread_key)
    var favourited = false
    var favouriteThreadPairRef = db.ref('threadFavourite').orderByChild('user_id').equalTo(user_id)
    favouriteThreadPairRef.once('value', function (pairs) {
      if (pairs) {
        pairs.forEach(function (snapshot) {
          let pair = snapshot.val()
          console.log(pair)
          if (pair.thread == thread_key) {
            favourited = true
            console.log("you have favourited the thread")
          }
        })
        console.log("favourite " + favourited)
        if (!favourited) {
          console.log("executing insertion outside")
          var threadRef = db.ref('threads').child(thread_key).child('favourite');
          threadRef.transaction(function (favourite) {
            favourite = favourite + 1;
            console.log("executing insertion inside")
            return favourite;
          })
          const favouritePairPush = db.ref('threadFavourite').push();
          const key = favouritePairPush.getKey();
          favouritePairPush.set({
            thread: thread_key,
            user_id: user_id,
            created_at: (new Date()).toLocaleString()
          })
          console.log("finish insertion")
          return key
        }
      }
    })
  },

  updateThreadLikeRelation(thread_key, user_id) {
    console.log('user ' + user_id + " thread " + thread_key)
    var liked = false
    var likeThreadPairRef = db.ref('threadLike').orderByChild('user_id').equalTo(user_id)
    likeThreadPairRef.once('value', function (pairs) {
      if (pairs) {
        pairs.forEach(function (snapshot) {
          let pair = snapshot.val()
          console.log(pair)
          if (pair.thread == thread_key) {
            liked = true
            console.log("you have liked the thread")
          }
        })
        console.log("like " + liked)
        if (!liked) {
          console.log("executing insertion outside")
          var threadRef = db.ref('threads').child(thread_key).child('like');
          threadRef.transaction(function (like) {
            like = like + 1;
            console.log("executing insertion inside")
            return like;
          })
          const likePairPush = db.ref('threadLike').push();
          const key = likePairPush.getKey();
          likePairPush.set({
            thread: thread_key,
            user_id: user_id,
            created_at: (new Date()).toLocaleString()
          })
          console.log("finish insertion")
          return key
        }
      }
    })
  },

  cancelThreadFavouriteRelation(thread_key, user_id){
    var threadRef = db.ref('threads').child(thread_key).child('favourite');
    threadRef.transaction(function (favourite) {
      favourite = favourite - 1;
      return favourite
    })
    var favouriteThreadPairRef = db.ref('threadFavourite').orderByChild('user_id').equalTo(user_id)
    favouriteThreadPairRef.once('value', function (pairs) {
      if (pairs) {
        pairs.forEach(function (snapshot) {
          let pair = snapshot.val()
          console.log(pair)
          if (pair.thread == thread_key) {
            console.log("cancelling favourite")
            snapshot.ref.remove()
          }
        })
      }
    })
  },

  cancelThreadLikeRelation(thread_key, user_id){
    var threadRef = db.ref('threads').child(thread_key).child('like');
    threadRef.transaction(function (like) {
      like = like - 1;
      return like
    })
    var likeThreadPairRef = db.ref('threadLike').orderByChild('user_id').equalTo(user_id)
    likeThreadPairRef.once('value', function (pairs) {
      if (pairs) {
        pairs.forEach(function (snapshot) {
          let pair = snapshot.val()
          console.log(pair)
          if (pair.thread == thread_key) {
            console.log("cancelling like")
            snapshot.ref.remove()
          }
        })
      }
    })
  },

  getRepliesByKey(key,callback) {
    const itemRef = db.ref('replies').child(key);
    itemRef.once('value', function (snapshot) {
      callback(snapshot.val())
    });
   },

  updateReplyDisLikeCount(key) {
    var topicRef = db.ref('replies').child(key).child('dislike');

    topicRef.transaction(function (dislike) {
      // if (views) {
      dislike = dislike + 1;
      // }
      return dislike;
    },);
  },

  updateReplyLikeCount(key) {
    var topicRef = db.ref('replies').child(key).child('like');

    topicRef.transaction(function (like) {
      // if (views) {
      like = like + 1;
      // }
      return like;
    },);
  },

  getCourses(callback) {
    const courseRef = db.ref('courses');
    courseRef.on('value', function(snapshot) {
      callback(snapshot.val());
    });
  },

  subscribeCourse(courseId, userid) {
    const subRef = db.ref('subscribes');
    const subPush = subRef.push();
    subPush.set({
      user: userid,
      course: courseId,
    })
    var courseRef = db.ref('courses').child(courseId).child('subCount');
    courseRef.transaction(function (subCount) {
      // if (views) {
      subCount = subCount + 1;
      // }
      return subCount;
    });
  },

  getFavoriteThreads(userid,callback) {
    console.log("user " + userid)
    //let thread_ids = []
    //let threads = []
    const favRef = db.ref('threadFavourite').orderByChild("user_id").equalTo(userid);
    // favRef.once('value', function(snapshots) {
    //   //callback(snapshot);
    //   if (snapshots) {
    //     snapshots.forEach(function (snapshot) {
    //       // console.log(snapshot.val().thread)
    //       // let thread_id = snapshot.val().thread
    //       // thread_ids.push(thread_id)
    //       let id = snapshot.val().thread
    //       this.getThreadByKey(id,function(thread){
    //         threads.push(thread)
    //       })
    //     })
    //   } else {
    //     console.log("no record")
    //   }
    // })
    //return threads
    favRef.once('value', function(snapshots){
      callback(snapshots)
    })
    // return thread_ids
  },

  getSubCourses (userid, callback) {
    const subRef = db.ref('subscribes').orderByChild("user").equalTo(userid);
    subRef.on('value', function(snapshot) {
      callback(snapshot.val());
    });
  },

  unsubscribeCourse(courseId, userid) {
    var subRef = db.ref('subscribes').orderByChild('user').equalTo(userid)
    subRef.once('value', function (pairs) {
      if (pairs) {
        pairs.forEach(function (snapshot) {
          let pair = snapshot.val()
          console.log(pair)
          if (pair.course == courseId) {
            //console.log("cancelling like")
            snapshot.ref.remove()
          }
        })
      }
    })
    var courseRef = db.ref('courses').child(courseId).child('subCount');
    courseRef.transaction(function (subCount) {
      // if (views) {
      subCount = subCount - 1;
      // }
      return subCount;
    });
  },
  checkSubscribeState(course_Id, user_id, callback) {
    var subscribesRef = db.ref('subscribes').orderByChild('user').equalTo(user_id)
    subscribesRef.once('value', callback)
  }


}