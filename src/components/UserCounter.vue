<template>
    <div class="user-counter">
      <label class="user">Current number of users: {{ numOfUsers }}</label>
    </div>
  </template>
  
  <script>
  import { state } from '../socket';
  
  export default {
    computed: {
      numOfUsers() {
        return state.numOfUsers;
      },
    },
  };
  </script>
  
  <style>
  .user-counter {
    margin-bottom: 10px;
    margin-right: 10vw;
  }
  
  </style>