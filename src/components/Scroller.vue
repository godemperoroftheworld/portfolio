<script setup lang="ts">
import ChevronDown from "@/icons/ChevronDown.svg?component";

interface Props {
  elementId: string;
}
const { elementId } = defineProps<Props>();

function scrollToSheet() {
  const target = document.getElementById(elementId);
  target?.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <div
    v-bind="$attrs"
    class="font-heading text-primary-500 mx-auto mt-4 w-fit text-lg font-bold"
  >
    <a @click="scrollToSheet" class="block w-fit cursor-pointer">
      <slot />
    </a>
    <a
      @click="scrollToSheet"
      class="mx-auto mt-2 block w-fit animate-bounce cursor-pointer transition-all duration-200 hover:scale-110"
    >
      <ChevronDown class="size-12" />
    </a>
  </div>
</template>
