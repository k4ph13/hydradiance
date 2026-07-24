<script setup lang="ts">
useHead({
  title: 'Services & Pricing — Skin Fluent by Nicole',
})

const services = [
  {
    name: 'The Consultation',
    price: '$97–$125',
    cadence: 'One 45-minute virtual call',
    best: 'Best for a single expert read on your skin, right now.',
    includes: [
      '45-minute virtual consultation',
      'Personalized routine built for your skin',
      'Full coaching packet to keep',
      'Product recommendations',
    ],
  },
  {
    name: 'The Transformation Journey',
    price: '$297–$397',
    cadence: '12 weeks of guided coaching',
    best: 'Best for lasting change — most skin concerns need consistency, not a single fix.',
    includes: [
      'Foundation call (Week 1)',
      'Check-ins at Weeks 3, 6, and 9',
      'Graduation review (Week 12)',
      '12-week coaching workbook',
      'Full coaching packet + graduation summary',
    ],
    featured: true,
  },
  {
    name: 'Membership',
    price: '$47–$67/mo',
    cadence: 'Ongoing, for Journey graduates',
    best: 'Best for keeping progress on track after the Journey ends.',
    includes: [
      'Monthly check-in',
      'Routine adjustments as your skin changes',
      'Seasonal updates',
    ],
  },
]
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <p class="section-label">Services &amp; Pricing</p>
        <h1>What working with Nicole looks like</h1>
        <p class="lede">
          Every path starts with understanding your skin, not guessing at products. Choose the
          level of support that matches where you are.
        </p>
      </div>
    </section>

    <section class="container services-list">
      <div
        v-for="service in services"
        :key="service.name"
        class="service-row"
        :class="{ featured: service.featured }"
      >
        <div class="service-main">
          <h2>{{ service.name }}</h2>
          <p class="cadence">{{ service.cadence }}</p>
          <p class="best">{{ service.best }}</p>
          <ul>
            <li v-for="item in service.includes" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="service-side">
          <p class="price">{{ service.price }}</p>
          <a href="#booking" class="btn btn-primary">Book Now</a>
        </div>
      </div>
    </section>

    <section id="booking" class="booking-note container">
      <p class="section-label">Booking</p>
      <h2>Ready to book?</h2>
      <p>
        Scheduling is handled through Nicole's booking link. If you're not sure which service
        fits, start with the free skin quiz — your results point you toward the right next step.
      </p>
      <div class="booking-actions">
        <NuxtLink to="/quiz" class="btn btn-outline">Take the Free Skin Quiz</NuxtLink>
        <NuxtLink to="/contact" class="btn btn-outline">Contact Nicole Directly</NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-hero {
  background: var(--color-navy);
  padding: 72px 0 56px;
}

.page-hero h1 {
  color: var(--color-white);
  font-size: clamp(32px, 4vw, 44px);
  margin: 10px 0 16px;
}

.lede {
  color: var(--color-powder-blue);
  font-size: 16px;
  font-weight: 300;
  max-width: 560px;
}

.services-list {
  padding: 72px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.service-row {
  display: flex;
  justify-content: space-between;
  gap: 32px;
  background: var(--color-white);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid var(--color-pale-lavender);
}

.service-row.featured {
  background: var(--color-sage-bg);
  border-color: var(--color-sage);
}

.service-main h2 {
  font-size: 24px;
  margin-bottom: 4px;
}

.cadence {
  font-size: 13px;
  color: var(--color-mid-purple);
  font-weight: 500;
  margin-bottom: 10px;
}

.best {
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 16px;
  max-width: 480px;
}

.service-main ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.service-main li {
  font-size: 13.5px;
  font-weight: 300;
  padding-left: 18px;
  position: relative;
}

.service-main li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-sage);
}

.service-side {
  flex-shrink: 0;
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 14px;
}

.price {
  font-family: var(--font-display);
  font-size: 26px;
  color: var(--color-navy);
}

.booking-note {
  padding: 24px 24px 96px;
  max-width: 640px;
  text-align: center;
  margin: 0 auto;
}

.booking-note h2 {
  font-size: 28px;
  margin: 10px 0 14px;
}

.booking-note p {
  font-size: 15px;
  font-weight: 300;
  margin-bottom: 28px;
}

.booking-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 720px) {
  .service-row {
    flex-direction: column;
  }
  .service-side {
    align-items: flex-start;
    text-align: left;
  }
}
</style>
