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
                id: "",       // this id is the datebase key for this record
                name: "",
                email: "",
                uid: "",      // this is is the user authenticated object
                status: 0   // 0=logout 1=login
            },
            post: {         // this object will be used when adding and editing forum
                content: ""
            },
            userPosts: [],
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
            setPostContent(state, data) {
                state.post.content = data
            },
            setUserPosts(state, data) {
                state.userPosts = data
            },
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
            clearUserData({commit}) {
                commit('setCurrUserId', '');
                // commit('setCurrUserName', '');
                commit('setCurrUserEmail', '');
                commit('setCurrUserUid', '');
                commit('setCurrUserStatus', 0);
                commit('setAuthEmail', '');
                commit('setAuthPassword', '');
                commit('setAuthName', '');
            }
        }
    }
)