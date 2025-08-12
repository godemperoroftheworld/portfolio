<script setup lang="ts">
import { computed } from "vue";
import DOMPurify from "isomorphic-dompurify";

export interface LinkIconProps {
  icon: string;
  label: string;
}
const { icon, label } = defineProps<LinkIconProps>();

const sanitizedIcon = computed(() => {
  return DOMPurify.sanitize(icon);
});
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div v-html="sanitizedIcon" class="h-10 w-10 fill-white" />
    <span class="text-center text-sm">{{ label }}</span>
  </div>
</template>
