import Vue from 'vue'
import Vuex from 'vuex'
import main from './main.js'
Vue.use(Vuex);
export default new Vuex.Store(
    {
        state: {
            auth: {
                email: "",
                password: "",
                name: ""
            },
            currentUser: {
                id: "",       // this id is the database key for this record
                name: "",
                email: "",
                uid: "",      // this is is the user authenticated object
                status: 0   // 0=logout 1=login
            },
            thread: {         // this object will be used when adding and editing forum
                title: "",
                content: ""
            },
            courseThreads:[],
            userPosts: [],
            course: {
                id:"",
                name: "",
                information:"",
                subCount:""
            },
            subscribeCurrentCourse: false,
            currentThread: {},
            favouritedCurrentThread: false,
            likeCurrentThread: false,
            currentThreadReplies: [],
            key:"",
            reply: "",
            sourceUsername: "",
            courses: [],
            subCourses: [],
            favoriteThreads: [],
        },
        mutations: {
            setAuthEmail(state, data) {
                state.auth.email = data
            },
            setAuthPassword(state, data) {
                state.auth.password = data
            },
            setAuthName(state, data) {
                state.auth.name = data
            },
            setCurrUserId(state, data) {
                state.currentUser.id = data
            },
            setCurrUserName(state, data) {
                state.currentUser.name = data
            },
            setCurrUserEmail(state, data) {
                state.currentUser.email = data
            },
            setCurrUserUid(state, data) {
                state.currentUser.uid = data
            },
            setCurrUserStatus(state, data) {
                state.currentUser.status = data
            },
            setThreadContent(state, data) {
                state.thread.content = data
            },
            setThreadTitle(state, data) {
                state.thread.title = data
            },
            setUserPosts(state, data) {
                state.userPosts = data
            },
            setCourseName(state,data){
                state.course.name = data
            },
            setCourseID(state,data){
                state.course.id = data
            },
            setCourseInformation(state,data) {
                state.course.information = data
            },
            setCourseSubCount(state,data){
                state.course.subCount = data
            },
            setCourseThread(state, data) {
                state.courseThreads = data
            },
            setCurrentThread(state, data) {
                state.currentThread = data
            },
            setKey(state, data) {
                state.key = data
            },

            setCurrentThreadReplies(state, data) {
                state.currentThreadReplies = data
            },
            setReply(state, data) {
                state.reply = data
            },
            setFavouriteStateForCurrentThread(state, data) {
                state.favouritedCurrentThread = data
            },
            setLikeStateForCurrentThread(state, data) {
                state.likeCurrentThread = data
            },
            setUpstreamUserName(state,data) {
                state.sourceUsername = data
            },
            setCourses(state, data) {
                state.courses = data
            },
            setSubscribeCurrentCourse(state, data){
                state.subscribeCurrentCourse = data
            },
            setSubCourses(state, data) {
                state.subCourses = data
            },
            setFavoriteThreads(state, data) {
                state.favoriteThreads = data
            }
        },
        actions: {
            getCurrentUser({commit}) {
                main.getCurrentUser(function(user) {
                    if(user) {
                        main.getUserByUID(user.uid, function(key, val) {
                            if(key != null && val != null) {
                                commit('setCurrUserId', key);
                                commit('setCurrUserName', user.name);
                                commit('setCurrUserEmail', user.email);
                                commit('setCurrUserUid', user.uid);
                                commit('setCurrUserStatus', 1);
                            }
                        })
                    }
                });
            },
            getCurrentUsername({commit}){
                main.getUserByID(this.state.currentUser.id,function (user){
                    if(user){
                        commit('setCurrUserName',user.val().name)
                    } else {
                        console.log("user not exist")
                    }
                })
            },
            clearUserData({commit}) {
                commit('setCurrUserId', '');
                commit('setCurrUserName', '');
                commit('setCurrUserEmail', '');
                commit('setCurrUserUid', '');
                commit('setCurrUserStatus', 0);
                commit('setAuthEmail', '');
                commit('setAuthPassword', '');
                commit('setAuthName', '');
            },
            getCourseInfo({commit}) {
                main.getCourseByID(this.state.course.id, function (snapshot) {
                    if(snapshot){
                        snapshot.forEach(function (course) {
                            commit('setCourseName', course.val().name)
                            commit('setCourseInformation', course.val().information)
                            commit('setCourseSubCount',course.val().subCount)
                        })
                    }
                })
            },
            getThreadInfo({commit}) {
                main.getThreadByKey(this.state.key, function (response) {
                    if(response){
                        commit('setCurrentThread', response)
                    } else {
                        commit('setCurrentThread',null)
                    }
                })
            },
            getCourseThreads({commit}) {
                main.getThreadsByCourse(this.state.course.id, function(response) {
                    if(response) {
                        commit('setCourseThread', response);
                    } else {
                        commit('setCourseThread', []);
                    }
                });
            },
            getThreadReplies({commit}){
                main.getReplyOfThread(this.state.key,function (response){
                    if(response) {
                        commit('setCurrentThreadReplies', response);
                    } else {
                        commit('setCurrentThreadReplies', []);
                    }
                })
            },
            getCourses({commit}) {
                main.getCourses(function(response) {
                    if(response) {
                        commit('setCourses', response);
                    } else {
                        commit('setCourses', []);
                    }
                });
            },

            getSubCourses({commit}) {
                main.getSubCourses(this.state.currentUser.id,function(response) {
                    if(response) {
                        commit('setSubCourses', response);
                    } else {
                        commit('setSubCourses', []);
                    }
                });
            },

            getFavoriteThreads({commit}) {
                // main.getFavoriteThreads(this.state.currentUser.id,function(response) {
                //     if(response) {
                //         console.log("favourite: " + response)
                //         commit('setFavoriteThreads', response);
                //     } else {
                //         console.log("no favourite")
                //         commit('setFavoriteThreads', []);
                //     }
                // });


                // let thread_ids = main.getFavoriteThreads(this.state.currentUser.id)
                // //console.log(thread_ids)
                // let threads = []
                // for(let id in thread_ids){
                //     main.getThreadByKey(id, function(response) {
                //         threads.push(response)
                //     })
                // }
                // console.log(threads)
                // commit('setFavoriteThreads',threads)

                let threads = []
                main.getFavoriteThreads(this.state.currentUser.id, function (snapshots) {
                    if (snapshots) {
                        snapshots.forEach(function (snapshot) {
                            console.log(snapshot.val().thread)
                            let id = snapshot.val().thread
                            main.getThreadByKey(id,function(thread){
                                thread.key = id
                                threads.push(thread)
                            })
                        })
                        //console.log(threads)
                        commit('setFavoriteThreads',threads)
                    } else {
                        console.log("no record")
                        commit('setFavoriteThreads',[])
                    }
                })
                //console.log(threads)
            },

            getFavouriteStateForCurrentThread({commit}) {
                let user_id = this.state.currentUser.id
                let thread_id = this.state.key
                let favourited = false
                console.log("thread " + this.state.key + " user " + this.state.currentUser.id)
                main.checkFavouriteCurrentThread(user_id,function (pairs) {
                    if (pairs) {
                        pairs.forEach(function (snapshot) {
                            if(snapshot){
                                let pair = snapshot.val()
                                //console.log("thread " + pair.thread + " user " + pair.user_id)
                                if (pair.thread == thread_id) {
                                    favourited = true
                                }
                            }
                        })
                    }
                    if(favourited){
                        commit('setFavouriteStateForCurrentThread',true)
                    } else {
                        commit('setFavouriteStateForCurrentThread',false)
                    }
                })
            },
            getLikeStateForCurrentThread({commit}) {
                let user_id = this.state.currentUser.id
                let thread_id = this.state.key
                let liked = false
                console.log("thread " + this.state.key + " user " + this.state.currentUser.id)
                main.checkLikeCurrentThread(user_id,function (pairs) {
                    if (pairs) {
                        pairs.forEach(function (snapshot) {
                            if(snapshot){
                                let pair = snapshot.val()
                                //console.log("thread " + pair.thread + " user " + pair.user_id)
                                if (pair.thread == thread_id) {
                                    liked = true
                                }
                            }
                        })
                    }
                    if(liked){
                        commit('setLikeStateForCurrentThread',true)
                    } else {
                        commit('setLikeStateForCurrentThread',false)
                    }
                })
            },

            getSubscribeStateForCurrentCourse({commit},course_id) {
                let user_id = this.state.currentUser.id
                let subscribed = false
                console.log("course " + course_id + " user " + this.state.currentUser.id)
                main.checkSubscribeState(course_id, user_id,function (pairs) {
                    if (pairs) {
                        pairs.forEach(function (snapshot) {
                            if(snapshot){
                                let pair = snapshot.val()
                                //console.log("course " + pair.course + " user " + this.state.currentUser.id)
                                if (pair.course == course_id) {
                                    subscribed = true
                                }
                            }
                        })
                    }
                    if(subscribed){
                        commit('setSubscribeCurrentCourse',true)
                    } else {
                        commit('setSubscribeCurrentCourse',false)
                    }
                })
            }
        },
    }
)