import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        courseViewing: "CZ3002",
        isHavePost: false,
        currentUser: "Chris",
        requests: [],
        postRequestUnderCourse: null,
    },
    mutations: {
        updateRequest(currentState, records) {
            this.state.requests = records
        },

        setHavePost(currentState, b) {
            this.state.isHavePost = b;
        },

        setPostRequestUnderCourse(currentState, record) {
            this.state.postRequestUnderCourse = record
        }
    },
})