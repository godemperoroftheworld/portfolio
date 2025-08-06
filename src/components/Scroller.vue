<script setup lang="ts">
import ChevronDown from "@/icons/ChevronDown.svg?component";

interface Props {
  elementId: string;
}
const { elementId } = defineProps<Props>();

function scrollToElement() {
  const target = document.getElementById(elementId);
  const y = target!.getBoundingClientRect().top + window.scrollY - 72; // 8px = 1rem
  window.scrollTo({ top: y, behavior: "smooth" });
}
</script>

<template>
  <div
    v-bind="$attrs"
    class="font-heading text-primary-500 mx-auto mt-4 w-fit text-lg font-bold"
  >
    <a @click="scrollToElement" class="peer block w-fit cursor-pointer">
      <slot />
    </a>
    <a
      @click="scrollToElement"
      class="mx-auto mt-4 block w-fit animate-bounce cursor-pointer transition-all duration-200 hover:scale-125 peer-hover:scale-125"
    >
      <ChevronDown class="size-12" />
    </a>
  </div>
</template>
