<!-- To allow the user create/edit/delete the request -->
<template>
  <div>
    <div>
      <b-alert
          :show="dismissCountDown"
          dismissible
          fade
          variant="success"
          @dismiss-count-down="countDownChanged"
      >
        <h4 class="alert-heading">Success!</h4>
        <hr>
        <p>
          Thank you for your feedback!
        </p>
      </b-alert>
    </div>

    <b-jumbotron bg-variant="secondary" text-variant="light">
      <template #header><p class="text-center">Feedback</p></template>
      <p class="text-center text-light">Help us to build better platform!</p>
    </b-jumbotron>

    <div>
      <b-card bg-variant="light">
        <b-form-group
            label-cols-lg="3"
            label="Feedback to the platform admin"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
        >

          <b-form @submit.stop.prevent="onSubmit">
            <b-form-group
                id="example-input-group-1" label-for="feedbackContent">
              <b-form-textarea
                  id="feedbackContent"
                  name="feedbackContent"
                  v-model="$v.form.feedbackContent.$model"
                  :state="validateState('feedbackContent')"
                  aria-describedby="input-1-live-feedback"
              ></b-form-textarea>

              <b-form-invalid-feedback
                  id="input-1-live-feedback"
              >This is a required field</b-form-invalid-feedback>
            </b-form-group>
            <b-btn-toolbar>
              <b-button class="mr-1" type="submit" variant="primary">Submit</b-button>
              <b-button  class="mr-1" v-on:click="onClickBack">Back</b-button>
            </b-btn-toolbar>
          </b-form>
        </b-form-group>
      </b-card>
    </div>
  </div>
</template>

<style>
body {
  /*padding: 6rem;*/
}
</style>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  props: ['data'],

  data() {
    return {
      dismissSecs: 5,
      dismissCountDown: 0,
      form: {
        feedbackContent: ""
      },
    };
  },

  validations: {
    form: {
      feedbackContent: {
        required,
      }
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },

    onClickBack() {
      this.$router.go(-1)
    },

    /**
     * The handler when user creates submit function, alert will be popped if the record is correctly sent to server.
     * The page will be returned to the previous page
     */
    onSubmit() {
      // check the validity of the input
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      let record = {
        user: this.$store.state.currentUser.name,
        feedbackContent: this.form.feedbackContent,
      }
      /*alert("Form submitted" + JSON.stringify(record));*/
      this.$firebaseApi.postFeedback(record)
      //this.$notify("The request is post successfully")
      this.$router.go(-1)
    },
  }
};
</script>