<script>
export default {
  name: "Database",
  swapIndexRequests: [
    {id: 0, sourceIndex: 10875, targetIndexes:[10539, 10432], user: "t170815518", courseId: "CZ3002",
      interestsReceived: 0},
    {id: 1, sourceIndex: 1075, targetIndexes:[1039, 10432], user: "binliwang", courseId: "CZ3002", interestsReceived: 520}
  ],

  methods: {
    addSwapIndexRequest: function (source, target, user, course) {
      const newRequest = {
        "id": this.swapIndexRequests.size(),
        "sourceIndex": source,
        "targetIndexes": target,
        "user": user,
        "courseId": course,
        "interestsReceived": 0
      };
      this.swapIndexRequests.push(newRequest)
    }
  }
}
</script>

<style scoped>

</style>