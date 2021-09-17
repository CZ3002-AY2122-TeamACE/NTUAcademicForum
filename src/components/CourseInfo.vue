<template>
  <div>
    <div class="ui huge header">CZ3002</div>
    <div class="ui black segment">
      <div class="ui black top attached label" style="font-size: large">Course Information</div>
      <p>CZ3002 is Advanced Software Engineering course </p>
    </div>
    <div class="ui black segment">
      <div class="ui black top attached label" style="font-size: large">Discussion</div>
      <div class="ui middle aligned divided list">
        <div class="item">
          <thread/>
        </div>
        <div class="item">
          <thread/>
        </div>
        <div class="item">
          <thread/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Thread from "@/components/Thread";
export default {
name: "CourseInfo",
  components:{
    Thread,
  }
}
</script>

<style scoped>

</style>