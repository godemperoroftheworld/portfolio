import type { CommentType } from "@/types.ts";
import { computed, onMounted, ref } from "vue";

export interface CommentTree extends CommentType {
  replies: CommentTree[];
}

export default function useComments(slug: string, initialComments: CommentType[]) {
  const comments = ref<CommentType[]>(initialComments);

  const commentTrees = computed(() => {
    const map: Record<number, CommentTree> = {};
    const sorted = comments.value.toSorted((a, b) => b.id - a.id);
    sorted.forEach(comment => {
      map[comment.id] = { ...comment, replies: [] };
    });
    const root: CommentTree[] = [];

    sorted.forEach(comment => {
      if (comment.parentId === null) {
        root.push(map[comment.id]);
      } else {
        map[comment.parentId]!.replies.push(map[comment.id]);
      }
    });

    return root;
  })

  function addComment(comment: CommentType) {
    comments.value.push(comment);
  }

  onMounted(async () => {
    const res = await fetch(`/api/comments/${slug}`);
    comments.value = await res.json();
  });

  return { commentTrees, addComment };
}
