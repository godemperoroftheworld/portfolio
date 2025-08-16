<script setup lang="ts">
import { useDark } from "@vueuse/core";
import { Switch } from "@headlessui/vue";
import { onBeforeMount } from "vue";
import MoonIcon from "@/assets/icons/MoonIcon.svg?component";
import SunIcon from "@/assets/icons/SunIcon.svg?component";

const isDark = useDark({
  disableTransition: false,
});

onBeforeMount(() => {
  if (isDark.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});
</script>

<template>
  <Switch
    v-model="isDark"
    class="bg-primary-500 z-1 relative flex h-8 w-16 cursor-pointer select-none items-center rounded-full"
  >
    <span class="sr-only">Toggle Dark mode</span>
    <span
      class="pointer-events-none absolute left-1 h-6 w-6 rounded-full bg-white transition-all dark:left-9 dark:bg-black"
    />
    <MoonIcon class="absolute right-2 h-4 w-4 text-white" />
    <SunIcon class="absolute left-2 h-4 w-4 text-black" />
  </Switch>
</template>
