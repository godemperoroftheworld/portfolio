<script setup lang="ts">
import diceBox from "@/utils/dice.ts";
import { toast } from "vue3-toastify";
import { breakpointsTailwind, refDebounced, useWindowSize } from "@vueuse/core";
import { onMounted, toRef, watch } from "vue";

interface Props {
  modifier: number;
}
const { modifier } = defineProps<Props>();

const { width } = useWindowSize();
const scale = refDebounced(
  toRef(() => {
    if (width.value > breakpointsTailwind.md) {
      return 4;
    }
    return 3;
  }),
  500
);

watch(scale, value => {
  diceBox.config.scale = value;
});
onMounted(() => {
  diceBox.config.scale = scale.value;
});

async function onClick() {
  const [result] = await diceBox.add({ qty: 1, sides: 20 }, { scale });
  toast.dark(`Result: ${result.value + modifier}`);
}
</script>

<template>
  <button
    v-bind="$attrs"
    @click="onClick"
    class="hover:bg-silver-500/50 dark:hover:bg-silver-700/75 active:bg-silver-900/75 cursor-pointer select-none"
  >
    <slot />
  </button>
</template>
