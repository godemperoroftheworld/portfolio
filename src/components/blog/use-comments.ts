import type { CommentType } from "@/types.ts";
import { computed, onMounted, ref } from "vue";

export interface CommentTree extends CommentType {
  replies: CommentTree[];
}

export default function useComments(slug: string, initialComments: CommentType[]) {
  const comments = ref<CommentType[]>(initialComments);

  const commentTrees = computed(() => {
    const map: Record<number, CommentTree> = Object.fromEntries(
      comments.value.map(c => [c.id, { ...c, replies: [] }])
    );
    const root: CommentTree[] = [];

    comments.value.forEach(comment => {
      if (comment.parentId === null) {
        root.push(map[comment.id]);
      } else {
        map[comment.parentId]!.replies.push(map[comment.id]);
      }
    });

    return root;
  })

  onMounted(async () => {
    const res = await fetch(`/api/comments/${slug}`);
    comments.value = await res.json();
  });

  return commentTrees;
}
