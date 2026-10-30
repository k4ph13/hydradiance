<script setup lang="ts">
useHead({
  title: 'Services & Pricing — Skin Fluent by Nicole',
})

/* Carries a quiz result onto this page — via ?profile=<slug> when someone
   clicks through from the result screen, or localStorage when they arrive
   later via the nav instead. See app/utils/skinProfiles.ts. */
const route = useRoute()
const profileSlug = ref<string | null>(null)
onMounted(() => {
  const fromQuery = route.query.profile
  profileSlug.value = typeof fromQuery === 'string' ? fromQuery : recallQuizProfile()
})
const activeProfile = computed(() => (profileSlug.value ? SKIN_PROFILES[profileSlug.value] : null))

/* ============================================================
   BOOKING / PAYMENT LINKS
   ------------------------------------------------------------
   Fill in `bookingUrl` once Nicole picks a scheduling/payment
   platform (Acuity, Square Appointments, Squarespace Scheduling,
   etc.). Paste the direct booking link for that service below.
   Until a service's `bookingUrl` is filled in, its "Book Now"
   button falls back to the #booking note at the bottom of this
   page — safe to leave live while the platform is being set up.

   Note: Consultation and Transformation Journey are one-time
   paid bookings — most scheduling platforms handle those fine.
   Membership is $47/MONTH, recurring. Not every scheduling
   platform bills recurring subscriptions natively — if Nicole's
   platform doesn't, membership may need its own link instead
   (e.g. a Stripe Payment Link, or that platform's subscription/
   membership product), separate from the one-time booking link.
   ============================================================ */
const services = [
  {
    slug: 'consultation',
    name: 'The Consultation',
    price: '$97',
    cadence: 'One 45-minute virtual call',
    best: 'Best for a single expert read on your skin, right now.',
    includes: [
      '45-minute virtual consultation',
      'Personalized routine built for your skin',
      'Full coaching packet to keep',
      'Product recommendations',
    ],
    bookingUrl: '',
  },
  {
    slug: 'transformation-journey',
    name: 'The Transformation Journey',
    price: '$297',
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
    bookingUrl: '',
  },
  {
    slug: 'membership',
    name: 'Membership',
    price: '$47/mo',
    cadence: 'Ongoing, for Journey graduates',
    best: 'Best for keeping progress on track after the Journey ends.',
    includes: [
      'Monthly check-in',
      'Routine adjustments as your skin changes',
      'Seasonal updates',
    ],
    bookingUrl: '', // recurring — see note above, this may differ from the links above
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

    <section v-if="activeProfile" class="container profile-banner">
      <p>
        Recommended for your <strong>{{ activeProfile.label }}</strong> result —
        <NuxtLink to="/quiz">not you? Retake the quiz</NuxtLink>
      </p>
    </section>

    <section class="container services-list">
      <div
        v-for="service in services"
        :id="service.slug"
        :key="service.name"
        class="service-row"
        :class="{
          featured: service.featured,
          recommended: activeProfile?.suggestedService === service.slug,
        }"
      >
        <div class="service-main">
          <span v-if="service.featured" class="badge">Best for Lasting Results</span>
          <span v-if="activeProfile?.suggestedService === service.slug" class="badge badge-match">
            Matches Your Result
          </span>
          <h2>{{ service.name }}</h2>
          <p class="cadence">{{ service.cadence }}</p>
          <p class="best">{{ service.best }}</p>
          <ul>
            <li v-for="item in service.includes" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="service-side">
          <div class="price-block">
            <p class="price-label">Starting at</p>
            <p class="price">{{ service.price }}</p>
          </div>
          <a
            :href="withQuizProfileParam(service.bookingUrl, profileSlug) || '#booking'"
            :target="service.bookingUrl ? '_blank' : undefined"
            :rel="service.bookingUrl ? 'noopener' : undefined"
            class="btn btn-primary"
          >
            {{ service.slug === 'membership' ? 'Join Membership' : 'Book Now' }}
          </a>
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
  color: var(--color-periwinkle);
  font-size: 16px;
  font-weight: 300;
  max-width: 560px;
}

.profile-banner {
  padding: 28px 24px 0;
  text-align: center;
}
.profile-banner p {
  display: inline-block;
  background: var(--color-sage-bg);
  color: var(--color-navy);
  font-size: 14px;
  font-weight: 300;
  padding: 10px 20px;
  border-radius: 999px;
}
.profile-banner a {
  color: var(--color-sage);
  text-decoration: underline;
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
  scroll-margin-top: 24px;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.service-row:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 36px rgba(27, 42, 74, 0.1);
  border-color: var(--color-periwinkle);
}

.service-row.featured {
  background: var(--color-sage-bg);
  border-color: var(--color-sage);
}

.service-row.featured:hover {
  border-color: var(--color-sage);
  box-shadow: 0 16px 36px rgba(90, 140, 82, 0.16);
}

.service-row.recommended {
  border-color: var(--color-mid-purple);
  box-shadow: 0 0 0 2px var(--color-pale-lavender);
}

.badge {
  display: inline-block;
  background: var(--color-sage);
  color: var(--color-white);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 20px;
  margin-bottom: 12px;
}

.badge-match {
  background: var(--color-mid-purple);
  margin-left: 8px;
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

.price-block {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.price-label {
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--color-mute);
  margin-bottom: 2px;
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
  .price-block {
    align-items: flex-start;
  }
}
</style>
