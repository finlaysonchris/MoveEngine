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
    <v-btn @click="saveWorkout">Save Workout</v-btn>

    <!-- Modal Dialog -->
    <v-dialog v-model="showDialog" max-width="500">
      <v-card>
        <v-card-title>Save Workout</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="workoutName"
            label="Workout Name"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="showDialog = false">Cancel</v-btn>
          <v-btn @click="handleSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  UserWorkoutListViewModel,
  UserWorkoutViewModel,
  WorkoutServiceViewModel,
} from "@/viewmodels.g";
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
const showDialog = ref(false);
const workoutName = ref("");

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
    // This setter can be customized if needed.
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

const saveWorkout = async () => {
  showDialog.value = true;
};

const handleSave = async () => {
  const workoutListViewModel = new UserWorkoutListViewModel();
  await workoutListViewModel.saveWorkout(
    workoutName.value,
    generatedWorkout.value,
  );
  alert("hello world");
  showDialog.value = false;
};

useTitle("Workout Generator");
</script>
