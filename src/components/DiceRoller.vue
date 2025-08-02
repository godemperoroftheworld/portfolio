<script setup lang="ts">
  import diceBox from '@/utils/dice';
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
  <button v-bind="$attrs" @click="onClick" class="cursor-pointer select-none hover:bg-silver-700/75 active:bg-silver-900/75">
    <slot />
  </button>
</template>
