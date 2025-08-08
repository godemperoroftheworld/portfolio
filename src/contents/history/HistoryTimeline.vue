<script setup lang="ts">
import type { Step } from "@/contents/history/types.ts";
import { historyStepStore } from "@/stores/historyStep.ts";
import DOMPurify from "isomorphic-dompurify";
import { useStore } from "@nanostores/vue";
import { ref, useTemplateRef, watch } from "vue";
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
    class="relative overflow-x-visible overflow-y-scroll"
  >
    <div class="relative size-full px-8 pb-20 pt-4 md:pb-16">
      <ol
        class="border-primary-500 flex min-h-full w-full flex-col justify-between gap-16 border-l max-md:gap-20"
      >
        <li
          class="group pointer-events-none relative w-full min-w-72 cursor-pointer"
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
            class="animate__animated iteration-infinite bg-primary-500 pointer-events-auto left-[0.5px] top-2.5 size-3 -translate-x-1/2 rounded-full transition-transform duration-200 group-hover:scale-150"
          />
          <!-- Content -->
          <div
            :class="{
              'max-md:max-h-dvh! translate-x-2.5 max-md:relative max-md:-mb-16 max-md:w-fit sm:max-md:max-w-96':
                idx === stepIndex,
            }"
            class="max-md:border-primary-500 transition-transform-extended pointer-events-auto absolute -top-2 left-4 max-h-[70px] min-w-72 cursor-pointer transition-transform duration-200 group-hover:translate-x-4 max-md:border max-md:p-2"
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
            <span class="text-silver-300 ml-10 block text-sm italic">
              {{ step.date[0].toDateString() }} -
              {{ step.date[1].toDateString() }}
            </span>
            <div
              :class="{ hidden: idx !== stepIndex }"
              class="font-body ml-10 md:hidden"
            >
              {{ step.description }}
            </div>
          </div>
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
