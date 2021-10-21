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
          You have successfully submitted your index swapping request for course {{this.$store.state.courseViewing}},
          from index {{this.$store.state.postRequestUnderCourse.sourceIndex}} to index {{this.$store.state.postRequestUnderCourse.targetIndexes}}
        </p>
      </b-alert>
    </div>

    <b-jumbotron bg-variant="secondary" text-variant="light">
      <template #header><p class="text-center">Post Index Swapping Request</p></template>
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
                id="example-input-group-1" label="Current Index" label-for="sourceIndex">
              <b-form-input
                  id="sourceIndex"
                  name="sourceIndex"
                  v-model="$v.form.sourceIndex.$model"
                  :state="validateState('sourceIndex')"
                  aria-describedby="input-1-live-feedback"
              ></b-form-input>

              <b-form-invalid-feedback
                  id="input-1-live-feedback"
              >This is a required field and must be at least 3 characters.</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="example-input-group-2" label="Target Indexes (Separate multiple target indexes by empty space)" label-for="targetIndexes">
              <b-form-input
                  id="targetIndexes"
                  name="targetIndexes"
                  v-model="$v.form.targetIndexes.$model"
                  :state="validateState('targetIndexes')"
                  aria-describedby="input-2-live-feedback"
              ></b-form-input>

              <b-form-invalid-feedback
                  id="input-2-live-feedback"
              >This is a required field and must be at least 3 characters.</b-form-invalid-feedback>
            </b-form-group>

            <div class="text-center">
              <hr>
<!--              <b-button-group>-->
<!--                <b-button type="submit" variant="primary" v-if="isHavePost">Edit</b-button>-->
<!--                <b-button type="submit" variant="primary" v-if="!isHavePost">Submit</b-button>-->
<!--                <b-button variant="danger" v-if="isHavePost" v-on:click="onClickDelete">Delete</b-button>-->
<!--                <b-button class="ml-2" @click="resetForm()">Reset</b-button>-->
<!--                <b-button v-on:click="onClickBack">Back</b-button>-->
<!--              </b-button-group>-->
              <b-btn-toolbar>
                <b-button class="mr-1" type="submit" variant="primary" v-if="isHavePost">Edit</b-button>
                <b-button class="mr-1" type="submit" variant="primary" v-if="!isHavePost">Submit</b-button>
                <b-button class="mr-1" variant="danger" v-if="isHavePost" v-on:click="onClickDelete">Delete</b-button>
                <b-button class="mr-1" @click="resetForm()">Reset</b-button>
                <b-button  class="mr-1" v-on:click="onClickBack">Back</b-button>
              </b-btn-toolbar>
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
import { required } from "vuelidate/lib/validators";

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
        sourceIndex: this.sourceIndex,
        targetIndexes: this.targetIndexes,
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
      sourceIndex: {
        required,
      },
      targetIndexes: {
        required
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
        sourceIndex: null,
        targetIndexes: null
      };

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

      let targetIndexesRaw = this.form.targetIndexes;
      let targetIndexes = targetIndexesRaw.split(" ");
      // convert the value to integer
      targetIndexes = targetIndexes.map(function (x) {
        return parseInt(x, 10)
      })
      targetIndexes = [...new Set(targetIndexes)]  // get only the unique indexes


      let courseId = this.$store.state.courseViewing;
      let sourceIndex = parseInt(this.form.sourceIndex);
      let record = {
        courseId: courseId,
        sourceIndex: sourceIndex,
        targetIndexes: targetIndexes,
        user: this.$store.state.currentUser.name,
        interestedUsers: [],
        interestedUserNum: 0
      }
      /*alert("Form submitted" + JSON.stringify(record));*/
      // this.showSuccessAlert()
      this.$firebaseApi.createSwapIndexRecord(record, this.$store.state.courseViewing)
      this.$firebaseApi.getSwapIndexRecord(this.$store.state.courseViewing, this.$store.state.currentUser.name)
      //this.$notify("The request is post successfully")
      setTimeout(() => {
        this.$router.replace({ name: 'display_main_list', params: { id: this.$route.params.id} })
      },1500)
    },

    onClickBack() {
      this.$router.replace({ name: 'display_main_list', params: { id: this.$route.params.id} })
    },

    /**
     * Call firebase api to delete the user's post
     */
    onClickDelete() {
      this.$firebaseApi.deletePostSwapIndexRequest(this.$store.state.courseViewing, this.$store.state.currentUser.name)
      alert("The record is deleted!")
      this.$router.replace({ name: 'display_main_list', params: { id: this.$route.params.id} })
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
