<template>
  <div>

    <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow bg-variant="dark" text-variant="light">
      <div> <!--#default="{ hide }"-->
        <div class="p-3">
          <h4 id="sidebar-no-header-title">LearningHub@NTU</h4>
          <p>
          </p>
          <div class="mb-2">
            <b-avatar badge badge-variant="success" src="https://placekitten.com/300/300" size="4em"></b-avatar>
          </div>
          <nav class="mb-3">
            <b-nav vertical>

              <b-nav-item active><b-button bg-variant="light" block @click="hide"><b-icon icon='book'></b-icon>
                Courses</b-button>
              </b-nav-item>
              <b-button-group vertical>
                <b-button variant="dark" size = sm>21S1-CZ3002-10358</b-button>
                <b-button variant="dark" size = sm>21S1-CZ3002-10358</b-button>
                <b-button variant="dark" size = sm>21S1-CZ3002-10358</b-button>
              </b-button-group>

              <b-nav-item active @click="hide"><b-button bg-variant="light" block @click="hide"><b-icon icon='envelope'></b-icon>
                My profile</b-button>
              </b-nav-item>

              <b-nav-item active @click="hide"><b-button bg-variant="light" block @click="hide"><b-icon icon='star'></b-icon>
                Favorites</b-button>
              </b-nav-item>

            </b-nav>
          </nav>
          <!--<b-button variant="light" block @click="hide">Close Sidebar</b-button>-->
        </div>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "SideBarComponent"
}
</script>

<style>

</style>
