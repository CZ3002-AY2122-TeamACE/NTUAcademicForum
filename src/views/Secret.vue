<template>
  <div>
    Secret You are logged in as {{email}}
  </div>
</template>
<script>
import firebase from "firebase/compat/app";
import "firebase/auth";
export default {
  data() {
    return {
      email: firebase.auth().currentUser.email
    };
  }
}
</script>

<style lang="scss" scoped>

</style>