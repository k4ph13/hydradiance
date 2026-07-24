<script setup lang="ts">
useHead({
  title: 'Shop — Skin Fluent by Nicole',
})

const shopUrl = 'https://tiny.pompbeauty.com/nicole4'
</script>

<template>
  <section class="shop-page container">
    <p class="section-label">Shop</p>
    <h1>Products Nicole actually recommends</h1>
    <p class="copy">
      Nicole personally curates these products through Pomp Beauty — clinical-grade brands she
      trusts in her own coaching practice, not a general marketplace. Whatever she recommends
      during a consultation, you'll find here.
    </p>

    <a :href="shopUrl" target="_blank" rel="noopener" class="btn btn-primary shop-btn">
      Shop Nicole's Picks
    </a>
    <p class="shop-url">{{ shopUrl }}</p>
  </section>
</template>

<style scoped>
.shop-page {
  padding: 96px 24px;
  max-width: 620px;
  text-align: center;
  margin: 0 auto;
}

h1 {
  font-size: clamp(30px, 4vw, 42px);
  margin: 12px 0 20px;
}

.copy {
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 36px;
}

.shop-btn {
  margin-bottom: 12px;
}

.shop-url {
  font-size: 12px;
  color: var(--color-mute);
  font-family: monospace;
}
</style>
