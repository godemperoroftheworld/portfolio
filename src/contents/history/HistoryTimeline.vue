<script setup lang="ts">
import type { Step } from "@/contents/history/types.ts";
import { historyStepStore } from "@/stores/historyStep.ts";
import DOMPurify from "isomorphic-dompurify";
import { useStore } from "@nanostores/vue";
import emitter from "@/contents/history/events.ts";

interface Props {
  steps: Step[];
}
const { steps } = defineProps<Props>();
const stepIndex = useStore(historyStepStore);

function sanitizedHTML(step: Step) {
  return DOMPurify.sanitize(step.icon);
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
          <!-- Point -->
          <div
            :class="{
              'animate__heartBeat scale-125': idx === stepIndex,
            }"
            class="animate__animated iteration-infinite bg-primary-500 pointer-events-auto -ml-[0.3px] size-3 -translate-x-1/2 rounded-full transition-transform duration-200 group-hover:scale-150"
          />
          <!-- Content -->
          <div
            :class="{
              'max-md:max-h-dvh! max-w-72 translate-x-2.5 max-md:relative max-md:-mb-16 max-md:-mt-2':
                idx === stepIndex,
            }"
            class="max-md:border-primary-500 transition-transform-extended pointer-events-auto absolute -top-2 left-4 max-h-[70px] min-w-72 cursor-pointer transition-transform duration-200 group-hover:translate-x-4 max-md:border max-md:p-2"
          >
            <div class="flex items-center gap-2">
              <span
                v-html="sanitizedHTML(step)"
                class="outline-primary-500 flex size-8 items-center justify-center rounded-full p-1.5 outline"
              />
              <span
                :class="
                  idx === stepIndex ? 'text-primary-300' : 'text-primary-500'
                "
                class="font-heading"
              >
                {{ step.label }}
              </span>
            </div>
            <span class="text-silver-300 ml-10 block text-sm italic">
              {{ step.date[0].toDateString() }} -
              {{ step.date[1]?.toDateString() ?? "Present" }}
            </span>
            <div
              :class="{ hidden: idx !== stepIndex }"
              class="font-body ml-10 mt-2 md:hidden"
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
