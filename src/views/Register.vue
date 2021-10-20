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
      <b-form-input type="email" aria-describedby="input-live-feedback" v-model="email" placeholder="email"></b-form-input>
    </b-input-group>
        <b-input-group size="lg" prepend="Username" class="mt-5">
          <b-form-input class="form-control" v-model="username" placeholder="user name"></b-form-input>
        </b-input-group>

        <b-input-group size="lg" prepend="Password" class="mt-5">
          <b-form-input type="password" :state="passwordLength" aria-describedby="input-live-feedback" v-model="password" placeholder="password(at least 6 characters)"></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            Enter at least six characters
          </b-form-invalid-feedback>
        </b-input-group>
        <b-input-group size="lg" prepend="Confirm Password" class="mt-5">
          <b-form-input type="password" :state="passwordState" aria-describedby="input-live-feedback" class="form-control" v-model="confirmPassword" placeholder="retype your password">
          </b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            confirm your password
          </b-form-invalid-feedback>
        </b-input-group>

        <div class="mt-5">
          <b-button size="lg" block variant="dark" type="submit" v-on:click="register">Register</b-button>
        </div>
      </div>
  </b-row>
  </div>
</template>
<script>
// import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import main from "../main.js";
export default {
    data() {
      return {
        isLoading: false,
        errors: [],
        password: "",
        confirmPassword: "",
      }
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
      username: {
        get() {
          return this.$store.state.auth.name
        },
        set(value) {
          this.$store.commit('setAuthName', value)
        }
      },
      // password: {
      //   get() {
      //     return this.$store.state.auth.password
      //   },
      //   set(value) {
      //     this.$store.commit('setAuthPassword', value)
      //   }

      // },
      passwordLength() {
        return  this.password.length>5 ? true : false
      },
      passwordState() {
        this.$store.commit('setAuthPassword', null)
        if(this.password == this.confirmPassword && this.password.length>5) {
          this.$store.commit('setAuthPassword', this.password)
        }
        return this.password == this.confirmPassword && this.password.length>5 ? true : false
      }
    },

    methods: {
      register: function()
{
  var self = this;
  this.errors = [];
        if(this.$store.state.auth.email == "") {
          this.errors.push('Email address required');
        }
        if(this.$store.state.auth.password == "") {
          this.errors.push('Password required');
        }
        if(this.$store.state.auth.name == "") {
          this.errors.push('User Name required');
        }
        // if(this.$store.state.auth.name == "") {
        //   this.errors.push('Display name required');
        // }
        // if(this.$store.state.auth.email !="" && !this.validateEmail(this.$store.state.auth.email)) {
        //   this.errors.push('Invalid email address');
        // }
        if(this.$store.state.auth.password !="" && this.$store.state.auth.password.length < 6) {
          this.errors.push('Password must be at least 6 characters long');
        }
        if(this.errors.length > 0) {
          return false;
        }
        this.isLoading = true;
        // if everthing ok authenticate
        main.register(self.$store.state.auth.email, self.$store.state.auth.password, function(user) {

          // // update name
          // api.updateUserDisplayname(self.$store.state.auth.name);
          setTimeout(
              () => {
                self.isLoading = false;
                // insert into firebase db
                const key = main.addUser(self.$store.state.auth.name, user.user.email, user.user.uid);
                // save these info into store
                self.$store.commit('setCurrUserId', key);
                self.$store.commit('setCurrUserName', self.$store.state.auth.name);
                self.$store.commit('setCurrUserEmail', user.user.email);
                self.$store.commit('setCurrUserUid', user.user.uid);
                self.$store.commit('setCurrUserStatus', 1);
                self.$router.push('/');
              },
              1500
          )
        }, function(error) {
          alert(error.message)
        })
      },

    }

}
</script>

<!--<style lang="scss" scoped>-->
<!--//.error {-->
<!--//  color: #ff0000;-->
<!--//  font-size: 18px;-->
<!--//}-->
<!--//input {-->
<!--//  width: 400px;-->
<!--//  padding: 30px;-->
<!--//  margin: 20px;-->
<!--//  font-size: 21px;-->
<!--//}-->
<!--//button {-->
<!--//  width: 400px;-->
<!--//  height: 75px;-->
<!--//  font-size: 100%;-->
<!--//}-->
<!--</style>-->