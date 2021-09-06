<template>
  <div>
    <h1>Index Swap Request</h1>
    <div class="container">
      <div class="row" v-for="r in requests" v-bind:key="r.id">
        <div class="col-sm p-3 mb-2 bg-info text-white">
          From {{r.sourceIndex}} to {{r.targetIndexes}}
        </div>
        <div class="col-sm">
          <!--Profile-->
          <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png" class="rounded-circle img-thumbnail">
          {{r.user}}
        </div>
        <div class="col-sm">
          {{r.interestsReceived}} People noticing it
        </div>
        <div class="col-sm">
          <!--Buttons-->
          <button type="button" class="btn btn-primary">Apply</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SwapIndex",
  data() {
    return {
      requests: [
        {id: 0, sourceIndex: 10875, targetIndexes:[10539, 10432], user: "t170815518", courseId: "CZ3002", interestsReceived: 0},
        {id: 1, sourceIndex: 1075, targetIndexes:[1039, 10432], user: "binliwang", courseId: "CZ3002", interestsReceived: 520}
      ]
    }
  }
}
</script>

<style scoped>
.img-thumbnail {
  width: 50px;
  height: 50px;
}
</style>