<script setup lang="ts">
import type { Step } from "@/contents/history/types.ts";
import { historyStepStore } from "@/stores/historyStep.ts";
import DOMPurify from "isomorphic-dompurify";
import { useStore } from "@nanostores/vue";
import { useTemplateRef, watch } from "vue";
import emitter from "@/contents/history/events.ts";

interface Props {
  steps: Step[];
  alternate?: boolean;
}
const { steps, alternate } = defineProps<Props>();
const stepIndex = useStore(historyStepStore);

const LIST_GAP = 24;

function sanitizedHTML(step: Step) {
  return DOMPurify.sanitize(step.icon);
}
function onClickStep(idx: number) {
  emitter.emit("flyTo", idx);
  historyStepStore.set(idx);
}
function isFlipped(idx: number) {
  return alternate && idx % 2 !== 0;
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
    class="relative overflow-x-visible overflow-y-scroll"
    :class="{ 'px-4': !alternate }"
  >
    <div class="relative min-h-full">
      <div
        :class="{ 'sm:ml-70 absolute left-0 top-0 ml-60': alternate }"
        class="bg-primary-500 absolute left-0 top-0 min-h-full w-px shrink-0 bg-clip-content"
      >
        <div
          class="bg-primary-500 absolute left-0 top-0 size-3 -translate-x-1/2 rounded-full"
        />
        <div
          class="bg-primary-500 absolute bottom-0 left-0 size-3 -translate-x-1/2 rounded-full"
        />
      </div>
      <ol
        :class="{ 'alternate sm:pl-70 gap-0! pb-4 pl-60 pr-4': alternate }"
        class="flex h-full flex-col justify-center gap-6 pt-8"
      >
        <li
          class="sm:w-70 group pointer-events-none relative w-60 cursor-pointer"
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
            class="animate__animated iteration-infinite bg-primary-500 pointer-events-auto absolute left-[0.5px] top-2.5 size-3 -translate-x-1/2 rounded-full transition-transform duration-200 group-hover:scale-150"
          />
          <!-- Content -->
          <div
            :class="{
              'ml-4 group-hover:translate-x-4': !isFlipped(idx),
              'mr-4 -translate-x-[calc(100%+1rem)] group-hover:-translate-x-[calc(100%+2rem)]':
                isFlipped(idx),
              'translate-x-2.5': !isFlipped(idx) && idx === stepIndex,
              '-translate-x-2.5': isFlipped(idx) && idx === stepIndex,
            }"
            class="pointer-events-auto cursor-pointer transition-transform duration-200"
          >
            <div
              class="flex items-center gap-2"
              :class="{ 'flex-row-reverse text-right': isFlipped(idx) }"
            >
              <span
                v-html="sanitizedHTML(step)"
                class="outline-primary-500 flex size-8 items-center justify-center rounded-full p-1.5 outline"
              />
              <span class="font-heading text-primary-500">
                {{ step.label }}
              </span>
            </div>
            <span
              :class="{ 'text-right': isFlipped(idx) }"
              class="text-silver-300 ml-10 block text-sm italic"
            >
              {{ step.date[0].toDateString() }} -
              {{ step.date[1].toDateString() }}
            </span>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>
