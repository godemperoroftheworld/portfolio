<script setup lang="ts">
import { toast } from "vue3-toastify";
import useDiceBox from "@/utils/dice.ts";
import { useDark } from "@vueuse/core";

interface Props {
  modifier: number;
}
const { modifier } = defineProps<Props>();

const diceBox = useDiceBox();
const isDark = useDark({
  disableTransition: false,
});

async function onClick() {
  const [result] = await diceBox.add({ qty: 1, sides: 20 });
  if (isDark.value) {
    toast.dark(`Result: ${result.value + modifier}`);
  } else {
    toast.info(`Result: ${result.value + modifier}`);
  }
}
</script>

<template>
  <button
    ref="diceRoller"
    v-bind="$attrs"
    @click="onClick"
    class="hover:bg-silver-500/50 dark:hover:bg-silver-700/75 active:bg-silver-900/75 cursor-pointer select-none"
  >
    <slot />
  </button>
</template>
