<script setup lang="ts">
import type { Step } from "@/components/history/types.ts";
import { historyStepStore } from "@/stores/historyStep.ts";
import { useStore } from "@nanostores/vue";
import emitter from "@/components/history/events.ts";
import HistoryTimelineStep from "@/components/history/timeline/HistoryTimelineStep.vue";

interface Props {
  steps: Step[];
}
const { steps } = defineProps<Props>();
const stepIndex = useStore(historyStepStore);

function isActive(idx: number) {
  return idx === stepIndex.value;
}
function onClickStep(idx: number) {
  emitter.emit("flyTo", idx);
  historyStepStore.set(idx);
}
</script>

<template>
  <div
    style="scrollbar-width: thin"
    class="relative overflow-x-visible overflow-y-scroll"
  >
    <div
      class="relative h-fit min-h-full w-full px-8 pb-20 pt-4 md:pb-16 md:pt-8"
    >
      <ol
        class="border-primary-500 flex min-h-full w-full flex-col justify-between gap-16 border-l max-md:gap-20"
      >
        <li
          class="group pointer-events-none relative w-full min-w-72 cursor-pointer"
          v-for="(step, idx) in steps"
          :key="idx"
          @click="() => onClickStep(idx)"
        >
          <history-timeline-step
            v-if="step"
            :step="step"
            :is-active="isActive(idx)"
          />
        </li>
      </ol>
    </div>
  </div>
</template>

<style>
.transition-transform-extended {
  transition-property: transform, translate, scale, rotate, max-height;
}
</style>
