<script setup lang="ts">
import Carousel from "@/components/ui/client/Carousel.vue";
import LinkIcon from "@/components/ui/client/LinkIcon.vue";

interface Icon {
  label: string;
  src: string;
}
interface Props {
  icons: Icon[];
  iconsTwo: Icon[];
}

const { icons, iconsTwo } = defineProps<Props>();
</script>

<template>
  <div>
    <Carousel
      :options="{ loop: true, skipSnaps: true, align: 'start' }"
      :scroll="{ playOnInit: true, speed: 0.75 }"
      class="mx-auto mb-3"
    >
      <template v-for="({ src, label }, idx) in icons" :key="idx">
        <LinkIcon :icon="src" :label="label" />
      </template>
    </Carousel>
    <Carousel
      :options="{
        loop: true,
        skipSnaps: true,
      }"
      :scroll="{ playOnInit: true, speed: -0.75 }"
      class="mx-auto"
    >
      <template v-for="({ src, label }, idx) in iconsTwo" :key="`${idx}-two`">
        <LinkIcon :icon="src" :label="label" />
      </template>
    </Carousel>
  </div>
</template>
