<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit" class="form">
      <label for="name">Name:</label>
      <MazInput v-model="name" type="text" id="name" required size="md" />
      <br />

      <label for="phoneNum">Phone Number:</label>
      <MazPhoneNumberInput
        v-model="phoneNum"
        show-code-on-list
        color="info"
        defaultCountryCode="HK"
        :preferred-countries="['HK']"
        @update="phoneResults = $event"
        :success="phoneResults?.isValid"
      />
      <br />

      <label for="email">Email:</label>
      <MazInput
        v-model="email"
        type="email"
        id="email"
        required
        size="md"
        :error="email !== '' && !isValidEmail"
        error-message="Please enter a valid email address"
      />
      <br />

      <label>Number of Persons</label>
      <MazSelect
        v-model="numOfPersons"
        :options="[
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4', value: '4' },
          { label: '5', value: '5' },
        ]"
        size="md"
      />
      <br />

      <label>Date:</label>
      <DatePicker
        v-model="date"
        mode="date"
        first-day-of-week="1"
        :rules="timeRules"
        timezone="Asia/Hong_Kong"
        :min-date="new Date()"
        is24hr
        expanded
        is-required
      />
      <br />
      <br />

      <label>Time:</label>
      <MazBtn @click="isOpen = true">See Timeslot</MazBtn>
      <MazDialog v-model="isOpen" title="Timeslot Available"> </MazDialog>
      <br />
      <br />

      <MazBtn type="submit" size="md" :disabled="isLoading || !isValidForm"
        >Submit</MazBtn
      >
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { socket } from "../socket";
import { DatePicker } from "v-calendar";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import MazSelect from "maz-ui/components/MazSelect";
import MazInput from "maz-ui/components/MazInput";
import MazBtn from "maz-ui/components/MazBtn";
import MazDialog from "maz-ui/components/MazDialog";

export default {
  data() {
    return {
      isOpen: false,
      isLoading: false,
      isSubmitted: false,
      name: "",
      email: "",
      phoneNum: "",
      phoneResults: null,
      numOfPersons: "",
      date: "",
      time: "",
      timeRules: {
        hours: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        minutes: [0, 15, 30, 45],
      },
    };
  },
  computed: {
    connection() {
      return state.numOfUsers;
    },
    isValidEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(this.email);
    },
    isValidForm() {
      return (
        this.name !== "" &&
        this.email !== "" &&
        this.isValidEmail &&
        this.phoneNum !== "" &&
        this.numOfPersons !== "" &&
        this.date !== "" &&
        this.time !== ""
      );
    },
  },
  methods: {
    onSubmit() {
      this.isLoading = true;
      const date = ref(new Date());
      // Simulating asynchronous submission
      setTimeout(() => {
        socket.emit("log-response", {
          name: this.name,
          email: this.email,
          phoneNum: this.phoneNum,
          numOfPersons: this.numOfPersons,
          // date: this.date.toISOString().slice(0, 10),
          date: this.date.toISOString().slice(0, 10),
          time: this.time,
        });
        this.isLoading = false;
        this.isSubmitted = true;
        this.resetForm();
        this.redirectUser();
      }, 1500);
    },
    redirectUser() {
      this.$router.push("/success");
    },
    resetForm() {
      this.name = "";
      this.email = "";
      this.phoneNum = "";
      this.numOfPersons = "";
      this.date = "";
      this.time = "";
    },
  },
  components: {
    DatePicker,
    MazPhoneNumberInput,
    MazSelect,
    MazInput,
    MazBtn,
    MazDialog,
  },
};
</script>

<style>
.form-container {
  max-width: 600px;
  margin: 0 auto;
}

.form label {
  display: block;
  margin-bottom: 5px;
}

.form input {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.dropdown {
  width: 100%; /* Adjust the width as needed */
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-top: 0.5rem;
  padding: 0.3rem;
}

.submit-button {
  display: inline-block;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
  cursor: pointer;
}

.error {
  color: #f90b31;
}

.success {
  color: #3adca3;
  font-weight: bold;
}
</style>
