<script setup lang="ts">
import { computedAsync } from "@vueuse/core";
import DOMPurify from "isomorphic-dompurify";
import { computed } from "vue";

interface Props {
  path: string;
}
const { path } = defineProps<Props>();

const modules = import.meta.glob("@assets/icons/*.svg", {
  query: "?raw",
  import: "default",
});

const fixedPath = computed(() => path.replace("@assets", "/src/assets"));
const iconParsed = computedAsync(async () => {
  if (modules[fixedPath.value]) {
    const iconRaw = (await modules[fixedPath.value]()) as string;
    return DOMPurify.sanitize(iconRaw);
  }
  return null;
});
</script>

<template>
  <div v-html="iconParsed"></div>
</template>
