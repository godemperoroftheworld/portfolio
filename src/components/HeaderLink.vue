<script setup lang="ts">
import type { HTMLAttributes } from "astro/types";

interface Props {
  elementId: string;
}

const { elementId, class: className } = defineProps<Props>();

function scrollToElement() {
  const target = document.getElementById(elementId);
  const y = target!.getBoundingClientRect().top + window.scrollY - 72; // 8px = 1rem
  window.scrollTo({ top: y, behavior: "smooth" });
}
</script>

<template>
  <a
    class="text-primary-500 hover:bg-silver-700/75 block cursor-pointer p-2 font-bold uppercase"
    @click="scrollToElement"
  >
    <slot />
  </a>
</template>
