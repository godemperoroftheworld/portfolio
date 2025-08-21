<script setup lang="ts">
import Icon from "./Icon.vue";

export interface LinkIconProps {
  icon: string;
  label: string;
  href?: string;
  large?: boolean;
}
const { icon, label, href, large } = defineProps<LinkIconProps>();
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    :target="href ? '_blank' : undefined"
    :class="{
      'cursor-pointer transition-transform duration-200 hover:scale-110':
        !!href,
    }"
    class="pointer-events-auto flex flex-col items-center justify-center"
  >
    <Icon
      :path="icon"
      :class="{ 'size-10': !large, 'size-16': large }"
      class="group-[.card]/card:fill-silver-700 group-[.card]/card:text-silver-700 group-[.card]/card:dark:fill-silver-100 group-[.card]/card:dark:text-silver-100 size-10 fill-black text-black dark:fill-white dark:text-white"
    />
    <span class="text-center text-sm">{{ label }}</span>
  </component>
</template>
