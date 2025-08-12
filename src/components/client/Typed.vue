<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from "vue";
import { useElementVisibility } from "@vueuse/core";

const TYPING_SPEED = 92;
const FLASH_SPEED = 500;

interface Props {
  text: string;
  delay?: number;
}
const { text, delay = 0 } = defineProps<Props>();

const length = computed(() => text.length);
const duration = computed(() => length.value * TYPING_SPEED);
const flashCount = computed(() => {
  return Math.ceil(duration.value / FLASH_SPEED);
});

const elementRef = useTemplateRef("spanRef");
const isVisible = useElementVisibility(elementRef, {
  once: true,
});
const hasBeenVisible = ref(false);
watch(
  isVisible,
  val => {
    if (val) {
      hasBeenVisible.value = true;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div
    :class="{ isVisible: hasBeenVisible }"
    ref="spanRef"
    class="typewriter border-r-primary-500 mx-auto max-w-fit overflow-hidden whitespace-nowrap border-r-[0.15em]"
    :style="{
      '--width': `${length}ch`,
      '--chars': `${length}`,
      '--duration': `${duration}ms`,
      '--count': flashCount,
      '--delay': `${delay}ms`,
    }"
  >
    {{ text }}
  </div>
</template>

<style>
.typewriter {
  visibility: hidden;
  width: var(--width);

  &.isVisible {
    animation:
      showText 0s linear var(--delay) forwards,
      typing var(--duration) steps(var(--chars), end) var(--delay),
      blink-caret 500ms step-end var(--count) var(--delay) forwards;
  }
}

@keyframes showText {
  to {
    visibility: visible;
  }
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: var(--width);
  }
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: var(--color-primary-500);
  }
}
</style>
