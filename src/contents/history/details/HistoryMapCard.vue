<script setup lang="ts">
import HistoryMapPane from "@/contents/history/details/HistoryMapPane.vue";
import type { Step } from "@/contents/history/types.ts";
import { useStore } from "@nanostores/vue";
import { historyStepStore } from "@/stores/historyStep.ts";
import { computed } from "vue";

interface Props {
  steps: Step[];
}
const { steps } = defineProps<Props>();
const stepIndex = useStore(historyStepStore);

const step = computed(() => {
  return steps[stepIndex.value];
});
const showPrevious = computed(() => {
  return stepIndex.value > 0;
});
const showNext = computed(() => {
  return stepIndex.value + 1 < steps.length;
});
</script>

<template>
  <div class="cutout p-0.25 bg-primary-500">
    <div class="cutout p-0.25 bg-black">
      <HistoryMapPane
        visible
        :step="step"
        :show-previous="showPrevious"
        :show-next="showNext"
      />
    </div>
  </div>
</template>
