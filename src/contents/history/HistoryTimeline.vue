<script setup lang="ts">
import type { Step } from "@/contents/history/types.ts";
import { historyStepStore } from "@/stores/historyStep.ts";
import DOMPurify from "isomorphic-dompurify";
import { useStore } from "@nanostores/vue";
import { useTemplateRef, watch } from "vue";
import emitter from "@/contents/history/events.ts";

interface Props {
  steps: Step[];
}
const { steps } = defineProps<Props>();
const stepIndex = useStore(historyStepStore);

const LIST_GAP = 24;

function sanitizedHTML(step: Step) {
  return DOMPurify.sanitize(step.icon);
}
function onClickStep(idx: number) {
  emitter.emit("flyTo", idx);
  historyStepStore.set(idx);
}

const list = useTemplateRef<HTMLDivElement>("list");
const itemRefs = useTemplateRef<HTMLLIElement[]>("items");

watch(stepIndex, value => {
  // Get item bounding/scroll info
  const itemRef: HTMLLIElement = itemRefs.value![value];
  const itemTop = itemRef.offsetTop;
  const itemHeight = itemRef.clientHeight;
  const listMiddle = list.value!.clientHeight / 2;
  const isPastMidpoint = itemTop > listMiddle;
  list.value!.scrollBy({
    top:
      Math.max(
        Math.abs(itemTop - listMiddle),
        2 * (itemHeight + 2 * LIST_GAP)
      ) * (isPastMidpoint ? 1 : -1),
    behavior: "smooth",
  });
});
</script>

<template>
  <div
    ref="list"
    style="scrollbar-width: thin"
    class="relative w-fit overflow-x-visible overflow-y-scroll px-4"
  >
    <ol class="border-primary-500 flex h-fit flex-col gap-6 border-l py-4">
      <li
        class="group relative cursor-pointer"
        v-for="(step, idx) in steps"
        :key="idx"
        ref="items"
        @click="() => onClickStep(idx)"
      >
        <!-- Point -->
        <div
          :class="{
            'animate__heartBeat scale-125': idx === stepIndex,
          }"
          class="animate__animated iteration-infinite bg-primary-500 absolute -left-[0.5px] top-2.5 size-3 shrink-0 -translate-x-1/2 rounded-full transition-transform duration-200 group-hover:scale-150"
        />
        <!-- Content -->
        <div
          :class="{ 'translate-x-2.5': idx === stepIndex }"
          class="ml-4 cursor-pointer transition-transform duration-200 group-hover:translate-x-4"
        >
          <div class="flex items-center gap-2">
            <span
              v-html="sanitizedHTML(step)"
              class="outline-primary-500 flex size-8 items-center justify-center rounded-full p-1.5 outline"
            />
            <span class="font-heading text-primary-500">
              {{ step.label }}
            </span>
          </div>
          <span class="text-silver-500 ml-10 text-sm italic">
            {{ step.date[0].toDateString() }} -
            {{ step.date[1].toDateString() }}
          </span>
        </div>
      </li>
    </ol>
  </div>
</template>
