<template>
  <div class="container">
    <form @submit.prevent="onSubmit" class="form">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" required> <br>

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required> <br>
      <span v-if="email !== '' && !isValidEmail" class="error">Please enter a valid email address</span> <br>

      <label for="age">Age:</label>
      <input type="number" id="age" v-model="age" required> <br>

      <label for="phone_num">Phone Number:</label>
      <input type="text" id="phone_num" v-model="phone_num" required> <br>

      <label for="dob">Date of Birth:</label>
      <input type="date" id="dob" v-model="dob" required> <br>

      <label for="address">Address:</label>
      <input type="text" id="address" v-model="address" required> <br>

      <button type="submit" :disabled="isLoading || !isValidForm" class ="submit-button">Submit</button>
      <span v-if="isSubmitted" class="success">Form submitted successfully!</span>
    </form>
  </div>
</template>

<script>
import { socket } from '../socket';
export default {
  data() {
    return {
      isLoading: false,
      isSubmitted: false,
      name: '',
      email: '',
      age: '',
      phone_num: '',
      dob: '',
      address: '',
    }
  },
  computed: {
    isValidEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailPattern.test(this.email)
    },
    isValidForm() {
      return this.name !== '' && this.email !== '' && this.isValidEmail && this.age !== '' && this.phone_num !== '' && this.dob !== '' && this.address !== ''
    },
  },
  methods: {
    onSubmit() {
      this.isLoading = true

      // Simulating asynchronous submission
      setTimeout(() => {
        socket.emit('log-response', {
          name: this.name,
          email: this.email,
          age: this.age,
          phone_num: this.phone_num,
          dob: this.dob,
          address: this.address,
        })
        this.isLoading = false
        this.isSubmitted = true
        this.resetForm()
      }, 1500)
    },
    resetForm() {
      this.name = ''
      this.email = ''
      this.age = ''
      this.phone_num = ''
      this.dob = ''
      this.address = ''
    },
  },
}
</script>

<style>
.container {
  max-width: 400px;
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
  color: white;
}

.success {
  color: green;
  font-weight: bold;
}
</style>
