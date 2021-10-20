<template lang="html">
  <div>
    <h1>Index Swap Request</h1>
    <div v-show="!this.isPostMode" id="viewMode">
      <div class="container">
        <!-- Tool bar -->
        <div class="row">
          <div class="col">
            <button type="button" class="btn btn-primary" v-on:click="onClickPostButton">Post</button>
          </div>
        </div>
      </div>
      <div class="container" >
        <div class="row" v-for="r in requests" v-bind:key="r.id">
          <div class="col-sm p-3 mb-2 bg-info text-white">
            From {{r.sourceIndex}} to {{r.targetIndexes}}
          </div>
          <div class="col-sm">
            <!--Profile-->
            <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png" class="rounded-circle img-thumbnail" alt="the default avatar">
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
    <div v-show="this.isPostMode" class="list-group">
      <li class="list-group-item"><textarea v-model="sourceIndex" placeholder="source index"></textarea> </li>
      <li class="list-group-item"><textarea v-model="targetIndex" placeholder="target indexes"></textarea></li>
      <li class="list-group-item"><button type="button" class="btn btn-outline-primary" v-on:click="onClickSubmitButton"
      >Submit</button></li>
    </div>
    <!-- pop-up window for error message -->
    <div class="centerx" v-show="isPopActive">
      <vs-popup class="holamundo"  title="Error" :active.sync="isPopActive">
        <p>{{errorMessageContent}}</p>
      </vs-popup>
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
      ],

      isPostMode: false,
      isPopActive:false,
      errorMessageContent: null,

      sourceIndex: null,
      targetIndex: null,
      currentUser: "chritang1023"
    }
  },
  methods: {
    onClickPostButton() {
      this.isPostMode = true;
    },

    onClickSubmitButton() {
      // value check
      if (this.sourceIndex.isEmpty()) {
        this.errorMessageContent = "The field of source Index cannot be empty!";
        this.isPopActive = true;
        return;
      }
      if (this.targetIndex.isEmpty()) {
        this.errorMessageContent = "The field of target Indexex cannot be empty!";
        this.isPopActive = true;
        return;
      }

      this.requests.push({id: this.requests.size, sourceIndex: this.sourceIndex, targetIndexes:
        this.targetIndexes, user: this.currentUser, courseId: "Cz3002", interestsReceived: 0});
      this.isPostMode = false;
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