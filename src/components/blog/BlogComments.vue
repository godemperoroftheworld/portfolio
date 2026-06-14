<script setup lang="ts">
import type { CommentType } from "@/types.ts";
import useComments from "@/components/blog/use-comments.ts";
import BlogComment from "@/components/blog/BlogComment.vue";

interface Props {
  slug: string;
  comments: CommentType[];
}

const { slug, comments } = defineProps<Props>();
const commentTrees = useComments(slug, comments);
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="comment in commentTrees"
      class="cutout bg-primary-700 p-0.25 relative"
      :key="comment.id">
      <div class="cutout dark:bg-silver-950 h-full bg-white p-4">
        <BlogComment :comment="comment" />
      </div>
    </div>
  </div>
</template>
