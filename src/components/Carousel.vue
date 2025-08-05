<script setup lang="ts">
import emblaCarouselVue from "embla-carousel-vue";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import AutoScrollPlugin from "embla-carousel-auto-scroll";
import type { AutoScrollOptionsType } from "embla-carousel-auto-scroll";
import type { EmblaOptionsType } from "embla-carousel";
import { computed, useSlots } from "vue";

interface Props {
  options?: EmblaOptionsType;
  scroll?: AutoScrollOptionsType;
  childClass?: string;
}
const {
  options = {},
  scroll = { playOnInit: false },
  childClass = "",
} = defineProps<Props>();
const slots = useSlots();

const [emblaRef] = emblaCarouselVue(options, [
  WheelGesturesPlugin(),
  AutoScrollPlugin(scroll),
]);

const children = computed(() => {
  const result = slots.default ? slots.default() : [];
  if (result.length === 1 && result[0].children) {
    return result[0].children;
  }
  return result;
});
</script>

<template>
  <div class="embla" ref="emblaRef">
    <div class="embla__container flex">
      <template v-for="(child, index) in children" :key="index">
        <div :class="`embla__slide ${childClass} mr-4`">
          <component :is="child" />
        </div>
      </template>
    </div>
  </div>
</template>
