<script setup lang="ts">
import { computedAsync } from "@vueuse/core";
import DOMPurify from "isomorphic-dompurify";

interface Props {
  path: string;
}
const { path } = defineProps<Props>();

const modules = import.meta.glob("@/assets/icons/*.svg", {
  query: "?raw",
  import: "default",
});

const iconParsed = computedAsync(async () => {
  if (modules[path]) {
    const iconRaw = (await modules[path]()) as string;
    return DOMPurify.sanitize(iconRaw);
  }
  return null;
});
</script>

<template>
  <div v-html="iconParsed"></div>
</template>
