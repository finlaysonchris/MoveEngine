<template>
  <v-avatar color="white">
    <span v-if="!imageLoaded && initials" class="initials">
      {{ initials }}
    </span>
    <v-icon
      v-if="!imageLoaded && !initials"
      icon="fa fa-user text-grey-darken-2"
    ></v-icon>
    <img
      v-if="photoUrl && !imageFailed"
      :src="photoUrl"
      width="100%"
      height="100%"
      :style="{ display: imageLoaded ? 'block' : 'none' }"
      @load="imageLoaded = true"
      @error="imageFailed = true"
    />
  </v-avatar>
</template>

<script setup lang="ts">
import { User, UserInfo } from "@/models.g";
import { UserViewModel } from "@/viewmodels.g";

const props = defineProps<{
  user: User | UserInfo;
}>();

const initials = computed(() => {
  const fullName = props.user.fullName;
  if (!fullName) return "";

  const firstInitialMatch = /, (.)/.exec(fullName);
  if (firstInitialMatch) {
    return firstInitialMatch[1] + fullName.charAt(0);
  } else {
    const lastInitialMatch = / ([^ ])[^ ]+$/.exec(fullName);
    if (lastInitialMatch) {
      return fullName.charAt(0) + lastInitialMatch[1];
    } else {
      return fullName.substr(0, 2);
    }
  }
});

const imageLoaded = ref(false);
const imageFailed = ref(false);
const userVm = computed(() => {
  if (props.user instanceof UserViewModel) return props.user;
  if (props.user instanceof User) return new UserViewModel(props.user);
  return new UserViewModel({ id: props.user.id });
});

const photoUrl = computed(() => userVm.value?.getPhoto?.url || undefined);
watch(photoUrl, () => {
  imageLoaded.value = false;
  imageFailed.value = false;
});
</script>
