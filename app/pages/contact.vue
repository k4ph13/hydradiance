<script setup lang="ts">
useHead({
  title: 'Contact — Skin Fluent by Nicole',
})

const email = 'hello@skinfluent.com'
</script>

<template>
  <section class="contact-page container">
    <p class="section-label">Contact</p>
    <h1>Get in touch</h1>
    <p class="copy">
      Most questions get answered fastest by taking the free skin quiz — it points you toward
      the right service before you even reach out. For everything else, Nicole reads every
      message personally.
    </p>

    <div class="contact-grid">
      <a :href="`mailto:${email}`" class="contact-card">
        <p class="label">Email</p>
        <p class="value">{{ email }}</p>
      </a>
      <div class="contact-card">
        <p class="label">Response Time</p>
        <p class="value">Within 1–2 business days</p>
      </div>
    </div>

    <div class="alt-actions">
      <NuxtLink to="/quiz" class="btn btn-primary">Take the Free Skin Quiz</NuxtLink>
      <NuxtLink to="/services" class="btn btn-outline">Book a Service</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.contact-page {
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
  margin-bottom: 40px;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 36px;
}

.contact-card {
  background: var(--color-pale-purple);
  border-radius: 14px;
  padding: 24px;
  text-decoration: none;
  color: inherit;
}

.label {
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-mute);
  margin-bottom: 8px;
}

.value {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-navy);
}

.alt-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 560px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
