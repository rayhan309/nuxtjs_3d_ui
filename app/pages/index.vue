<script setup lang="ts">
import { site, stats, team, values } from '~/data/site'

definePageMeta({
  layout: 'default',
})

useHead({
  title: `${site.name} — 3D E-Commerce Store`,
  meta: [
    {
      name: 'description',
      content: site.description,
    },
  ],
})
</script>

<template>
  <HomePageContent />
</template>
