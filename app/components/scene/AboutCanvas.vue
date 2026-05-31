<script setup lang="ts">
import { createAboutScene } from '~/utils/three/aboutScene'

const containerRef = ref<HTMLElement | null>(null)

useThreeScene(containerRef, createAboutScene)
</script>

<template>
  <div ref="containerRef" class="scene-canvas scene-canvas--about" />
</template>
