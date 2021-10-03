<template>
  <div>
    <b-container class="bv-example-row" fluid>
      <b-form-row class="items" v-for="forum in forums" :key="forum.id">
          <b-col cols="7" sm="6">
            <div>{{ forum.name }}</div>
          </b-col>
          <b-col cols="7" sm="1">
            <div class="item">
              <i class="align justify icon"></i> 10
            </div>
          </b-col>
          <b-col cols="7" sm="1">
            <div class="item">
              <i class="star outline icon"></i> 10
            </div>
          </b-col>
          <b-col cols="7" sm="1">
            <div class="item">
              <i class="heart outline icon"></i> 10
            </div>
          </b-col>
          <b-col cols="7" sm="1">
            <img src="../assets/logo.png" class="ui avatar image">
            <a>vue</a>
          </b-col>


      </b-form-row>

    </b-container>
  </div>
</template>

<script>
export default {
name: "Thread",
  props: ['forums']
}
</script>

<style scoped>

</style>