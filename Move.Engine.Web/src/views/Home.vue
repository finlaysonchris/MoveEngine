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
          label="Select Equipment"
          :items="equipmentOptions"
          multiple
        ></v-select>
      </v-window-item>

      <v-window-item value="style">
        <v-select
          v-model="selectedStyle"
          label="Workout Style"
          :items="workoutStyles"
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

    <v-textarea v-model="editableRequest"></v-textarea>
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
const selectedStyle = ref<string | null>(null);
const selectedEquipment = ref<string[]>([]);

const editableRequest = computed({
  get: () => {
    let request = "Generate a workout.";
    if (selectedEquipment.value.length) {
      request = `using ${selectedEquipment.value.join(", ")}. ${request}`;
    }
    if (selectedStyle.value) {
      request = `${selectedStyle.value} workout. ${request}`;
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
  alert(generatedWorkout.value);
};

useTitle("Workout Generator");
</script>
