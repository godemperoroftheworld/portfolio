<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from "vue";
import LeaderLine from "leader-line-new";
import { useMutationObserver } from "@vueuse/core";

interface Props {
  cardSelector: string;
}
const { cardSelector } = defineProps<Props>();

const lines: LeaderLine[] = [];

function initLines() {
  clearLines();

  const cards = document.querySelectorAll(cardSelector);

  cards.forEach((card, i) => {
    if (!cards[i + 1]) return;
    lines.push(
      new LeaderLine(card, cards[i + 1], {
        color: "#b8860b",
        dash: { animation: false, len: 8, gap: 8 },
        path: "fluid",
        startSocket: i % 2 === 0 ? "right" : "left",
        endSocket: "top",
        size: 4,
        endPlug: "disc",
      })
    );
  });
}
function clearLines() {
  lines.forEach(l => l.remove());
  lines.length = 0;
}

useMutationObserver(
  document.body,
  async mutations => {
    for (const mutation of mutations) {
      const el = mutation.target as Element;
      if (el.classList.contains("aos-animate") && el.matches(cardSelector)) {
        initLines();
      }
    }
  },
  {
    attributes: true,
    subtree: true,
    attributeFilter: ["class"],
  }
);
onMounted(() => {
  const interval = setInterval(initLines, 100)
  setTimeout(() => {
    clearInterval(interval);
  }, 400);
});
onUnmounted(clearLines);
</script>

<template>
  <div />
</template>
