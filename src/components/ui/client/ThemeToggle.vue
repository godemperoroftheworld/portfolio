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
  <div
    class="z-1 dark:ring-silver-300 relative cursor-pointer select-none focus-within:ring"
  >
    <Switch
      v-model="isDark"
      style="--cutout-corner: 0.5em"
      @keyup.enter="isDark = !isDark"
      class="bg-primary-500 cutout flex h-8 w-16 items-center"
    >
      <span class="sr-only">Toggle Dark mode</span>
      <span
        class="pointer-events-none absolute left-1 h-6 w-6 rounded-full bg-white transition-all dark:left-9 dark:bg-black"
      />
      <MoonIcon class="absolute right-2 h-4 w-4 text-white" />
      <SunIcon class="absolute left-2 h-4 w-4 text-black" />
    </Switch>
  </div>
</template>
