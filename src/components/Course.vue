<template>
  <div class="item">
    <div class="ui container">
      <div class="ui vertical segment">
        <div class="ui stackable grid">
          <div class="eleven wide column" :id="id">
            <router-link v-bind:to="'/course/'+course.id">{{course.id}}</router-link>
            <div class="content">{{course.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Course",
  props:['course','id'],
  data() {
    return{
      courseId:this.id,
    }
  }
}
</script>

<style scoped>

</style>