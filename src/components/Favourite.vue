<template>
  <div class="ui container">

    <div class="ui stackable grid">
      <div class="nine wide column">
        <div class="title">
          <span>Favourite<i class="yellow star icon"></i></span>
        </div>
      </div>
    </div>

    <div class="ui middle aligned divided list">
      <thread v-for = "(value, key, index) in threads" :key="index" :thread="value" :id="key"/>
    </div>

  </div>
</template>

<script>
export default {
  name: "Favourite"
}
</script>

<style scoped>
.title{
  font-size: 40px;
  font-weight: 900;
}
</style>