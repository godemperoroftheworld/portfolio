<script setup lang="ts">
import type { Step } from "@/contents/history/types.ts";
import { historyStepStore } from "@/stores/historyStep.ts";
import DOMPurify from "isomorphic-dompurify";
import { useStore } from "@nanostores/vue";

interface Props {
  steps: Step[];
}
const { steps } = defineProps<Props>();
const stepIndex = useStore(historyStepStore);

function sanitizedHTML(step: Step) {
  return DOMPurify.sanitize(step.icon);
}
function onClickStep(idx: number) {
  historyStepStore.set(idx);
}
</script>

<template>
  <ol class="border-primary-500 flex h-fit flex-col gap-6 border-l-2 py-6">
    <li
      class="-translate-x-1.75 flex items-center gap-4"
      v-for="(step, idx) in steps"
      :key="idx"
    >
      <div class="bg-primary-500 size-3 shrink-0 rounded-full" />
      <button
        :class="{ 'translate-x-2': idx === stepIndex }"
        class="flex cursor-pointer items-center gap-2 transition-transform duration-200 hover:translate-x-4"
        @click="() => onClickStep(idx)"
      >
        <span
          v-html="sanitizedHTML(step)"
          class="outline-primary-500 flex size-8 items-center justify-center rounded-full p-1.5 outline"
        />
        <span class="font-heading text-primary-500">
          {{ step.label }}
        </span>
      </button>
    </li>
  </ol>
</template>
