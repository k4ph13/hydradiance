<script setup lang="ts">
useHead({
  title: 'Shop — Skin Fluent by Nicole',
})

/* Carries a quiz result onto this page — via ?profile=<slug> when someone
   clicks through from the result screen, or localStorage when they arrive
   later via the nav instead. See app/utils/skinProfiles.ts. Until Nicole
   maps a recommendedRoutineUrl per profile, this just shows a banner and
   the existing general routines below — nothing else changes. */
const route = useRoute()
const profileSlug = ref<string | null>(null)
onMounted(() => {
  const fromQuery = route.query.profile
  profileSlug.value = typeof fromQuery === 'string' ? fromQuery : recallQuizProfile()
})
const activeProfile = computed(() => (profileSlug.value ? SKIN_PROFILES[profileSlug.value] : null))

const fullStoreUrl = 'https://tiny.pompbeauty.com/nicole7849_store'

const routines = [
  {
    name: 'AM Routine',
    description: 'Her morning regimen — focused on hydration, repair, and protection.',
    url: 'https://app.pompbeauty.com/routines/public/175b6a94-2638-436e-8a94-971693d1561e',
  },
  {
    name: 'PM Routine',
    description:
      'Her nightly regimen — focused on rejuvenating and repairing damage while protecting the skin barrier.',
    url: 'https://app.pompbeauty.com/routines/public/8860214d-ae08-4514-b3cc-6637c6b5b29d',
  },
  {
    name: 'Fun Extras',
    description: 'Bonus products Nicole uses to stimulate and rejuvenate on a deeper level.',
    url: 'https://app.pompbeauty.com/routines/public/5cea7806-926c-4768-95ea-9fdb77b898ec',
  },
]
</script>

<template>
  <section class="shop-page container">
    <p class="section-label">Shop</p>
    <h1>Products Nicole actually recommends</h1>
    <p class="copy">
      Nicole personally curates these products through Pomp Beauty — clinical-grade brands she
      trusts in her own coaching practice, not a general marketplace. These are her tried-and-true
      regimens, built for her own dehydrated skin with scattered hyperpigmentation. Start with one
      below, or browse everything she carries.
    </p>

    <p v-if="activeProfile" class="profile-banner">
      Recommended for your <strong>{{ activeProfile.label }}</strong> result —
      <NuxtLink to="/quiz">not you? Retake the quiz</NuxtLink>
    </p>

    <a
      v-if="activeProfile?.recommendedRoutineUrl"
      :href="activeProfile.recommendedRoutineUrl"
      target="_blank"
      rel="noopener"
      class="routine-card recommended-card"
    >
      <span class="badge-match">Matches Your Result</span>
      <p class="routine-name">Recommended for {{ activeProfile.label }}</p>
      <span class="routine-link">Shop this routine →</span>
    </a>

    <div class="routine-grid">
      <a
        v-for="routine in routines"
        :key="routine.name"
        :href="routine.url"
        target="_blank"
        rel="noopener"
        class="routine-card"
      >
        <p class="routine-name">{{ routine.name }}</p>
        <p class="routine-desc">{{ routine.description }}</p>
        <span class="routine-link">Shop this routine →</span>
      </a>
    </div>

    <div class="full-store">
      <p class="full-store-name">Looking for something specific?</p>
      <p class="full-store-desc">
        Browse Nicole's entire product lineup on Pomp — every brand and item she carries, not
        just what's in a routine.
      </p>
      <a :href="fullStoreUrl" target="_blank" rel="noopener" class="btn btn-outline">
        Browse the Full Store
      </a>
    </div>
  </section>
</template>

<style scoped>
.shop-page {
  padding: 96px 24px;
  max-width: 820px;
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
  margin: 0 auto 48px;
  max-width: 560px;
}

.profile-banner {
  display: inline-block;
  background: var(--color-sage-bg);
  color: var(--color-navy);
  font-size: 14px;
  font-weight: 300;
  padding: 10px 20px;
  border-radius: 999px;
  margin: -24px auto 32px;
}
.profile-banner a {
  color: var(--color-sage);
  text-decoration: underline;
}

.recommended-card {
  display: block;
  text-align: left;
  background: var(--color-sage-bg);
  border: 1.5px solid var(--color-sage);
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 20px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.15s ease;
}
.recommended-card:hover {
  transform: translateY(-2px);
}
.recommended-card .badge-match {
  display: inline-block;
  background: var(--color-mid-purple);
  color: var(--color-white);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 20px;
  margin-bottom: 10px;
}
.recommended-card .routine-name {
  margin-bottom: 4px;
}

.routine-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 44px;
  text-align: left;
}

.routine-card {
  background: var(--color-pale-purple);
  border-radius: 14px;
  padding: 28px 24px;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform 0.15s ease;
}

.routine-card:hover {
  transform: translateY(-2px);
}

.routine-name {
  font-family: var(--font-display);
  font-size: 20px;
  color: var(--color-navy);
}

.routine-desc {
  font-size: 13.5px;
  font-weight: 300;
  color: var(--color-ink);
  flex-grow: 1;
}

.routine-link {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-sage);
}

.full-store {
  background: var(--color-sage-bg);
  border-radius: 16px;
  padding: 40px 32px;
}

.full-store-name {
  font-family: var(--font-display);
  font-size: 24px;
  color: var(--color-navy);
  margin-bottom: 10px;
}

.full-store-desc {
  font-size: 14.5px;
  font-weight: 300;
  max-width: 440px;
  margin: 0 auto 24px;
}

@media (max-width: 720px) {
  .routine-grid {
    grid-template-columns: 1fr;
  }
}
</style>
