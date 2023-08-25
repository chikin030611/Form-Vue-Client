<template>
        <img src="../components/img/baseg.jpg" alt="Event Image" class="image" />
    <Description />
    <router-link to="/form" class="button">Join</router-link>
</template>

<script>
import Description from '../components/Description.vue'
export default {
    name: 'HomeView',
    components: {
        Description,
    },
};

</script>

<style>
.image {
    width: 800px;
    height: 300px;
    margin: 0 auto;

}

.button {
    background-color: #2c3e50;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
    margin: 1rem 0;
    padding: 0.5rem 1rem;
    text-align: center;
    text-decoration: none;
    width: 100%;
    align-items: right;

}

</style>
