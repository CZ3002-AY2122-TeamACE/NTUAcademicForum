<template>
  <div>

    <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow bg-variant="dark" text-variant="light">
      <template #default="{ hide }">
        <div class="p-3">
          <h4 id="sidebar-no-header-title">StudyHub@NTU</h4>
          <p>
          </p>
          <div class="mb-2">
            <b-avatar badge badge-variant="success" src="../assets/default profile.jpeg" size="4em"></b-avatar>
            {{username}}
          </div>

          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item active>
                <b-button block bg-variant="light" v-b-toggle="'collapse1'">
                <b-icon icon='book'></b-icon>Subscribed Courses</b-button>
              </b-nav-item>

              <b-collapse visible id="collapse1">
                <div class="col text-center" v-for = "(value, key, index) in subCourses" :key="index" >
                  <b-button block @click="hide" variant="dark">
                    <router-link v-bind:to="'/course/'+value.course">{{value.course}}</router-link></b-button>
                </div>
              </b-collapse>

<!--              <b-button-group vertical>-->
<!--                <b-button variant="dark" size = sm>21S1-CZ3002-10358</b-button>-->
<!--                <b-button variant="dark" size = sm>21S1-CZ3002-10358</b-button>-->
<!--              </b-button-group>-->

<!--              <b-nav-item active @click="hide"><b-button bg-variant="light" block @click="hide"><b-icon icon='envelope'></b-icon>-->
<!--                My profile</b-button>-->
<!--              </b-nav-item>-->
              <b-nav-item active>
                <b-button block bg-variant="light" @click="hide">
                  <router-link block class="btn btn-secondary" bg-variant="light" v-bind:to="'/profilePage'">
                    <b-icon icon='envelope'></b-icon>
                    My profile</router-link>
                </b-button>
              </b-nav-item>

              <b-nav-item active>
                <b-button block bg-variant="light" @click="hide">
                  <router-link block class="btn btn-secondary" bg-variant="light" v-bind:to="'/favourite'">
                    <b-icon icon='star'></b-icon>
                   Favorites</router-link>
                </b-button>
              </b-nav-item>



            </b-nav>
          </nav>
          <b-button variant="light" block @click="hide">Close Sidebar</b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>

export default {
  name: "SideBarComponent",
  computed: {
    subCourses() {
      return this.$store.state.subCourses
    },
    username() {
      return this.$store.state.currentUser.name
    }
  },
  mounted: function() {
  }
}
</script>

<style>

</style>
