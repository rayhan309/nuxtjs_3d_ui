<script setup lang="ts">
import { navLinks, site } from '~/data/site'
</script>

<template>
  <footer class="footer">
    <div class="container footer__grid">
      <div class="footer__brand-block">
        <NuxtLink to="/" class="footer__brand">
          <span class="header__logo">A</span>
          <span>{{ site.name }}</span>
        </NuxtLink>
        <p class="footer__tagline">
          {{ site.description }}
        </p>
      </div>

      <div class="footer__col">
        <h3 class="footer__heading">
          Explore
        </h3>
        <ul class="footer__links">
          <li v-for="link in navLinks" :key="link.to">
            <NuxtLink :to="link.to">
              {{ link.label }}
            </NuxtLink>
          </li>
          <li><a href="#">Collections</a></li>
          <li><a href="#">New Arrivals</a></li>
        </ul>
      </div>

      <div class="footer__col">
        <h3 class="footer__heading">
          Support
        </h3>
        <ul class="footer__links">
          <li><a href="#">Help Center</a></li>
          <li><a href="#">Shipping</a></li>
          <li><a href="#">Returns</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>

      <div class="footer__col">
        <h3 class="footer__heading">
          Newsletter
        </h3>
        <p class="footer__newsletter-text">
          Get 10% off your first order and early access to 3D drops.
        </p>
        <form class="footer__form" @submit.prevent>
          <input type="email" placeholder="you@email.com" aria-label="Email">
          <button type="submit" class="btn btn--primary btn--sm">
            Join
          </button>
        </form>
      </div>
    </div>

    <div class="footer__bottom container">
      <p>&copy; {{ new Date().getFullYear() }} {{ site.name }}. All rights reserved.</p>
      <div class="footer__legal">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
      </div>
    </div>
  </footer>
</template>
