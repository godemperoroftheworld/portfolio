<script setup lang="ts">
import type { Step } from "@/contents/history/types.ts";
import { historyStepStore } from "@/stores/historyStep.ts";
import { useStore } from "@nanostores/vue";
import emitter from "@/contents/history/events.ts";

interface Props {
  visible: boolean;
  step: Step;
  showPrevious: boolean;
  showNext: boolean;
}

const { visible, step, showPrevious, showNext } = defineProps<Props>();
const storeValue = useStore(historyStepStore);

function next() {
  historyStepStore.set(storeValue.value + 1);
  emitter.emit("flyTo", storeValue.value);
}
function previous() {
  historyStepStore.set(storeValue.value - 1);
  emitter.emit("flyTo", storeValue.value);
}
</script>

<template>
  <div v-show="visible" class="cutout p-0.25 bg-primary-500">
    <div
      class="font-body cutout animate__animated flex h-full w-full flex-col bg-black p-4 text-base"
    >
      <h2 class="text-lg font-bold">{{ step.label }}</h2>
      <h3 v-if="step.date" class="font-body! text-silver-300 italic">
        {{ step.date[0].toDateString() }} - {{ step.date[1].toDateString() }}
      </h3>
      <div class="mt-4 max-h-56 grow text-sm">
        {{ step.description }}
      </div>
      <div
        v-if="showNext || showPrevious"
        class="font-heading text-primary-500 mt-4 flex items-center justify-between text-sm font-bold"
        :class="{ 'justify-end': !showPrevious }"
      >
        <button class="cursor-pointer" v-if="showPrevious" @click="previous">
          Previous
        </button>
        <button class="cursor-pointer" v-if="showNext" @click="next">
          Next
        </button>
      </div>
    </div>
  </div>
</template>
