<script setup>
import Form from './components/Form.vue';
import { state } from './socket';
console.log(state.numOfUsers);
</script>

<template>
  <main>
    <Form />
  </main>
</template>
