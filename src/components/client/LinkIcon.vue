<script setup lang="ts">
import type { Component } from "vue";

interface Props {
  icon: Component;
  label: string;
}
const { icon, label } = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <component class="h-10 w-10 fill-white" :is="icon" />
    <span class="text-center text-sm">{{ label }}</span>
  </div>
</template>
