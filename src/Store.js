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
            },
            currentThread: {},
            favouritedCurrentThread: false,
            currentThreadReplies: [],
            key:"",
            reply: "",
            sourceUsername: "",
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
            // setForumTitle(state, data) {
            //     state.forum.title = data
            // },
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
            setUpstreamUserName(state,data) {
                state.sourceUsername = data
            }
        },
        actions: {
            getCurrentUser({commit}) {
                main.getCurrentUser(function(user) {
                    if(user) {
                        main.getUserByUID(user.uid, function(key, val) {
                            if(key != null && val != null) {
                                commit('setCurrUserId', key);
                                // commit('setCurrUserName', user.displayName);
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
                        //console.log(user.val().name)
                        commit('setCurrUserName',user.val().name)
                    } else {
                        console.log("user not exist")
                    }
                })
            },
            clearUserData({commit}) {
                commit('setCurrUserId', '');
                // commit('setCurrUserName', '');
                commit('setCurrUserEmail', '');
                commit('setCurrUserUid', '');
                commit('setCurrUserStatus', 0);
                commit('setAuthEmail', '');
                commit('setAuthPassword', '');
                commit('setAuthName', '');
            },
            getCourseInfo({commit}) {
                main.getCourseByID(this.state.course.id, function (snapshot) {
                    snapshot.forEach(function (course) {
                        commit('setCourseName', course.val().name)
                        commit('setCourseInformation', course.val().information)
                    })
                })
            },
            getThreadInfo({commit}) {
                main.getThreadByKey(this.state.key, function (response) {
                        commit('setCurrentThread', response)
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
            getFavouriteStateForCurrentThread({commit}) {
                let user_id = this.state.currentUser.id
                let thread_id = this.state.key
                let favourited = false
                main.checkFavouriteCurrentThread(user_id,function (pairs) {
                    if (pairs) {
                        pairs.forEach(function (snapshot) {
                            let pair = snapshot.val()
                            if (pair.thread == thread_id) {
                                favourited = true
                                console.log("you have favourited the thread")
                            }
                        })
                    }
                    if(favourited){
                        commit('setFavouriteStateForCurrentThread',true)
                    }
                })
                /*
                console.log(favourited)
                if(favourited){
                    console.log("setting status...")
                    commit('setFavouriteStateForCurrentThread',true)
                }

                 */
            }
        },
    }
)