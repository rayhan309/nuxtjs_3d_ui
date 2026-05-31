<script setup lang="ts">
import { site, stats, team, values } from '~/data/site'

definePageMeta({
  layout: 'default',
})

useHead({
  title: `About — ${site.name}`,
  meta: [
    {
      name: 'description',
      content: `Learn about ${site.name} — the team building the future of 3D e-commerce.`,
    },
  ],
})
</script>

<template>
  <section class="about-hero">
    <div class="container about-hero__grid">
      <div class="about-hero__text">
        <p class="section-heading__eyebrow">
          About us
        </p>
        <h1 class="about-hero__title">
          We are redefining
          <span class="text-gradient">online shopping</span>
        </h1>
        <p class="about-hero__lead">
          {{ site.name }} was founded with a simple idea: shopping online should feel
          as real as holding the product in your hands. We combine cutting-edge 3D
          technology with a curated catalog to deliver an experience you will remember.
        </p>
        <NuxtLink to="/" class="btn btn--primary">
          Start shopping
        </NuxtLink>
      </div>

      <ClientOnly>
        <AboutCanvas />
        <template #fallback>
          <div class="scene-loading scene-loading--about">
            Loading...
          </div>
        </template>
      </ClientOnly>
    </div>
  </section>

  <section class="section">
    <div class="container stats-grid">
      <div v-for="item in stats" :key="item.label" class="stat-card">
        <span class="stat-card__value">{{ item.value }}</span>
        <span class="stat-card__label">{{ item.label }}</span>
      </div>
    </div>
  </section>

  <section class="section section--mission">
    <div class="container mission-grid">
      <div class="mission-block">
        <h2 class="mission-block__title">
          Our mission
        </h2>
        <p>
          To make every online purchase confident and delightful by bringing products
          to life through immersive 3D previews, transparent information, and
          world-class customer service.
        </p>
      </div>
      <div class="mission-block">
        <h2 class="mission-block__title">
          Our vision
        </h2>
        <p>
          A world where e-commerce is no longer flat — where every shopper can
          explore, compare, and fall in love with products in three dimensions
          before they click buy.
        </p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <SectionHeading
        eyebrow="What we stand for"
        title="Our values"
        align="center"
      />

      <div class="values-grid">
        <article v-for="value in values" :key="value.title" class="value-card">
          <h3>{{ value.title }}</h3>
          <p>{{ value.description }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section section--team">
    <div class="container">
      <SectionHeading
        eyebrow="The people"
        title="Meet the team"
        subtitle="Designers, engineers, and dreamers building the store of tomorrow."
        align="center"
      />

      <div class="team-grid">
        <article v-for="member in team" :key="member.name" class="team-card">
          <div class="team-card__avatar">
            {{ member.initials }}
          </div>
          <h3>{{ member.name }}</h3>
          <p>{{ member.role }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container about-cta">
      <h2>Ready to experience 3D shopping?</h2>
      <p>Join thousands of customers who shop smarter with {{ site.name }}.</p>
      <NuxtLink to="/" class="btn btn--primary btn--lg">
        Browse products
      </NuxtLink>
    </div>
  </section>
</template>
