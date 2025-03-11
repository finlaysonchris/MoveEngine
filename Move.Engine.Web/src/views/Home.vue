<template>
  <div class="home">
    <c-loader-status :loaders="[workoutService.generateWorkout]" />
    <v-textarea v-model="workoutRequest"></v-textarea>
    <div v-html="renderedMarkdown"></div>
    <v-btn @click="submitRequest">Generate Workout</v-btn>
  </div>
</template>

<script setup lang="ts">
import { WorkoutServiceViewModel } from "@/viewmodels.g";
import MarkdownIt from "markdown-it";

const workoutRequest = ref<string>(
  "Generate a 45 minute workout using kettlebells, dumbbells and a jump rope.  Don't repeat any exercises.",
);
const markdown = new MarkdownIt();
const workoutService = new WorkoutServiceViewModel();
const generatedWorkout = ref<string>("sdsdfsdf");

const renderedMarkdown = computed(() =>
  markdown.render(generatedWorkout.value),
);

const submitRequest = async () => {
  generatedWorkout.value = await workoutService.generateWorkout(
    workoutRequest.value,
  );
  alert(generatedWorkout.value);
};
useTitle("Home");
</script>
