<script setup lang="ts">
import scrollToElement from "@/utils/scroll.ts";

interface Props {
  elementId: string;
}

const { elementId } = defineProps<Props>();
</script>

<template>
  <a
    class="text-primary-500 hover:bg-silver-700/75 block cursor-pointer p-2 font-bold uppercase"
    @click="() => scrollToElement(elementId)"
  >
    <slot />
  </a>
</template>
