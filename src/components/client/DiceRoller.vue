<script setup lang="ts">
import diceBox from "@/utils/dice.ts";
import { toast } from "vue3-toastify";

interface Props {
  modifier: number;
}
const { modifier } = defineProps<Props>();

async function onClick() {
  const [result] = await diceBox.add({ qty: 1, sides: 20 });
  toast.dark(`Result: ${result.value + modifier}`);
}
</script>

<template>
  <button
    v-bind="$attrs"
    @click="onClick"
    class="hover:bg-silver-700/75 active:bg-silver-900/75 cursor-pointer select-none"
  >
    <slot />
  </button>
</template>
