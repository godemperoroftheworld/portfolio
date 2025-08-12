<script setup lang="ts">
import Carousel from "@/components/client/Carousel.vue";
import LinkIcon from "@/components/client/LinkIcon.vue";

import ReactIcon from "@/icons/ReactIcon.svg?raw";
import Vue from "@/icons/Vue.svg?raw";
import TypeScript from "@/icons/TypeScript.svg?raw";
import Tanstack from "@/icons/Tanstack.svg?raw";
import Astro from "@/icons/Astro.svg?raw";
import NodeJS from "@/icons/Nodejs.svg?raw";
import NextJS from "@/icons/Nextjs.svg?raw";
import Nuxt from "@/icons/Nuxt.svg?raw";
import Express from "@/icons/Express.svg?raw";
import Fastify from "@/icons/Fastify.svg?raw";
import Prisma from "@/icons/Prisma.svg?raw";
import Java from "@/icons/Java.svg?raw";
import Spring from "@/icons/Spring.svg?raw";
import Tailwind from "@/icons/Tailwind.svg?raw";
import Strapi from "@/icons/Strapi.svg?raw";
import Docker from "@/icons/Docker.svg?raw";
import CSharp from "@/icons/CSharp.svg?raw";
import Mongo from "@/icons/Mongo.svg?raw";
import PostgreSQL from "@/icons/Postgresql.svg?raw";
import Kotlin from "@/icons/Kotlin.svg?raw";
import HTML from "@/icons/HTML.svg?raw";
import CSS from "@/icons/CSS.svg?raw";
import Vite from "@/icons/Vite.svg?raw";
import Vitest from "@/icons/Vitest.svg?raw";
import Jest from "@/icons/Jest.svg?raw";
import Git from "@/icons/Git.svg?raw";
import GithubActions from "@/icons/GithubActions.svg?raw";
import CircleCI from "@/icons/CircleCI.svg?raw";
import Cypress from "@/icons/Cypress.svg?raw";
import Appium from "@/icons/Appium.svg?raw";
import Python from "@/icons/Python.svg?raw";
import Flask from "@/icons/Flask.svg?raw";
import Mapbox from "@/icons/Mapbox.svg?raw";

import { computed } from "vue";

interface Icon {
  icon: string;
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
      { icon: Python, label: "Python" },
      { icon: Vue, label: "Vue" },
      { icon: ReactIcon, label: "React" },
      { icon: Astro, label: "Astro" },
      { icon: NextJS, label: "NextJS" },
      { icon: Nuxt, label: "Nuxt" },
      { icon: Express, label: "Express" },
      { icon: Fastify, label: "Fastify" },
      { icon: Spring, label: "Spring" },
      { icon: Flask, label: "Flask" },
    ] as Icon[]
);
const iconsTwo = computed<Icon[]>(() => [
  { icon: Prisma, label: "Prisma" },
  { icon: Mongo, label: "Mongo" },
  { icon: PostgreSQL, label: "PostgreSQL" },
  { icon: Tanstack, label: "Tanstack" },
  { icon: Strapi, label: "Strapi" },
  { icon: Mapbox, label: "Mapbox" },
  { icon: GithubActions, label: "Actions" },
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
  <div>
    <Carousel
      :options="{ loop: true, skipSnaps: true, align: 'start' }"
      :scroll="{ playOnInit: true, speed: 0.75 }"
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
      :scroll="{ playOnInit: true, speed: -0.75 }"
      class="mx-auto"
    >
      <template v-for="({ icon, label }, idx) in iconsTwo" :key="`${idx}-two`">
        <LinkIcon :icon="icon" :label="label" />
      </template>
    </Carousel>
  </div>
</template>
