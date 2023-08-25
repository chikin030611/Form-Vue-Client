<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit" class="form">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" required> 
      <br>

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
      <br>

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required> <br>
      <span v-if="email !== '' && !isValidEmail" class="error" >Please enter a valid email address</span> <br>

      <label for="numOfPersons">Number of Persons:</label>
      <input type="number" id="numOfPersons" v-model="numOfPersons" required> <br>
      
      <label>Date:</label>
      <DatePicker 
        v-model="date" 
        mode="dateTime"
        first-day-of-week="1"
        :rules="timeRules"
        timezone="Asia/Hong_Kong"
        :min-date="new Date()"
        color="gray"
        is24hr 
        expanded 
        is-required
      /> 
      <br>
      
      <button type="submit" :disabled="isLoading || !isValidForm" class ="submit-button">Submit</button>
      <span v-if="isSubmitted" class="success">Form submitted successfully!</span>    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { socket } from '../socket';
import { DatePicker } from 'v-calendar';
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'

export default {
  data() {
    return {
      isLoading: false,
      isSubmitted: false,
      name: '',
      email: '',
      phoneNum: '',
      phoneResults: null,
      numOfPersons: '',
      date: '',
      timeRules: {
        hours: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
      }
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
        return this.name !== '' && this.email !== '' && this.isValidEmail
        && this.phoneNum !== '' && this.numOfPersons !== '' && this.date !== '';
    },
  },
  methods: {
    onSubmit() {
      this.isLoading = true;
      const date = ref(new Date());
      // Simulating asynchronous submission
      setTimeout(() => {
        socket.emit('log-response', {
          name: this.name,
          email: this.email,
          phoneNum: this.phoneNum,
          numOfPersons: this.numOfPersons,
          // date: this.date.toISOString().slice(0, 10),
          date: this.date.toISOString().slice(0, 10),
          time: this.date.toString().slice(16, 25)
        });
        this.isLoading = false;
        this.isSubmitted = true;
        this.resetForm();
        this.redirectUser();
      }, 1500);
    },
    redirectUser() {
      this.$router.push('/success');
    },
    resetForm() {
      this.name = '';
      this.email = '';
      this.phoneNum = '';
      this.numOfPersons = '';
    },
  },
  components: {
    DatePicker,
    MazPhoneNumberInput,
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

.submit-button {
  display: inline-block;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
  cursor: pointer;
}

.error {
  color: #F90B31;
}

.success {
  color: #3adca3;
  font-weight: bold;
}

</style>
