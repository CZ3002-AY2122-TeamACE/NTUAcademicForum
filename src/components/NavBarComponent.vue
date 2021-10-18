<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">
        <b-button size="sm" v-b-toggle.sidebar-no-header v-if ="this.$store.state.currentUser.status == 1">
          <b-icon icon = 'list'></b-icon>
        </b-button>
<!--        <router-link size="sm" class="ui button secondary" to="/login" v-else>Login</router-link>-->
      </b-navbar-brand>


      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link size="sm" class="btn btn-secondary" to="/">Home</router-link> |
          <router-link size="sm" class="btn btn-secondary" to="/login">Login</router-link> |
          <router-link size="sm" class="btn btn-secondary" to="/secret">Secret</router-link> |
          <router-link size="sm" class="btn btn-secondary" to="/register">Register</router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
<!--          <b-nav-form>-->
<!--            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>-->
<!--            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>-->
<!--          </b-nav-form>-->

<!--          <b-nav-item-dropdown text="Lang" right>-->
<!--            <b-dropdown-item href="#">EN</b-dropdown-item>-->
<!--            <b-dropdown-item href="#">ES</b-dropdown-item>-->
<!--            <b-dropdown-item href="#">RU</b-dropdown-item>-->
<!--            <b-dropdown-item href="#">FA</b-dropdown-item>-->
<!--          </b-nav-item-dropdown>-->

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#" v-if="loggedIn" @click="signOut">Sign Out</b-dropdown-item>
            <b-dropdown-item href="#" v-else @click="signIn">Sign In</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/auth";
export default {
  name: 'NavBarComponent',
  mounted() {
    this.setupFirebase();
  },
  methods: {
    setupFirebase() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          console.log("signed in");
          this.loggedIn = true;
        } else {
          // No user is signed in.
          this.loggedIn = false;
          console.log("signed out", this.loggedIn);
        }
      });
    },
    signOut() {
      this.$store.dispatch('clearUserData');
      firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.replace({ name: "login" });
          });
    },
    signIn() {
      this.$router.replace({ name: "login" });
    }
  },
  data() {
    return {
      loggedIn: false
    };
  }
};
</script>


<style scoped>

</style>
