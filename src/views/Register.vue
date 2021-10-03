<template>
  <div>
<!--    <div v-if="error" class="error">{{error.message}}</div>-->
    <form @submit.prevent="pressed">
      Register
      <div class="alert alert-danger" v-if="this.errors.length > 0">
        <ul>
          <li v-for="(error, index) in this.errors" :key="index">{{ error }}</li>
        </ul>
      </div>
      <div class="email">
        <input type="email" v-model="email" placeholder="email">
      </div>
      <div class="password">
        <input type="password" v-model="password" placeholder="password">
      </div>
      <button type="submit">Register</button>
    </form>
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
        errors: []
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
      async pressed()
{
  var self = this;
  this.errors = [];
        if(this.$store.state.auth.email == "") {
          this.errors.push('Email address required');
        }
        if(this.$store.state.auth.password == "") {
          this.errors.push('Password required');
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
      // validateEmail(email) {
      //   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      //   return re.test(String(email).toLowerCase());
      // }
    }

  // methods: {
  //   async pressed() {
  //     try{
  //       const user = firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
  //       console.log(user)
  //       this.$router.replace({name: "secret"});
  //     }catch (err) {
  //       console.log(err)
  //     }
  //
  //   }
  // },
  // data() {
  //   return {
  //     email: "",
  //     password: '',
  //     error: ''
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.error {
  color: red;
  font-size: 18px;
}
input {
  width: 400px;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
}
button {
  width: 400px;
  height: 75px;
  font-size: 100%;
}
</style>