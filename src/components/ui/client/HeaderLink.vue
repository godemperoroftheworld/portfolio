<script setup lang="ts">
import scrollToElement from "@/utils/scroll.ts";
import { computedWithControl, isClient, useWindowScroll } from "@vueuse/core";
import { onMounted, ref } from "vue";

const TOP_THRESHOLD = 100;

interface Props {
  elementId: string;
}

const { elementId } = defineProps<Props>();
const { y: scrollY } = useWindowScroll();

const mounted = ref(false);

const elementVisible = computedWithControl([mounted, scrollY], () => {
  if (isClient && mounted.value) {
    const element = document.getElementById(elementId);
    if (element) {
      const bounds = element?.getBoundingClientRect();
      return Math.abs(bounds.top) < TOP_THRESHOLD;
    }
    return false;
  }
  return false;
});

onMounted(async () => {
  mounted.value = true;
});
</script>

<template>
  <a
    class="text-primary-500 hover:bg-silver-700/75 block cursor-pointer p-2 font-bold uppercase"
    :class="{
      'text-primary-100!': elementVisible,
    }"
    @click="() => scrollToElement(elementId)"
  >
    <slot />
  </a>
</template>
