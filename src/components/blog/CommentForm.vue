<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import { ref } from "vue";
import { actions } from "astro:actions";
import type { CommentType } from "@/types.ts";

interface Props {
  slug: string;
  parentId?: number;
}
type Emits = {
  submitted: [comment: CommentType];
};

const { slug, parentId } = defineProps<Props>();
const emits = defineEmits<Emits>();

const name = useLocalStorage("name", "", { initOnMounted: true });
const message = ref("");

const handleSubmit = async () => {
  const { error, data } = await actions.comment({
    postSlug: slug,
    parentId,
    name: name.value,
    body: message.value,
  });
  if (!error) {
    message.value = "";
    emits("submitted", data);
  }
};
</script>

<template>
  <div>
    <h3
      v-if="!parentId"
      :class="['text-primary-500 font-bold', parentId ? 'text-xl' : 'text-2xl']"
    >
      Add a comment
    </h3>
    <div class="mt-4 flex flex-col gap-3">
      <div class="cutout bg-silver-600 dark:bg-silver-300 p-px">
        <input
          v-model="name"
          type="text"
          placeholder="Name"
          class="cutout bg-silver-100 dark:bg-silver-950 w-full px-4 py-2 outline-none"
        />
      </div>
      <div class="cutout bg-silver-600 dark:bg-silver-300 flex p-px">
        <textarea
          v-model="message"
          placeholder="Your comment"
          rows="4"
          class="cutout bg-silver-100 dark:bg-silver-950 w-full resize-none px-4 py-2 outline-none"
        />
      </div>
      <div class="cutout bg-silver-600 dark:bg-silver-300 w-fit p-px">
        <div
          class="hover:bg-silver-500/75 hover:dark:bg-silver-700/75 cutout active:bg-silver-500/25 active:dark:bg-silver-700 dark:bg-silver-950 flex w-fit cursor-pointer items-center gap-2 bg-white px-3 py-2 hover:text-white"
          @click="handleSubmit"
        >
          <svg
            class="size-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M22 22h-2v-2h-2v-2h2V4h2v18Zm-4-4H4v-2h14v2ZM4 16H2V4h2v12Zm8-4H6v-2h6v2Zm6-4H6V6h12v2Zm2-4H4V2h16v2Z"
            />
          </svg>
          Post comment
        </div>
      </div>
    </div>
  </div>
</template>
