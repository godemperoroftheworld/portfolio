<script setup lang="ts">
import { computed } from "vue";
import DOMPurify from "isomorphic-dompurify";

export interface LinkIconProps {
  icon: string;
  label: string;
  href?: string;
  large?: boolean;
}
const { icon, label, href, large } = defineProps<LinkIconProps>();

const sanitizedIcon = computed(() => {
  return DOMPurify.sanitize(icon);
});

function onClick() {
  window.open(href, "_blank");
}
</script>

<template>
  <div
    :class="{
      'cursor-pointer transition-transform duration-200 hover:scale-110':
        !!href,
    }"
    class="pointer-events-auto flex flex-col items-center justify-center"
    @click="onClick"
  >
    <div
      v-html="sanitizedIcon"
      :class="{ 'size-10': !large, 'size-16': large }"
      class="size-10 fill-white"
    />
    <span class="text-center text-sm">{{ label }}</span>
  </div>
</template>
