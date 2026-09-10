<script setup lang="ts">
useHead({
  title: 'Disclaimer — Skin Fluent by Nicole',
})
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <p class="section-label">Legal</p>
        <h1>Disclaimer</h1>
      </div>
    </section>

    <section class="container legal-body">
      <div class="draft-notice">
        <p class="draft-title">Draft — pending review</p>
        <p class="draft-text">
          A starting draft covering the two points that matter most: this is coaching, not
          medical care, and Nicole earns a commission on recommended products.
        </p>
      </div>

      <p class="updated">Last updated: draft, not yet published</p>

      <h2>Not Medical Advice</h2>
      <p>
        Nicole is a licensed esthetician, not a physician or dermatologist. The guidance,
        routines, and product recommendations provided through Skin Fluent are educational skin
        coaching — they are not medical advice, diagnosis, or treatment, and are not a substitute
        for care from a qualified medical professional. If you have a persistent, painful, or
        concerning skin condition, please see a doctor or dermatologist.
      </p>

      <h2>Individual Results Vary</h2>
      <p>
        Skin responds differently from person to person. Guides, coaching packets, and quiz
        results are personalized based on the information you provide, but they are not a
        guarantee of any specific outcome.
      </p>

      <h2>Product Use &amp; Patch Testing</h2>
      <p>
        You are responsible for reviewing ingredient lists and patch-testing any new product
        before regular use, especially if you have known allergies or sensitivities. Discontinue
        use and consult a doctor if you experience irritation or an adverse reaction.
      </p>

      <h2>Affiliate Disclosure</h2>
      <p>
        Product links on this site point to Nicole's storefront on <strong>Pomp Beauty</strong>.
        Nicole earns a commission on qualifying purchases made through these links. This doesn't
        change the price you pay — recommendations reflect products Nicole personally uses and
        trusts in her own coaching practice.
      </p>

      <h2>Contact</h2>
      <p>Questions about this disclaimer? Reach out via the <NuxtLink to="/contact">Contact page</NuxtLink>.</p>
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
  margin-top: 10px;
}

.legal-body {
  padding: 64px 24px 96px;
  max-width: 720px;
}

.draft-notice {
  background: var(--color-pale-purple);
  border-radius: 14px;
  padding: 24px 28px;
  margin-bottom: 36px;
}

.draft-title {
  font-weight: 600;
  color: var(--color-navy);
  margin-bottom: 6px;
}

.draft-text {
  font-size: 14px;
  font-weight: 300;
}

.updated {
  font-size: 12px;
  color: var(--color-mute);
  margin-bottom: 40px;
}

.legal-body h2 {
  font-size: 22px;
  margin: 36px 0 12px;
}

.legal-body h2:first-of-type {
  margin-top: 0;
}

.legal-body p {
  font-size: 15px;
  font-weight: 300;
  margin-bottom: 14px;
}

.legal-body a {
  color: var(--color-sage);
  font-weight: 500;
}
</style>
