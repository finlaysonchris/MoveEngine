<template>
  <div class="home">
    <c-loader-status :loaders="[workoutService.generateWorkout]" />

    <v-tabs v-model="tab">
      <v-tab value="equipment">Equipment</v-tab>
      <v-tab value="style">Style</v-tab>
      <v-tab value="length">Length</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="equipment">
        <v-select
          v-model="selectedEquipment"
          :items="equipmentOptions"
          multiple
        ></v-select>
      </v-window-item>

      <v-window-item value="style">
        <v-select
          v-model="selectedStyles"
          :items="workoutStyles"
          multiple
        ></v-select>
      </v-window-item>

      <v-window-item value="length">
        <v-text-field
          v-model="length"
          label="Workout Length (minutes)"
          type="number"
        ></v-text-field>
      </v-window-item>
    </v-window>

    <v-checkbox v-model="showRequest" label="Show Workout Request"></v-checkbox>
    <span v-if="showRequest">
      <v-textarea v-model="editableRequest"></v-textarea>
    </span>
    <div v-html="renderedMarkdown"></div>
    <v-btn @click="submitRequest">Generate Workout</v-btn>
  </div>
</template>

<script setup lang="ts">
import { WorkoutServiceViewModel } from "@/viewmodels.g";
import MarkdownIt from "markdown-it";

const workoutStyles = [
  "CrossFit",
  "Bodyweight (Calisthenics)",
  "HIIT (High-Intensity Interval Training)",
  "Strength Training (Weightlifting)",
  "Circuit Training",
  "Cardio (Running, Cycling)",
  "Yoga",
  "Functional Training",
  "Powerlifting",
  "Olympic Weightlifting",
  "Tabata",
];

const equipmentOptions = [
  "Kettlebells",
  "Dumbbells",
  "Barbells",
  "Jump Rope",
  "Resistance Bands",
  "Medicine Ball",
  "Pull-Up Bar",
  "Bench",
];

const markdown = new MarkdownIt();
const workoutService = new WorkoutServiceViewModel();
const generatedWorkout = ref<string>("");
const tab = ref("equipment");
const length = ref<number | null>(null);
const selectedStyles = ref<string[] | null>(null);
const selectedEquipment = ref<string[]>([]);
const showRequest = ref(false);
const editableRequest = computed({
  get: () => {
    let request = "Generate a workout.";
    if (selectedEquipment.value.length) {
      request = `Using ${selectedEquipment.value.join(", ")}. ${request}`;
    }
    if (selectedStyles.value?.length) {
      request = `Using ${selectedStyles.value.join(", ")} workout style(s). ${request}`;
    }
    if (length.value) {
      request = `${length.value} minute ${request}`;
    }
    return `${request} Don't repeat any exercises.`;
  },
  set(value) {
    editableRequest.value = value;
  },
});

const renderedMarkdown = computed(() =>
  markdown.render(generatedWorkout.value),
);

const submitRequest = async () => {
  generatedWorkout.value = await workoutService.generateWorkout(
    editableRequest.value,
  );
};

useTitle("Workout Generator");
</script>
