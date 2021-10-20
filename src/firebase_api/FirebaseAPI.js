import firebase from "firebase/compat";
import store from '../Store';


/**
 * Helper to do CRUD operation with Firebase
 */
export default class FirebaseAPI {
    /**
     * Initializes the firebase instance
     * Replace FIREBASE_CONFIG if needed
     */
    constructor() {
        const FIREBASE_CONFIG = {
            apiKey: "AIzaSyAcNQNGP9tKKBz4-Pz_wgGxkqHJb4rKJEc",
            authDomain: "ntuacademicforum-f11b9.firebaseapp.com",
            databaseURL: "https://ntuacademicforum-f11b9-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "ntuacademicforum-f11b9",
            storageBucket: "ntuacademicforum-f11b9.appspot.com",
            messagingSenderId: "927176632912",
            appId: "1:927176632912:web:673d21fe6ecf3735677f55"
        };

        console.log("Initialize the firebase")
        firebase.initializeApp(FIREBASE_CONFIG);

        // store frequently-used reference
        this.database = firebase.database();
        this.swapIndexReqeustsRef = this.database.ref("/swap_requests/");
        this.searchTeammatesRef = this.database.ref("/search_teammates/");
    }

    createSwapIndexRecord(record, course) {
        this.swapIndexReqeustsRef.child(course).child(record.user).update(record)
        console.log("Create new swap id to firebase_api")
    }

    createSearchTeammatesRecord(record, course) {
        this.searchTeammatesRef.child(course).child(record.userName).update(record).then(r => {
            console.log("Create new swap id to firebase_api" + r)
        })
    }

    /**
     * Queries Swap Index Record and check if the current user has post the record or not
     * @param course string, e.g. "CZ3002"
     */
    getSwapIndexRecord(course, currentUser) {
        this.swapIndexReqeustsRef.child(course).once("value").then((snapshot) => {
            let records = []
            let isHavePost = false
            let selfPostRequest = {}
            snapshot.forEach((childShot) => {
                let record = childShot.val()

                let interestedUsers = record.interestedUsers;
                if (interestedUsers == null) {
                    interestedUsers = []
                }
                let recordFormatted = {
                    courseId: record.courseId,
                    sourceIndex: record.sourceIndex,
                    targetIndexes: record.targetIndexes,
                    user: record.user,
                    interestedUsers: interestedUsers,
                    interestedUserNum: record.interestedUserNum  // to display the number of people in the list
                };
                records.push(recordFormatted)

                if (record.user == currentUser) {
                    isHavePost = true
                    selfPostRequest = recordFormatted
                }
            })
            store.commit("updateRequest", records)
            store.commit("setHavePost", isHavePost)
            store.commit("setPostRequestUnderCourse", selfPostRequest)
        })
    }

    /**
     * @param course string, e.g. "CZ3002"
     */
    getSearchTeammatesRecord(course, currentUser) {
        this.searchTeammatesRef.child(course).once("value").then((snapshot) => {
            let records = []
            let isHavePost = false
            let selfPostRequest = {}
            snapshot.forEach((childShot) => {
                let record = childShot.val()

                let interestedUsers = record.interestedUsers;
                if (interestedUsers == null) {
                    interestedUsers = []
                }
                let recordFormatted = {
                    userName: record.userName,
                    currentMemberNum: record.currentMemberNum,
                    memberNumNeeded: record.memberNumNeeded,
                    index: record.index,
                    interestedUsers: interestedUsers,
                    interestedUsersNum: record.interestedUsersNum,
                    additionalInfo: record.additionalInfo,
                    courseId: record.courseId
                };
                records.push(recordFormatted)

                if (record.userName == currentUser) {
                    isHavePost = true
                    selfPostRequest = recordFormatted
                }
            })
            store.commit("updateRequest", records)
            store.commit("setHavePost", isHavePost)
            store.commit("setPostRequestUnderCourse", selfPostRequest)
        })
    }

    /**
     *
     * @param record
     * @param user
     * fixme: conflicting
     */
    indicateInterests(record, user) {
        this.swapIndexReqeustsRef.child(record.courseId).child(record.user).child("interestedUsers").push(user)
        this.swapIndexReqeustsRef.child(record.courseId).child(record.user).child("interestedUserNum")
            .set(record.interestedUserNum + 1).then(r => {
                console.log("The interest num incremented" + r);

        })
    }

    /**
     *
     * @param record
     * @param user
     * fixme: conflicting
     */
    indicateInterestsTeam(record, user) {
        this.searchTeammatesRef.child(record.courseId).child(record.userName).child("interestedUsers").push(user)
        this.searchTeammatesRef.child(record.courseId).child(record.userName).child("interestedUsersNum")
            .set(record.interestedUsersNum + 1).then(r => {
            console.log("The interest num incremented" + r);
        })
    }


    /**
     * Delete the user's request under the course
     * @param course
     * @param user
     */
    deletePostSwapIndexRequest(course, user) {
        this.swapIndexReqeustsRef.child(course).child(user).remove().then(r => {
            console.log("Record is removed" + r);
            this.getSwapIndexRecord(course, user);
        })
    }

    deleteSearchTeammateRequest(course, user) {
        this.searchTeammatesRef.child(course).child(user).remove().then(r => {
            console.log("Record is removed" + r);
        })
    }
}