<script setup lang="ts">
import type { Product } from '~/data/products'

defineProps<{
  product: Product
}>()

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)
</script>

<template>
  <article class="product-card">
    <div class="product-card__visual" :style="{ '--product-color': product.color }">
      <span v-if="product.badge" class="product-card__badge">{{ product.badge }}</span>
      <div class="product-card__shape" />
      <button type="button" class="product-card__view-3d" aria-label="View in 3D">
        View 3D
      </button>
    </div>

    <div class="product-card__body">
      <span class="product-card__category">{{ product.category }}</span>
      <h3 class="product-card__name">
        {{ product.name }}
      </h3>
      <div class="product-card__meta">
        <span class="product-card__price">{{ formatPrice(product.price) }}</span>
        <span class="product-card__rating">★ {{ product.rating }}</span>
      </div>
      <button type="button" class="btn btn--ghost btn--block product-card__btn">
        Add to cart
      </button>
    </div>
  </article>
</template>
