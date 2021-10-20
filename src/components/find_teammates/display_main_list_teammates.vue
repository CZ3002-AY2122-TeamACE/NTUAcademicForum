<!-- The main page where all requests under a course is displayed
TODO:
 {{courseViewing}}

-->
<template>
  <div>
    <div>
      <b-jumbotron bg-variant="secondary" text-variant="light">
        <template #header><p class="text-center font-weight-bolder"> Search for Teammates</p> </template>
        <p class="text-center text-light bg-secondary">Course {{this.$route.params.id}}</p>
      </b-jumbotron>
    </div>

    <div class="d-flex flex-row-reverse bd-highlight">
      <div class="p-2 bd-highlight">
        <b-button variant="secondary" v-if="!isHavePost" v-on:click="onClickButton">Post Request</b-button>
        <b-button variant="outline-secondary" v-if="isHavePost"  v-on:click="onClickButton">Edit Request</b-button>
      </div>
    </div>

    <div>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="All Request" active>
            <b-card-text class="text-center">
              <hr>
              <div class="row tb-buffer" v-for="t in requests" v-bind:key="t.user">
                <div class="col">
                  <div class=h-100 d-inline-block style="background-color: #eee;">{{t.index}}</div>
                </div>
                <div class="col">
                  <div class=h-100 d-inline-block style="background-color: #eee;">Current {{t.currentMemberNum}} members</div>
                </div>
                <div class="col">
                  <div class=h-100 d-inline-block style="background-color: #eee;">{{t.memberNumNeeded}} members needed</div>
                </div>
                <div class="col">
                  <div class=h-100 d-inline-block style="background-color: #eee;"> {{t.interestedUsersNum}} Interests Received</div>
                </div>
                <div class="col">
                  <div class=h-100 d-inline-block style="background-color: #eee;"> <b-avatar variant="secondary" size="sm"></b-avatar> {{t.userName}}</div>
                </div>
                <div class="col">
                  <div v-if="checkApplyEligibility(t)" class="col">
                    <b-button size="sm" variant="outline-primary" v-on:click="onClickInterestButton(t)" class="col-5">I'm interests</b-button>
                  </div>
                  <div v-else-if="checkIsSameUser(t)" class="col">
                    <b-button disabled size="sm" varient="outline-secondary" class="col-5">Disabled</b-button>
                  </div>
                  <div v-else class="col">
                    <b-button disabled size="sm" variant="outline-warning" class="col-5">Pending</b-button>
                  </div>
                </div>
              </div>

            </b-card-text>
          </b-tab>

          <b-tab title="My Request">
            <b-card-text class="text-center">
              Tab contents 2
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "display_main_list_teammates",

  computed: {
    requests() {
      return this.$store.state.requests;
    },

    isHavePost() {
      return this.$store.state.isHavePost;
    },
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

  mounted() {
    this.$store.commit('setCourseViewing', this.$route.params.id)
    this.$firebaseApi.getSearchTeammatesRecord(this.$store.state.courseViewing, this.$store.state.currentUser.name)
  },

  methods: {
    onClickButton() {
      this.$router.replace({ name: "teammates_main_edit", params: { id: this.$route.params.id} })
    },

    onClickInterestButton(record) {
      this.$firebaseApi.indicateInterestsTeam(record, this.$store.state.currentUser.name);
      location.reload()
    },

    /**
     * Check if the user is eligible to indicate her/his interests
     * @param record
     * @return {boolean}
     */
    checkApplyEligibility(record) {
      let currentUser = this.$store.state.currentUser.name
      let isSameUser = record.userName === currentUser;

      let isShowedInterests = this.checkIfUserInJsonValue(record.interestedUsers, currentUser)
      if (isShowedInterests || isSameUser) {
        return false
      } else {
        return true
      }
    },

    checkIsSameUser(record) {
      let currentUser = this.$store.state.currentUser.name
      let isSameUser = record.userName === currentUser;
      return isSameUser
    },

    checkIfUserInJsonValue(jsonObject, currentUser) {
      for (let key in jsonObject) {
        let user = jsonObject[key]
        if (user === currentUser) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style scoped>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.tb-buffer {
  margin-top:20px;
  margin-bottom: 20px;
}
</style>