<script setup lang="ts">
useHead({
  title: 'Skin Fluent by Nicole — Become Fluent in Your Skin',
})

const services = [
  {
    slug: 'consultation',
    name: 'The Consultation',
    price: 'Starting at $97',
    desc: 'A 45-minute virtual deep-dive into your skin, with a personalized routine and coaching packet to take with you.',
  },
  {
    slug: 'transformation-journey',
    name: 'The Transformation Journey',
    price: 'Starting at $297',
    desc: '12 weeks of guided coaching — foundation call, three check-ins, and a graduation review that leaves you fluent in your own skin.',
    featured: true,
  },
  {
    slug: 'membership',
    name: 'Membership',
    price: 'Starting at $47/mo',
    desc: 'For Journey graduates. Monthly check-ins and seasonal routine adjustments, so progress never slides backward.',
  },
]
</script>

<template>
  <div>
    <section class="hero">
      <div class="container hero-inner">
        <p class="section-label">Virtual Skin Coaching</p>
        <h1>Become fluent in your skin.</h1>
        <p class="hero-copy">
          You've tried everything. Your skin still isn't cooperating. Nicole reads skin the way
          a translator reads language — and she'll teach you to do the same, so every product
          and habit you choose actually makes sense for your skin.
        </p>
        <div class="hero-actions">
          <NuxtLink to="/quiz" class="btn btn-primary">Take the Free Skin Quiz</NuxtLink>
          <NuxtLink to="/services" class="btn btn-outline-light">View Services</NuxtLink>
        </div>
      </div>
    </section>

    <section class="container intro">
      <p class="section-label">Who's Guiding You</p>
      <h2>Nearly 20 years reading skin, so you don't have to guess.</h2>
      <p class="intro-copy">
        Nicole is a licensed advanced esthetician, including 15+ years at Caesars Palace Qua
        Baths &amp; Spa in Las Vegas. She built Skin Fluent to bring that same level of care to
        anyone, anywhere — no guesswork, no overwhelming aisle of products, just a clear plan
        for the skin you're in.
      </p>
      <NuxtLink to="/about" class="text-link">More about Nicole →</NuxtLink>
    </section>

    <section class="services-section">
      <div class="container">
        <p class="section-label">How We Work Together</p>
        <h2>Three ways to start</h2>
        <div class="services-grid">
          <NuxtLink
            v-for="service in services"
            :key="service.name"
            :to="`/services#${service.slug}`"
            class="service-card"
            :class="{ featured: service.featured }"
          >
            <span v-if="service.featured" class="badge">Best for Lasting Results</span>
            <h3>{{ service.name }}</h3>
            <p class="price">{{ service.price }}</p>
            <p>{{ service.desc }}</p>
            <span class="card-cta">Learn more <span class="arrow">→</span></span>
          </NuxtLink>
        </div>
        <NuxtLink to="/services" class="text-link">Compare all services →</NuxtLink>
      </div>
    </section>

    <section class="container trust">
      <div class="trust-grid">
        <div>
          <p class="trust-number">20</p>
          <p class="trust-label">Years in the treatment room</p>
        </div>
        <div>
          <p class="trust-number">15+</p>
          <p class="trust-label">Years at Caesars Palace Qua Baths &amp; Spa</p>
        </div>
        <div>
          <p class="trust-number">7</p>
          <p class="trust-label">Skin profiles, each with its own coaching path</p>
        </div>
      </div>
    </section>

    <section class="cta-band">
      <div class="container cta-inner">
        <h2>Not sure where to start?</h2>
        <p>Take the free 8-question skin quiz. You'll get your results instantly, plus a personalized guide sent straight to your inbox.</p>
        <NuxtLink to="/quiz" class="btn btn-primary">Take the Free Skin Quiz</NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  background: var(--color-navy);
  padding: 96px 0 80px;
}

.hero-inner {
  max-width: 720px;
}

.hero h1 {
  font-size: clamp(36px, 5vw, 56px);
  color: var(--color-white);
  margin-bottom: 20px;
}

.hero-copy {
  color: var(--color-periwinkle);
  font-size: 17px;
  font-weight: 300;
  margin-bottom: 36px;
  max-width: 560px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.intro {
  padding: 88px 24px;
  max-width: 760px;
}

.intro h2 {
  font-size: 30px;
  margin: 12px 0 20px;
}

.intro-copy {
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 20px;
}

.text-link {
  display: inline-block;
  color: var(--color-sage);
  font-weight: 500;
  text-decoration: none;
  font-size: 14px;
}

.text-link:hover {
  text-decoration: underline;
}

.services-section {
  background: var(--color-pale-purple);
  padding: 80px 0;
}

.services-section h2 {
  font-size: 30px;
  margin: 12px 0 32px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 28px;
}

.service-card {
  position: relative;
  display: block;
  background: var(--color-white);
  border-radius: 14px;
  padding: 28px 26px;
  border-top: 3px solid var(--color-sage);
  text-decoration: none;
  color: inherit;
  box-shadow: 0 1px 3px rgba(27, 42, 74, 0.06);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.service-card:hover,
.service-card:focus-visible {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(27, 42, 74, 0.14);
}

.service-card:hover .arrow {
  transform: translateX(3px);
}

.service-card.featured {
  background: var(--color-sage-bg);
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(27, 42, 74, 0.12);
}

.service-card.featured:hover,
.service-card.featured:focus-visible {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(27, 42, 74, 0.18);
}

.badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  background: var(--color-sage);
  color: var(--color-white);
  font-size: 10.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 20px;
  white-space: nowrap;
  box-shadow: 0 4px 10px rgba(27, 42, 74, 0.18);
}

.service-card h3 {
  font-size: 20px;
  margin-bottom: 6px;
}

.price {
  color: var(--color-mid-purple);
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 12px;
}

.service-card p:not(.price) {
  font-size: 14px;
  font-weight: 300;
  color: var(--color-ink);
}

.card-cta {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 16px;
  color: var(--color-sage);
  font-size: 13px;
  font-weight: 500;
}

.card-cta .arrow {
  display: inline-block;
  transition: transform 0.18s ease;
}

.trust {
  padding: 80px 24px;
}

.trust-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  text-align: center;
}

.trust-number {
  font-family: var(--font-display);
  font-size: 48px;
  color: var(--color-navy);
}

.trust-label {
  font-size: 13px;
  color: var(--color-mute);
  margin-top: 6px;
}

.cta-band {
  background: var(--color-sage-bg);
  padding: 80px 0;
  text-align: center;
}

.cta-inner {
  max-width: 560px;
}

.cta-band h2 {
  font-size: 28px;
  margin-bottom: 12px;
}

.cta-band p {
  font-size: 15px;
  font-weight: 300;
  margin-bottom: 28px;
}

@media (max-width: 860px) {
  .services-grid,
  .trust-grid {
    grid-template-columns: 1fr;
  }
}
</style>
