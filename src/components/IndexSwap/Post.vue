<template>
<div>
  <div>
    <b-button variant="primary" v-on:click="submit">Post</b-button>
    <b-card bg-variant="light">
      <b-form-group
          label-cols-lg="3"
          label="Index Swap Post"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
      >
        <b-form-group
            label="Course"
            label-for="course"
            label-cols-sm="3"
            label-align-sm="right"
        >
          <b-form-input id="course"></b-form-input>
        </b-form-group>
        <b-form-group
            label="Source Index"
            label-for="source-index"
            label-cols-sm="3"
            label-align-sm="right"
        >
          <b-form-input id="source-index"></b-form-input>
        </b-form-group>

        <b-form-group
            label="Target Indexes"
            label-for="target-indexes"
            label-cols-sm="3"
            label-align-sm="right"
        >
          <b-form-input id="target-indexes"></b-form-input>
        </b-form-group>
      </b-form-group>
    </b-card>
  </div>
</div>
</template>

<script>
import Database from "@/components/Database";
export default {
  name: "Post",

  methods: {
    submit() {

    }
  }
}
</script>

<style scoped>

</style>