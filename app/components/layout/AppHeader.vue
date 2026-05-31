<script setup lang="ts">
import { navLinks, site } from '~/data/site'

const route = useRoute()
</script>

<template>
  <header class="header">
    <div class="header__inner container">
      <NuxtLink to="/" class="header__brand">
        <span class="header__logo">A</span>
        <span class="header__name">{{ site.name }}</span>
      </NuxtLink>

      <nav class="header__nav" aria-label="Main navigation">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="header__link"
          :class="{ 'header__link--active': route.path === link.to }"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="header__actions">
        <button type="button" class="header__icon-btn" aria-label="Search">
          ⌕
        </button>
        <button type="button" class="header__icon-btn header__cart" aria-label="Cart">
          🛒
          <span class="header__cart-count">2</span>
        </button>
        <button type="button" class="btn btn--primary btn--sm header__shop-btn">
          Shop Now
        </button>
      </div>
    </div>
  </header>
</template>
