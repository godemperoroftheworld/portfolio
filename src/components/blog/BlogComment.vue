<script setup lang="ts">
import type { CommentTree } from "@/components/blog/use-comments.ts";
import { computed, ref } from "vue";
import { actions } from "astro:actions";
import { useLocalStorage } from "@vueuse/core";
import CommentForm from "@/components/blog/CommentForm.vue";
import type { CommentType } from "@/types.ts";

interface Props {
  comment: CommentTree;
  slug: string;
}
type Emits = {
  submitted: [comment: CommentType];
};
const { comment, slug } = defineProps<Props>();
const emits = defineEmits<Emits>();

const likes = ref(comment.likes);
const liked = useLocalStorage(`comments.${comment.id}.liked`, false, {
  initOnMounted: true,
});

const replying = ref(false);

const formattedDate = computed(() =>
  new Date(comment.createdAt).toLocaleDateString("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
);

async function handleLike() {
  if (liked.value) {
    const { error } = await actions.unlike({ id: comment.id });
    if (!error) {
      --likes.value;
      liked.value = false;
    }
  } else {
    const { error } = await actions.like({ id: comment.id });
    if (!error) {
      ++likes.value;
      liked.value = true;
    }
  }
}
async function handleReply(comment: CommentType) {
  emits("submitted", comment);
}
</script>

<template>
  <div>
    <h3 class="text-primary-500 text-lg font-semibold">{{ comment.name }}</h3>
    <span class="text-silver-600 dark:text-silver-300">
      {{ formattedDate }}
    </span>
    <p class="mt-2">{{ comment.body }}</p>
    <div
      v-if="comment.replies.length"
      class="border-l-primary-700 ml-2 mt-2 flex flex-col gap-2 border-l py-2 pl-4"
    >
      <BlogComment
        v-for="reply in comment.replies"
        :comment="reply"
        :slug="slug"
        @submitted="handleReply"
      />
    </div>
    <div class="mt-4 flex gap-4">
      <div
        :class="[
          'cutout  w-fit p-px',
          liked ? 'bg-silver-900' : 'bg-silver-600 dark:bg-silver-300',
        ]"
      >
        <div
          :class="[
            ' cutout flex w-fit cursor-pointer select-none items-center gap-2 px-3 py-2 ',
            liked
              ? 'bg-primary-500 hover:bg-primary-400 active:bg-primary-600 text-white dark:text-black'
              : 'dark:bg-silver-950 hover:bg-silver-500/50 hover:dark:bg-silver-700/75 active:bg-silver-500/25 active:dark:bg-silver-700 bg-white hover:text-white',
          ]"
          @click="handleLike"
        >
          <svg
            class="size-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M13 22h-2v-2h2v2Zm-2-2H9v-2h2v2Zm4 0h-2v-2h2v2Zm-6-2H7v-2h2v2Zm8 0h-2v-2h2v2ZM7 16H5v-2h2v2Zm12 0h-2v-2h2v2ZM5 14H3v-2h2v2Zm16 0h-2v-2h2v2ZM3 12H1V6h2v6Zm20 0h-2V6h2v6ZM13 8h-2V6h2v2ZM5 6H3V4h2v2Zm6 0H9V4h2v2Zm4 0h-2V4h2v2Zm6 0h-2V4h2v2ZM9 4H5V2h4v2Zm10 0h-4V2h4v2Z"
            />
          </svg>
          {{ likes }}
        </div>
      </div>
      <div
        :class="[
          'cutout  w-fit p-px',
          replying ? 'bg-silver-900' : 'bg-silver-600 dark:bg-silver-300',
        ]"
      >
        <div
          :class="[
            'cutout active:bg-silver-500/25 active:dark:bg-silver-700 flex w-fit cursor-pointer select-none items-center gap-2 px-3 py-2 ',
            replying
              ? 'bg-silver-500/50 dark:bg-silver-700/75  hover:bg-silver-500/75 hover:dark:bg-silver-600'
              : 'dark:bg-silver-950 hover:bg-silver-500/50 hover:dark:bg-silver-700/75  bg-white hover:text-white',
          ]"
          @click="replying = !replying"
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
          Reply
        </div>
      </div>
    </div>
    <CommentForm
      v-if="replying"
      :slug="slug"
      :parentId="comment.id"
      @submitted="handleReply"
    />
  </div>
</template>
