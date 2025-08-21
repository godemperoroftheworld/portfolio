<script setup lang="ts">
import ChevronDown from "@/assets/icons/ChevronDown.svg?component";
import scrollToElement from "@/utils/scroll.ts";

interface Props {
  elementId: string;
}
const { elementId } = defineProps<Props>();

function onClick() {
  scrollToElement(elementId);
}
</script>

<template>
  <button
    @click="onClick"
    @keyup.enter="onClick"
    v-bind="$attrs"
    class="font-heading text-primary-500 pointer-events-none mx-auto block w-fit text-lg font-bold"
  >
    <div class="peer pointer-events-auto block w-fit cursor-pointer">
      <slot />
    </div>
    <div
      aria-label="Scroll to Next Section"
      class="pointer-events-auto mx-auto mt-4 block w-fit animate-bounce cursor-pointer transition-all duration-200 hover:scale-125 peer-hover:scale-125"
    >
      <ChevronDown class="size-12" />
    </div>
  </button>
</template>
