<!-- To allow the user create/edit/delete the request -->
<template>
  <div>
    <div>
<!--      <b-alert-->
<!--          :show="dismissCountDown"-->
<!--          dismissible-->
<!--          fade-->
<!--          variant="success"-->
<!--          @dismiss-count-down="countDownChanged"-->
<!--      >-->
      <b-alert
          v-model="showMessage"
          dismissible
          fade
          variant="success"
      >
        <h4 class="alert-heading">Success!</h4>
        <hr>
        <p>
          You have successfully submitted teammate searching request for course {{this.$store.state.courseViewing}},
          for index {{this.$store.state.postRequestUnderCourse.index}}
        </p>
      </b-alert>
    </div>

    <b-jumbotron bg-variant="secondary" text-variant="light">
      <template #header><p class="text-center">Post Request</p></template>
      <p class="text-center text-light">Course {{this.$store.state.courseViewing}}</p>
    </b-jumbotron>

    <div>
      <b-card bg-variant="light">
        <b-form-group
            label-cols-lg="3"
            label="Please fill all blanks"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
        >
          <b-form @submit.stop.prevent="onSubmit">
            <b-form-group
                id="example-input-group-1" label="Current Number In the Team" label-for="sourceIndex">
              <b-form-input
                  id="currentMemberNum"
                  name="currentMemberNum"
                  v-model="$v.form.currentMemberNum.$model"
                  :state="validateState('currentMemberNum')"
                  aria-describedby="input-1-live-feedback"
              ></b-form-input>

              <b-form-invalid-feedback
                  id="input-1-live-feedback"
              >This is a required field and must be at least 3 characters.</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="example-input-group-2" label="Member Needed" label-for="memberNumNeeded">
              <b-form-input
                  id="memberNumNeeded"
                  name="memberNumNeeded"
                  v-model="$v.form.memberNumNeeded.$model"
                  :state="validateState('memberNumNeeded')"
                  aria-describedby="input-2-live-feedback"
              ></b-form-input>

              <b-form-invalid-feedback
                  id="input-2-live-feedback"
              >This is a required field and must be at least 3 characters.</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="example-input-group-2" label="Index" label-for="index">
              <b-form-input
                  id="index"
                  name="index"
                  v-model="$v.form.index.$model"
                  :state="validateState('index')"
                  aria-describedby="input-2-live-feedback"
              ></b-form-input>

              <b-form-invalid-feedback
                  id="input-2-live-feedback"
              >This is a required field and must be at least 3 characters.</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="example-input-group-2" label="Additional Info" label-for="additionalInfo">
              <b-form-input
                  id="additionalInfo"
                  name="additionalInfo"
                  v-model="$v.form.additionalInfo.$model"
                  :state="validateState('additionalInfo')"
                  aria-describedby="input-2-live-feedback"
              ></b-form-input>

              <b-form-invalid-feedback
                  id="input-2-live-feedback"
              >This is a required field and must be at least 3 characters.</b-form-invalid-feedback>
            </b-form-group>

            <div class="text-center">
              <hr>
              <b-button-group>
                <b-button class="mr-1" type="submit" variant="primary" v-if="isHavePost">Edit</b-button>
                <b-button class="mr-1" type="submit" variant="primary" v-if="!isHavePost">Submit</b-button>
                <b-button class="mr-1" variant="danger" v-if="isHavePost" v-on:click="onClickDelete">Delete</b-button>
                <b-button class="mr-1" @click="resetForm()">Reset</b-button>
                <b-button class="mr-1" v-on:click="onClickBack">Back</b-button>
              </b-button-group>
            </div>
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
import { required, between, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  props: ['data'],

  data() {
    return {
      //dismissSecs: 5,
      showMessage: false,
      dismissCountDown: 0,
      form: {
        // it can handle the null case better than calling a method defined in the component
        userName: null,
        currentMemberNum: 1,
        memberNumNeeded: 3,
        index: null,
        interestedUsers: [],
        interestedUsersNum: 0,
        additionalInfo: "",
      },
    };
  },

  computed: {
    isHavePost() {
      return this.$store.state.isHavePost
    },
    sourceIndex() {
      if (this.$store.state.postRequestUnderCourse != null) {
        return this.$store.state.postRequestUnderCourse.sourceIndex
      } else {
        return null
      }
    },
    targetIndexes() {
      let formattedString = ""
      let indexList = this.$store.state.postRequestUnderCourse.targetIndexes
      for (let i = 0; i < indexList.length; i++) {
        formattedString = formattedString + indexList[i].toString() + " ";
      }
      return formattedString
    }
  },
  mounted() {
    this.$store.commit('setCourseViewing', this.$route.params.id)
  },

  validations: {
    form: {
      index: {
        required,
      },
      currentMemberNum: {
        required,
        between: between(1, 10),
      },
      memberNumNeeded: {
        required,
        between: between(1, 10),
      },
      additionalInfo: {
        maxLength: maxLength(100)
      }
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },

    resetForm() {
      this.form = {
        // it can handle the null case better than calling a method defined in the component
        userName: null,
        currentMemberNum: 1,
        memberNumNeeded: 3,
        index: null,
        interestedUsers: [],
        interestedUsersNum: 0,
        additionalInfo: "",
      },

      this.$nextTick(() => {
        this.$v.$reset();
      });
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
        // it can handle the null case better than calling a method defined in the component
          userName: this.$store.state.currentUser.name,
          currentMemberNum: parseInt(this.form.currentMemberNum),
          memberNumNeeded: parseInt(this.form.memberNumNeeded),
          index: parseInt(this.form.index),
          interestedUsers: [],
          interestedUsersNum: 0,
          additionalInfo: this.form.additionalInfo,
          courseId: this.$store.state.courseViewing
      }
      //alert("Form submitted" + JSON.stringify(record))
      this.showSuccessAlert()
      this.$firebaseApi.createSearchTeammatesRecord(record, this.$store.state.courseViewing)
      //this.$router.replace({ name: 'teammates_main_list', params: { id: this.$route.params.id} })
      setTimeout(() => {
        this.$router.replace({ name: 'teammates_main_list', params: { id: this.$route.params.id} })
      },1500)
    },

    onClickBack() {
      this.$router.replace({ name: 'teammates_main_list', params: { id: this.$route.params.id} })
    },

    /**
     * Call firebase api to delete the user's post
     */
    onClickDelete() {
      this.$firebaseApi.deleteSearchTeammateRequest(this.$store.state.courseViewing, this.$store.state.currentUser.name)
      alert("The record is deleted!")
      this.$router.replace({ name: 'teammates_main_list', params: { id: this.$route.params.id} })
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showSuccessAlert(){
      this.showMessage = true
      console.log("display")
      setTimeout(function (){
        this.showMessage = false
        console.log("dismiss")
      },2000)
    }
  }
};
</script>
