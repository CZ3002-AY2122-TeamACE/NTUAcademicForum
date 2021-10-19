<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
          id="input-group-1"
          label="Source Index"
          label-for="input-1"
      >
        <b-form-input
            id="input-1"
            v-model="sourceIndex"
            type="int"
            placeholder="Enter the index you are currently in"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Target Index" label-for="input-2">
        <b-form-input
            id="input-2"
            v-model="targetIndex"
            placeholder="Enter the index you would like to change "
            required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'EditIndexSwap',
  data() {
    return {
      sourceIndex: '',
      targetIndex: '',
      show: true
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.sourceIndex = '';
      this.targetIndex = '';
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>