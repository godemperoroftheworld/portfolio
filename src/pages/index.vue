<script setup lang="ts">
  import { watch } from 'vue';

  const route = useRoute();
  const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first());

  watch(
    home,
    (val) => {
      console.log('val: ' + JSON.stringify(val));
    },
    { immediate: true },
  );
</script>

<template>
  <ContentRenderer
    v-if="home"
    :value="home" />
  <div v-else>Page not found</div>
</template>
