<script setup lang="ts">
useHead({
  title: 'About Nicole — Skin Fluent',
})
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <p class="section-label">About Nicole</p>
        <h1>Your skin has a story. Nicole helps you read it.</h1>
      </div>
    </section>

    <section class="container about-body">
      <div class="photo-placeholder" role="img" aria-label="Photo of Nicole coming soon">
        <span>Photo pending</span>
      </div>

      <div class="copy">
        <p>
          You've probably tried a dozen products that were supposed to work. Maybe some of them
          did, for a while. What's usually missing isn't effort — it's a clear read on what your
          skin actually needs, and why.
        </p>
        <p>
          Nicole is a licensed advanced esthetician with nearly 20 years of experience, including
          15+ years at Caesars Palace Qua Baths &amp; Spa in Las Vegas. In that time, she's worked
          with thousands of different skin types, conditions, and concerns — which means she
          rarely sees something she hasn't already learned to read.
        </p>
        <p>
          Her approach isn't about selling you more products. It's about teaching you the
          language your skin is already speaking, so every choice you make — what you use, when,
          and why — actually makes sense. That's the idea behind Skin Fluent: not just clearer
          skin, but the fluency to keep it that way.
        </p>
        <p>
          Today, Nicole offers virtual consultations and coaching to clients anywhere, along with
          in-person facials in Las Vegas.
        </p>
      </div>
    </section>

    <section class="cta-band">
      <div class="container cta-inner">
        <h2>Start with the free skin quiz</h2>
        <p>Eight questions. Instant results. A personalized guide built around your skin.</p>
        <NuxtLink to="/quiz" class="btn btn-primary">Take the Free Skin Quiz</NuxtLink>
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
  font-size: clamp(30px, 4vw, 42px);
  max-width: 680px;
  margin-top: 10px;
}

.about-body {
  padding: 72px 24px;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 48px;
  align-items: start;
}

.photo-placeholder {
  aspect-ratio: 4 / 5;
  border-radius: 16px;
  background: var(--color-pale-purple);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-mute);
  font-size: 13px;
}

.copy p {
  font-size: 15.5px;
  font-weight: 300;
  margin-bottom: 20px;
  max-width: 620px;
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

@media (max-width: 780px) {
  .about-body {
    grid-template-columns: 1fr;
  }
  .photo-placeholder {
    max-width: 280px;
  }
}
</style>
