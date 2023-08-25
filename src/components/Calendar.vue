<template>
  <div>
    <VDatePicker v-model="date" for="date" 
        :min-date="new Date()" 
        color="gray"
        is24hr expanded is-required
    /> 
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  props: {
    date: String
  },
  data() {
    return {
      date: '',    
    };
  },
  methods: {
    onDateChange() {
      console.log('date changed');
      this.$emit('date-selected', this.date);
    },
  },
}
</script>