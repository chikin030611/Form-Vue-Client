<template>
  <div class="container">
    <form @submit.prevent="onSubmit" class="form">
      <label class="user">Current number of users: {{ connection }} </label>
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" required> <br>

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required> <br>
      <span v-if="email !== '' && !isValidEmail" class="error" >Please enter a valid email address</span> <br>

      <label for="phone_num">Phone Number:</label>
      <input type="tel" id="phone_num" 
        v-model="phone_num" 
        maxlength="8" 
        pattern="[2-3,5-7,9]{1}[0-9]{7}"
        required> 
        <br>
      
      <label>Date:</label>
      <VDatePicker v-model="date" for="date" 
        :min-date="new Date()" 
        color="gray"
        is24hr expanded is-required /> 
      <br>

      <button type="submit" :disabled="isLoading || !isValidForm" class ="submit-button">Submit</button>
      <span v-if="isSubmitted" class="success">Form submitted successfully!</span>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { socket, state } from '../socket';

export default {
    data() {
        return {
            numOfUsers: 0,
            visible: false,
            isLoading: false,
            isSubmitted: false,
            name: '',
            email: '',
            phone_num: '',
            date: '',
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
          return this.name !== '' && this.email !== '' && this.isValidEmail // && this.age !== '' && this.dob !== ''
          && this.phone_num !== '' && this.address !== '' && this.date !== '';
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
                    phone_num: this.phone_num,
                    date: this.date.toISOString().slice(0, 10),
                });
                this.isLoading = false;
                this.isSubmitted = true;
                this.resetForm();
            }, 1500);
        },
        resetForm() {
            this.name = '';
            this.email = '';
            this.phone_num = '';
        },
        
    },
    
}
</script>

<style>
.container {
  max-width: 600px;
  margin: 0 auto;

}

.user {
  font-weight: bold;
  text-align: right;
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
