<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { computed, ref } from "vue";
import { DEFAULT_LOCALE, type Locale, locales } from "@/utils/locale.ts";

interface Props {
  locale: Locale;
}
const { locale } = defineProps<Props>();

const LOCALE_MAP: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
};

const selectedLocale = computed({
  get: () => locale,
  set(value) {
    let url = window.location.origin;
    const localeSuffix = value === DEFAULT_LOCALE ? "" : value;
    if (localeSuffix) {
      url += `/${localeSuffix}`;
    }
    window.location.assign(url);
  },
});
</script>

<template>
  <Listbox v-model="selectedLocale">
    <div class="relative" style="--cutout-corner: 0.5em">
      <div class="cutout p-0.25 bg-primary-500">
        <ListboxButton
          class="cutout w-16 cursor-pointer bg-white px-2 py-1 font-bold uppercase dark:bg-black"
        >
          {{ LOCALE_MAP[locale] }}
          {{ " " }}
          {{ locale }}
        </ListboxButton>
      </div>
      <ListboxOptions class="absolute w-full bg-white pt-2 dark:bg-black">
        <ListboxOption
          v-slot="{ active, selected }"
          class="hover:bg-silver-500/50 dark:hover:bg-silver-700/75 cursor-pointer px-2"
          v-for="(availableLocale, idx) in locales"
          :key="idx"
          :value="availableLocale"
          :disabled="availableLocale === locale"
        >
          <div
            class="flex items-center uppercase"
            :class="{ 'font-bold': selected }"
          >
            {{ LOCALE_MAP[availableLocale] }}
            {{ " " }}
            {{ availableLocale }}
          </div>
        </ListboxOption>
      </ListboxOptions>
    </div>
  </Listbox>
</template>
