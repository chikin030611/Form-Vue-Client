<template>
    <div class="container">
        <h1>Thank you for your reservation!</h1>
        <p>Our team will contact you shortly.</p>
        <div class="container2">
            <label>Name: {{ name }}</label> <br>
            <label>Email: {{ email }}</label> <br>
            <label>Phone Number: {{ phoneNum }}</label> <br>
            <label>Number of Persons: {{ numOfPersons }}</label> <br>
            <label>Date: {{ date }}</label> <br>
            <label>Time: {{ time }}</label>
        </div> 
    </div>
</template>

<script>
import { socket } from '../socket';
export default {
    name: 'SuccessView',
    data() {
        return {
            name: '',
            email: '',
            phoneNum: '',
            numOfPersons: '',
            date: '',
            time: '',
        };
    },
    beforeMount() {
        this.confirmation();
    },
    methods: {
        confirmation(){
            socket.on("confirmation", data => {
                this.name = data.name;
                this.email = data.email;
                this.phoneNum = data.phoneNum;
                this.numOfPersons = data.numOfPersons;
                this.date = data.date;
                this.time = data.time;
            });
        }
    }
};

</script>

<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5rem;
}
.container2 {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    margin-top: 2rem;
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 5px;
    width: 100%;
}
</style>
