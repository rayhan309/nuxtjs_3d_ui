<script setup lang="ts">
import { categories, featuredProducts } from '~/data/products'
import { benefits } from '~/data/site'
</script>

<template>
  <section class="home-hero">
    <ClientOnly>
      <HomeHeroCanvas />
      <template #fallback>
        <div class="scene-loading">
          Loading 3D store...
        </div>
      </template>
    </ClientOnly>

    <div class="home-hero__content container">
      <div class="home-hero__badge">
        <span class="pulse-dot" />
        New 3D shopping experience
      </div>

      <h1 class="home-hero__title">
        Shop smarter in
        <span class="text-gradient">immersive 3D</span>
      </h1>

      <p class="home-hero__subtitle">
        Discover premium products with interactive previews, curated collections,
        and lightning-fast checkout — all in one beautiful store.
      </p>

      <div class="home-hero__actions">
        <button type="button" class="btn btn--primary btn--lg">
          Explore Collection
        </button>
        <NuxtLink to="/about" class="btn btn--outline btn--lg">
          Our Story
        </NuxtLink>
      </div>

      <div class="home-hero__stats">
        <div class="home-hero__stat">
          <strong>2K+</strong>
          <span>3D Products</span>
        </div>
        <div class="home-hero__stat">
          <strong>50K+</strong>
          <span>Customers</span>
        </div>
        <div class="home-hero__stat">
          <strong>4.9★</strong>
          <span>Rating</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--categories">
    <div class="container">
      <SectionHeading
        eyebrow="Browse"
        title="Shop by category"
        subtitle="Find exactly what you need across our curated departments."
        align="center"
      />

      <div class="categories-grid">
        <a
          v-for="cat in categories"
          :key="cat.id"
          href="#"
          class="category-card"
          :style="{ '--cat-color': cat.color }"
        >
          <span class="category-card__icon">{{ cat.icon }}</span>
          <span class="category-card__label">{{ cat.label }}</span>
        </a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <SectionHeading
        eyebrow="Featured"
        title="Trending products"
        subtitle="Hand-picked bestsellers with full 3D preview support."
        align="center"
      />

      <div class="products-grid">
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>

  <section class="section section--benefits">
    <div class="container">
      <div class="benefits-grid">
        <div v-for="item in benefits" :key="item.title" class="benefit-card">
          <span class="benefit-card__icon">{{ item.icon }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container promo-banner">
      <div class="promo-banner__content">
        <p class="promo-banner__eyebrow">
          Limited offer
        </p>
        <h2 class="promo-banner__title">
          Get 15% off your first 3D order
        </h2>
        <p class="promo-banner__text">
          Use code <strong>AURA3D</strong> at checkout. Free shipping included.
        </p>
        <button type="button" class="btn btn--primary">
          Claim discount
        </button>
      </div>
      <div class="promo-banner__glow" />
    </div>
  </section>
</template>
