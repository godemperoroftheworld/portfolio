<script setup lang="ts">
import scrollToElement from "@/utils/scroll.ts";
import { computedWithControl, isClient, useWindowScroll } from "@vueuse/core";
import { onMounted, ref } from "vue";

const TOP_THRESHOLD = 100;

interface Props {
  route: string;
  elementId?: string;
}

const { route, elementId } = defineProps<Props>();
const { y: scrollY } = useWindowScroll();

const mounted = ref(false);

const elementVisible = computedWithControl([mounted, scrollY], () => {
  if (isClient && mounted.value && elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      const bounds = element?.getBoundingClientRect();
      return Math.abs(bounds.top) < TOP_THRESHOLD;
    }
    return false;
  } else if (isClient && mounted.value) {
    return window.location.pathname === route;
  }
  return false;
});

function onClickLink() {
  if (route !== window.location.pathname) {
    if (elementId) {
      sessionStorage.setItem("scrollOnLoad", elementId);
    }
    window.location.href = route;
  } else if (elementId) {
    scrollToElement(elementId);
  }
}

onMounted(async () => {
  mounted.value = true;
});
</script>

<template>
  <button
    class="text-primary-500 hover:bg-silver-500/50 dark:hover:bg-silver-700/75 block cursor-pointer p-2 font-bold uppercase"
    :class="{
      'text-primary-100!': elementVisible,
    }"
    @click="onClickLink"
  >
    <slot />
  </button>
</template>
