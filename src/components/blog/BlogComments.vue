<script setup lang="ts">
import type { CommentType } from "@/types.ts";
import useComments from "@/components/blog/use-comments.ts";
import BlogComment from "@/components/blog/BlogComment.vue";
import CommentForm from "@/components/blog/CommentForm.vue";
import { toast } from "vue3-toastify";
import { useDark } from "@vueuse/core";

interface Props {
  slug: string;
  comments: CommentType[];
}

const { slug, comments } = defineProps<Props>();
const { commentTrees, addComment } = useComments(slug, comments);
const isDark = useDark({
  disableTransition: false,
});

function onCommentSubmitted(comment: CommentType) {
  addComment(comment);
  // Like comment
  localStorage.setItem(`comments.${comment.id}.liked`, "true");
  // Show toast
  if (isDark.value) {
    toast.dark("Comment submitted successfully!");
  } else {
    toast.info("Comment submitted successfully!");
  }
}
</script>

<template>
  <div class="min-w-4xl mt-10">
    <h3 class="text-primary-500 text-2xl font-bold">Comments</h3>
    <hr class="border-t-primary-800 mb-4 mt-2 border-t" />
    <span class="text-silver-600 dark:text-silver-300 uppercase">
      {{ comments.length }} comments
    </span>
    <div class="mt-4 flex flex-col gap-4">
      <div
        v-for="comment in commentTrees"
        class="cutout bg-primary-700 p-0.25 relative"
        :key="comment.id"
      >
        <div class="cutout dark:bg-silver-950 h-full bg-white p-4">
          <BlogComment :comment="comment" :slug="slug" @submitted="onCommentSubmitted" />
        </div>
      </div>
    </div>
    <hr class="border-t-primary-800 my-4 border-t" />
    <CommentForm :slug="slug" @submitted="onCommentSubmitted" />
  </div>
</template>
