<script setup lang="ts">
import { useDark } from "@vueuse/core";
import { Switch } from "@headlessui/vue";
import { onBeforeMount } from "vue";
import MoonIcon from '@/icons/MoonIcon.svg?component'
import SunIcon from '@/icons/SunIcon.svg?component'

const isDark = useDark({
  disableTransition: false,
});


onBeforeMount(() => {
  if (isDark.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
})
</script>

<template>
  <Switch v-model="isDark" class="w-16 h-8 relative flex items-center bg-secondary-600 dark:bg-primary-500 rounded-full cursor-pointer select-none z-1">
    <span class="sr-only">Toggle Dark mode</span>
    <span class="absolute bg-white dark:bg-black rounded-full h-6 w-6 transition-all left-1 dark:left-9 pointer-events-none" />
    <MoonIcon class="absolute right-2 w-4 h-4 text-black dark:text-white" />
    <SunIcon class="absolute left-2 w-4 h-4 text-black" />
  </Switch>
</template>
