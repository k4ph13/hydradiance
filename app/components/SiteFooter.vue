<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <BrandMark theme="dark" />
        <p class="tagline">Become fluent in your skin.</p>
      </div>

      <nav aria-label="Footer">
        <NuxtLink to="/services">Services</NuxtLink>
        <NuxtLink to="/about">About Nicole</NuxtLink>
        <NuxtLink to="/shop">Shop</NuxtLink>
        <NuxtLink to="/quiz">Skin Quiz</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
      </nav>

      <div class="meta">
        <p class="copyright">&copy; {{ year }} Skin Fluent by Nicole</p>
      </div>
    </div>

    <div class="container legal-row">
      <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
      <NuxtLink to="/terms">Terms of Service</NuxtLink>
      <NuxtLink to="/disclaimer">Disclaimer</NuxtLink>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--color-navy);
  padding: 56px 0 32px;
  margin-top: 96px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr;
  gap: 32px;
  align-items: start;
}

.tagline {
  font-family: var(--font-display);
  font-style: italic;
  color: var(--color-periwinkle);
  margin-top: 16px;
  font-size: 15px;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 13px;
}

nav a,
.meta a {
  color: var(--color-periwinkle);
  text-decoration: none;
}

nav a:hover,
.meta a:hover {
  color: var(--color-white);
}

.meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 13px;
  align-items: flex-start;
}

.copyright {
  color: var(--color-mute);
  font-size: 12px;
}

.legal-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.legal-row a {
  color: var(--color-mute);
  text-decoration: none;
  font-size: 12px;
}

.legal-row a:hover {
  color: var(--color-white);
}

@media (max-width: 720px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>
