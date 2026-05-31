<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <header
    class="section-heading"
    :class="align === 'center' ? 'section-heading--center' : ''"
  >
    <p v-if="eyebrow" class="section-heading__eyebrow">
      {{ eyebrow }}
    </p>
    <h2 class="section-heading__title">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="section-heading__subtitle">
      {{ subtitle }}
    </p>
  </header>
</template>
