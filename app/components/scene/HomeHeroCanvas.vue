<script setup lang="ts">
import { createHomeHeroScene } from '~/utils/three/homeHeroScene'

const containerRef = ref<HTMLElement | null>(null)

useThreeScene(containerRef, createHomeHeroScene)
</script>

<template>
  <div ref="containerRef" class="scene-canvas scene-canvas--hero" />
</template>
