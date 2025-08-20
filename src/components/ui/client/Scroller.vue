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
  <div
    v-bind="$attrs"
    class="font-heading text-primary-500 mx-auto w-fit text-lg font-bold"
  >
    <button @click="onClick" class="peer block w-fit cursor-pointer">
      <slot />
    </button>
    <button
      @click="onClick"
      aria-label="Scroll to Next Section"
      class="mx-auto mt-4 block w-fit animate-bounce cursor-pointer transition-all duration-200 hover:scale-125 peer-hover:scale-125"
    >
      <ChevronDown class="size-12" />
    </button>
  </div>
</template>
