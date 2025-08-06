<script setup lang="ts">
import Carousel from "@/components/Carousel.vue";

import ReactIcon from "@/icons/ReactIcon.svg?component";
import Vue from "@/icons/Vue.svg?component";
import TypeScript from "@/icons/TypeScript.svg?component";
import Tanstack from "@/icons/Tanstack.svg?component";
import Astro from "@/icons/Astro.svg?component";
import NodeJS from "@/icons/Nodejs.svg?component";
import NextJS from "@/icons/Nextjs.svg?component";
import Nuxt from "@/icons/Nuxt.svg?component";
import Express from "@/icons/Express.svg?component";
import Fastify from "@/icons/Fastify.svg?component";
import Prisma from "@/icons/Prisma.svg?component";
import Java from "@/icons/Java.svg?component";
import Spring from "@/icons/Spring.svg?component";
import Tailwind from "@/icons/Tailwind.svg?component";
import Strapi from "@/icons/Strapi.svg?component";
import Docker from "@/icons/Docker.svg?component";
import CSharp from "@/icons/CSharp.svg?component";
import Mongo from "@/icons/Mongo.svg?component";
import PostgreSQL from "@/icons/Postgresql.svg?component";
import Kotlin from "@/icons/Kotlin.svg?component";
import HTML from "@/icons/HTML.svg?component";
import CSS from "@/icons/CSS.svg?component";
import Vite from "@/icons/Vite.svg?component";
import Vitest from "@/icons/Vitest.svg?component";
import Jest from "@/icons/Jest.svg?component";
import Git from "@/icons/Git.svg?component";
import GithubActions from "@/icons/GithubActions.svg?component";
import CircleCI from "@/icons/CircleCI.svg?component";
import Cypress from "@/icons/Cypress.svg?component";
import Appium from "@/icons/Appium.svg?component";

import LinkIcon from "@/components/LinkIcon.vue";
import { type Component, computed } from "vue";

interface Icon {
  icon: Component;
  label: string;
}

const icons = computed<Icon[]>(
  () =>
    [
      { icon: TypeScript, label: "TypeScript" },
      { icon: HTML, label: "HTML" },
      { icon: CSS, label: "CSS" },
      { icon: Tailwind, label: "TailwindCSS" },
      { icon: NodeJS, label: "NodeJS" },
      { icon: Java, label: "Java" },
      { icon: CSharp, label: "CSharp" },
      { icon: Kotlin, label: "Kotlin" },
      { icon: Vue, label: "Vue" },
      { icon: ReactIcon, label: "React" },
      { icon: Astro, label: "Astro" },
      { icon: NextJS, label: "NextJS" },
      { icon: Nuxt, label: "Nuxt" },
      { icon: Express, label: "Express" },
      { icon: Fastify, label: "Fastify" },
      { icon: Spring, label: "Spring" },
    ] as Icon[]
);
const iconsTwo = computed<Icon[]>(() => [
  { icon: Prisma, label: "Prisma" },
  { icon: Mongo, label: "Mongo" },
  { icon: PostgreSQL, label: "PostgreSQL" },
  { icon: Tanstack, label: "Tanstack" },
  { icon: Strapi, label: "Strapi CMS" },
  { icon: GithubActions, label: "GitHub Actions" },
  { icon: CircleCI, label: "CircleCI" },
  { icon: Git, label: "Git" },
  { icon: Docker, label: "Docker" },
  { icon: Vite, label: "Vite" },
  { icon: Vitest, label: "Vitest" },
  { icon: Jest, label: "Jest" },
  { icon: Cypress, label: "Cypress" },
  { icon: Appium, label: "Appium" },
]);
</script>

<template>
  <Carousel
    :options="{ loop: true, skipSnaps: true, align: 'start' }"
    :scroll="{ playOnInit: true, speed: 1 }"
    class="mx-auto mb-3"
  >
    <template v-for="({ icon, label }, idx) in icons" :key="idx">
      <LinkIcon :icon="icon" :label="label" />
    </template>
  </Carousel>
  <Carousel
    :options="{
      loop: true,
      skipSnaps: true,
    }"
    :scroll="{ playOnInit: true, speed: -1 }"
    class="mx-auto"
  >
    <template v-for="({ icon, label }, idx) in iconsTwo" :key="`${idx}-two`">
      <LinkIcon :icon="icon" :label="label" />
    </template>
  </Carousel>
</template>
