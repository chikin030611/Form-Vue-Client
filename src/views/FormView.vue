<template>
    <div class="container">
        <router-link to="/"> Home Page</router-link>
        <UserCounter />
        <Form />
    </div>
</template>

<script>
import UserCounter from '@/components/UserCounter.vue';
import Form from '@/components/Form.vue';

export default {
    name: 'FormView',
    components: {
        UserCounter,
        Form,
    },
};
</script>

