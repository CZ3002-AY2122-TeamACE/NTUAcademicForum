<template>
  <div>
      <div class="alert alert-danger" v-if="this.errors.length > 0">
        <ul>
          <li v-for="(error, index) in this.errors" :key="index">{{ error }}</li>
        </ul>
      </div>
      <b-row align-h="center">

        <div class="col-md-5">

          <b-input-group size="lg" prepend="Email" class="mt-5">
            <b-form-input type="email" v-model="email" placeholder="email"></b-form-input>
          </b-input-group>

          <b-input-group size="lg" prepend="Password" class="mt-5">
            <b-form-input type="password" v-model="password" placeholder="password"></b-form-input>
          </b-input-group>

          <div class="mt-5">
            <b-button size="lg" block variant="dark" type="submit" v-on:click="login">Login</b-button>
          </div>
        </div>
      </b-row>

<!--    <div v-if="errors.length > 0">-->
<!--      <div v-for="e in errors"-->
<!--           :key="e"> e </div>-->
<!--    </div>-->
  </div>
</template>

<script>
// import firebase from "firebase/compat/app";
import "firebase/auth";
import main from "../main.js";
import store from "../Store";
export default {
  data() {
    return {
      errors: [],
    };
  },
  computed: {
    email: {
      get() {
        return this.$store.state.auth.email
      },
      set(value) {
        this.$store.commit('setAuthEmail', value)
      }
    },
    password: {
      get() {
        return this.$store.state.auth.password
      },
      set(value) {
        this.$store.commit('setAuthPassword', value)
      }
    }
  },
  methods: {
    login: function () {
      var self = this;
      if(this.$store.state.auth.email == "") {
        this.errors.push('Email address required');
      }

      if(this.$store.state.auth.password == "") {
        this.errors.push('Password required');
      }

      // if(this.$store.state.auth.email !="" && !this.validateEmail(this.$store.state.auth.email)) {
      //   this.errors.push('Invalid email address');
      // }

      if(this.$store.state.auth.password !="" && this.$store.state.auth.password.length < 6) {
        this.errors.push('Password must be at least 6 characters long');
      }

      if(this.errors.length > 0) {

        return false;
      }

      // this.isLoading = true;

      // if everthing ok authenticate
      main.authenticate(this.$store.state.auth.email, this.$store.state.auth.password, function(user) {

        main.getUserByUID(user.user.uid, function(key, val) {

          self.isLoading = false;

          if(key != null && val != null) {


            // save these info into store
            self.$store.commit('setCurrUserId', key);
            self.$store.commit('setCurrUserEmail', user.user.email);
            self.$store.commit('setCurrUserUid', user.user.uid);
            self.$store.commit('setCurrUserStatus', 1);
            store.dispatch("getCurrentUsername")
            store.dispatch("getSubCourses")

            // load user forums
            // main.userForums(user.user.uid, function(response) {
            //   self.$store.commit('setUserForums', response);
            // });

            self.$router.push('/');
          } else {
            alert("Incomplete user info! try creating account with a different email");
          }
        });
      }, function(error) {

        alert(error.message)
      })
      // firebase
      //     .auth()
      //     .signInWithEmailAndPassword(this.email, this.password)
      //     .then(data => {
      //       console.log(data);
      //
      //     })
      //     .catch(error => {
      //       this.error = error;
      //     });
    }
  }
};
</script>

<!--<style lang="scss" scoped>-->
<!--div {-->
<!--  color: inherit;-->
<!--}-->
<!--input {-->
<!--  width: 400px;-->
<!--  padding: 30px;-->
<!--  margin: 20px;-->
<!--  font-size: 21px;-->
<!--}-->
<!--button {-->
<!--  width: 400px;-->
<!--  height: 75px;-->
<!--  font-size: 100%;-->
<!--}-->
<!--.error {-->
<!--  color: red;-->
<!--}-->
<!--</style>-->