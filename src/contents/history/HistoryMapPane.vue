<script setup lang="ts">
import type { Step } from "@/contents/history/types.ts";

interface Props {
  visible: boolean;
  step: Step;
  showPrevious: boolean;
  showNext: boolean;
}
interface Emits {
  next: [];
  previous: [];
}

const { visible, step, showPrevious, showNext } = defineProps<Props>();
const emits = defineEmits<Emits>();
</script>

<template>
  <transition
    enter-active-class="animate__animated animate__flipInX"
    leave-active-class="animate__animated animate__flipOutX"
  >
    <div
      data-aos="flip-up"
      data-aos-delay="300"
      v-show="visible"
      class="cutout z-2 p-0.25 bg-primary-500 absolute left-2 top-2"
    >
      <div
        class="cutout font-body animate__animated flex h-72 w-72 flex-col bg-black p-4"
      >
        <h2 class="text-lg">{{ step.label }}</h2>
        <h4 v-if="step.date" class="italic">
          {{ step.date[0].toDateString() }} - {{ step.date[1].toDateString() }}
        </h4>
        <div class="grow">
          {{ step.description }}
        </div>
        <div
          v-if="showNext || showPrevious"
          class="font-heading mt-4 flex items-center justify-between"
          :class="{ 'justify-end': !showPrevious }"
        >
          <button
            class="cursor-pointer"
            v-if="showPrevious"
            @click="emits('previous')"
          >
            Previous
          </button>
          <button class="cursor-pointer" v-if="showNext" @click="emits('next')">
            Next
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
