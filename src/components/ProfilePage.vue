<template>
<div class="ui container">
  <div class="card">
    <h5 class="card-header">User Profile</h5>
    <div class="card-body">
  <b-tabs content-class="mt-3">
    <b-tab title="View Profile" active>
      <div class="row justify-content-center">
        <div class="card" style="width: 50rem;">
          <div class="card-body">
            <h4 class="card-header">Bio</h4>
            <div class="card-body"><div class="markdown-body" v-html="user.bio"></div></div>
          </div>
        </div>
      </div>
      <br>
      <div class="row justify-content-around" >
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h4 class="card-header">Course of Study</h4>
            <div class="card-body"><h6>{{user.major}}</h6></div>
          </div>
        </div>

        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h4 class="card-header">Year of Study</h4>
            <div class="card-body"><h6>AY {{user.AY}}</h6></div></div>

        </div>

      </div>
      <br>

      <div class="row justify-content-around" >

        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h4 class="card-header">Phone</h4>
          <div class="card-body"><h6>+{{user.phone}}</h6></div></div>
        </div>

        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h4 class="card-header">Telegram handle</h4>
          <div class="card-body"><h6>{{user.tele}}</h6></div></div>
        </div>

      </div>

    </b-tab>
    <b-tab title="Edit Profile">
        <div class="row justify-content-around" >

          <div class="col-4">
            <label for="course_of_study"><h4>Course of Study</h4></label>
            <input type="text" class="form-control" v-model="major" id="course_of_study" placeholder="course of study" title="enter your course of study here.">
          </div>


          <div class="col-4">
            <label for="AY"><h4>AY</h4></label>
            <input type="text" class="form-control" v-model="AY" id="AY" placeholder="Year of Study " title="Year of Study">
          </div>

        </div>
        <br>

        <div class="row justify-content-around" >

          <div class="col-4">
            <label for="phone"><h4>Phone</h4></label>
            <input type="text" class="form-control" v-model="phone" id="phone" placeholder="Phone number if any." title="enter your phone number if any.">
          </div>

          <div class="col-4">
            <label for="tele"><h4>Telegram Handle</h4></label>
            <input type="text" class="form-control" v-model="tele" id="tele" placeholder="Telegram handle if any." title="enter your telegram handle if any.">
          </div>

        </div>
        <br>

        <div class="row justify-content-center">
          <div class="col-10">
            <label for="bio"><h4>Enter your Bio here</h4></label>
            <div id="bio">
              <vue-editor v-model="bio"></vue-editor>
            </div>

          </div>
        </div>
        <hr>
        <div class="row justify-content-center">
          <div class="col-10">
          <b-button size="lg" block variant="dark" type="submit" v-on:click="save">Save</b-button>
          </div>
        </div>



    </b-tab>
  </b-tabs>
      </div>
  </div>

  </div>


</template>

<script>
import { VueEditor } from "vue2-editor";
import main from '../main.js';
export default {
  name: "ProfilePage",
  components: {
    VueEditor
  },
  data() {
    return {
      // "user":{
      //   "bio": "This is the bio",
      //   "AY": 3,
      //   "major": "computer science",
      //   "phone": "999999999",
      //   "tele": "@user"
      //
      // }
    };
  },
  computed: {
    user() {
      return this.$store.state.currentUser
    },
    AY: {
      get() {
        return this.$store.state.currentUser.AY
      },
      set(value) {
        this.$store.commit('setCurrUserAY', value)
      }
    },
    bio: {
      get() {
        return this.$store.state.currentUser.bio
      },
      set(value) {
        this.$store.commit('setCurrUserBio', value)
      }
    },
    phone: {
      get() {
        return this.$store.state.currentUser.phone
      },
      set(value) {
        this.$store.commit('setCurrUserPhone', value)
      }
    },
    tele: {
      get() {
        return this.$store.state.currentUser.tele
      },
      set(value) {
        this.$store.commit('setCurrUserTele', value)
      }
    },
    major: {
      get() {
        return this.$store.state.currentUser.major
      },
      set(value) {
        this.$store.commit('setCurrUserMajor', value)
      }
    },
  },
  methods: {
    save: function () {
      main.updateProfile(this.$store.state.currentUser.id,this.AY,this.bio,this.phone,this.tele,this.major)
      location.reload()

    }
  },
  created() {
    setTimeout(
        () => {
          if(this.$store.state.currentUser.status != 1) {
            this.$router.push('/login');
          }
        },
        1500
    )

  },
}
</script>

<style scoped>

</style>