<script setup lang="ts">
import LinkIcon, {
  type LinkIconProps,
} from "@/components/ui/client/LinkIcon.vue";
import Carousel from "@/components/ui/client/Carousel.vue";

interface Props {
  links: LinkIconProps[];
}

const { links } = defineProps<Props>();
</script>

<template>
  <Carousel
    :options="{ loop: true, skipSnaps: true, align: 'start' }"
    :scroll="{ playOnInit: true, speed: 0.75 }"
  >
    <template v-for="({ label, icon }, key) in links" :key="key">
      <LinkIcon :label="label" :icon="icon" />
    </template>
  </Carousel>
</template>
