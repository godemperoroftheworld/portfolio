<template>
  <!-- Point -->
  <div
    :class="{
      'animate-heartbeat scale-125': isActive,
    }"
    class="iteration-infinite bg-primary-500 pointer-events-auto -ml-[0.3px] size-3 -translate-x-1/2 rounded-full transition-transform duration-200 group-hover:scale-150"
  />
  <!-- Content -->
  <div
    :class="{
      'max-md:max-h-dvh! max-w-72 translate-x-2.5 max-md:relative max-md:-mb-16 max-md:-mt-2':
        isActive,
    }"
    class="max-md:border-primary-500 transition-transform-extended pointer-events-auto absolute -top-2 left-4 max-h-[70px] min-w-72 cursor-pointer transition-transform duration-200 group-hover:translate-x-4 max-md:border max-md:p-2"
  >
    <div class="flex items-center gap-2">
      <Icon
        :path="step.icon"
        class="outline-primary-500 flex size-8 items-center justify-center rounded-full p-1.5 outline"
      />
      <span
        :class="isActive ? 'text-primary-300' : 'text-primary-500'"
        class="font-heading"
      >
        {{ step.label }}
      </span>
    </div>
    <span
      class="text-silver-600 dark:text-silver-300 ml-10 block text-sm italic"
    >
      {{ step.date[0].toDateString() }} -
      {{ step.date[1]?.toDateString() ?? "Present" }}
    </span>
    <div :class="{ hidden: !isActive }" class="font-body ml-10 mt-2 md:hidden">
      {{ step.description }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Step } from "@/components/history/types.ts";
import Icon from "@/components/ui/client/Icon.vue";

interface Props {
  step: Step;
  isActive: boolean;
}
const { step, isActive } = defineProps<Props>();
</script>
