<template>
  <div>
    <v-stepper v-model="e1">
      <v-stepper-items>
        <v-stepper-content step="1">


          <v-btn color="primary" @click="nextStep">Continue</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">


          <v-btn color="primary" @click="nextStep">Continue</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">


          <v-btn color="primary" @click="nextStep">Continue</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      e1: 1,
    };
  },
  methods: {
    nextStep() {
      this.e1 = this.e1 === 3 ? 1 : this.e1 + 1;
    },
  },
};
</script>
