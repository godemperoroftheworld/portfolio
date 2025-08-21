<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { computed } from "vue";
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
    // Do nothing when selecting current locale
    if (value === locale) return;
    let url = window.location.origin;
    // No suffix for defualt locale
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
    <div
      class="dark:ring-silver-300 relative focus-within:ring"
      style="--cutout-corner: 0.5em"
    >
      <div class="cutout p-0.25 bg-primary-500">
        <ListboxButton
          class="cutout not-dark:hover:text-white hover:bg-silver-500/50 dark:hover:bg-silver-700/75 flex h-8 w-16 cursor-pointer items-center justify-around bg-white px-2 py-1 font-bold uppercase focus:ring dark:bg-black"
        >
          <div class="h-4 leading-[1.2]">
            {{ LOCALE_MAP[locale] }}
          </div>
          <div class="h-4 leading-[1.2]">
            {{ locale }}
          </div>
        </ListboxButton>
      </div>
      <transition
        enter-active-class="transition duration-100 ease-in"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
      >
        <ListboxOptions class="absolute w-full bg-white pt-2 dark:bg-black">
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="(availableLocale, idx) in locales"
            :key="idx"
            :value="availableLocale"
          >
            <div
              :class="{
                'bg-silver-500/50 dark:bg-silver-700/75': active,
                'font-bold': selected,
              }"
              class="flex h-8 cursor-pointer select-none items-center justify-around px-2 uppercase"
            >
              <div class="h-4 leading-[1.2]">
                {{ LOCALE_MAP[availableLocale] }}
              </div>
              <div class="h-4 leading-[1.2]">
                {{ availableLocale }}
              </div>
            </div>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
