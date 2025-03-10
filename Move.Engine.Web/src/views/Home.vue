<template>
  <div class="home">
    <v-textarea v-model="workoutRequest"></v-textarea>
    <v-btn @click="submitRequest">Click me</v-btn>
  </div>
</template>

<script setup lang="ts">
import { WorkoutServiceViewModel } from "@/viewmodels.g";

const workoutRequest = ref<string>("");
const workoutService = new WorkoutServiceViewModel();
const submitRequest = async () => {
  const generatedWorkout = await workoutService.generateWorkout(
    workoutRequest.value,
  );
  alert(generatedWorkout);
};
useTitle("Home");
</script>
