<script setup lang="ts">
useHead({
  title: 'Terms of Service — Skin Fluent by Nicole',
})
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <p class="section-label">Legal</p>
        <h1>Terms of Service</h1>
      </div>
    </section>

    <section class="container legal-body">
      <div class="draft-notice">
        <p class="draft-title">Draft — pending review</p>
        <p class="draft-text">
          This is a starting framework, not a finalized legal document. Booking, cancellation,
          and refund terms especially need Nicole's actual policy before this page is real.
        </p>
      </div>

      <p class="updated">Last updated: draft, not yet published</p>

      <h2>Acceptance of Terms</h2>
      <p>
        By using skinfluent.com or booking a service with Skin Fluent by Nicole, you agree to
        these terms.
      </p>

      <h2>Description of Services</h2>
      <p>
        Skin Fluent provides virtual skin coaching, consultations, and educational guidance from
        a licensed esthetician. These services are coaching and education — they are
        <strong>not medical care</strong>. See the <NuxtLink to="/disclaimer">Disclaimer</NuxtLink>
        for more detail.
      </p>

      <h2>No Guaranteed Results</h2>
      <p>
        Skin concerns and product responses vary by individual. Nothing on this site or in a
        consultation is a promise or guarantee of specific results.
      </p>

      <h2>Booking, Cancellation &amp; Refunds</h2>
      <p>
        <em>Placeholder — needs Nicole's actual policy.</em> Consultations and Transformation
        Journey sessions are booked through our scheduling provider. Rescheduling and cancellation
        windows, no-show handling, and refund eligibility will be defined here once finalized.
      </p>

      <h2>Products &amp; Third-Party Services</h2>
      <p>
        Product recommendations link to Nicole's storefront on <strong>Pomp Beauty</strong>, a
        third-party platform. Purchases, payment, and shipping are handled entirely by Pomp
        Beauty under their own terms. Nicole earns a commission on qualifying purchases made
        through these links — see the <NuxtLink to="/disclaimer">Disclaimer</NuxtLink> for the
        full affiliate disclosure.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on this site — including guides, coaching materials, and copy — belongs to
        Skin Fluent by Nicole and may not be reproduced or redistributed without permission.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        Skin Fluent is not liable for any adverse reaction to a recommended product, or for
        outcomes resulting from following coaching guidance. You are responsible for patch-testing
        new products and consulting a physician for any medical concern.
      </p>

      <h2>Governing Law</h2>
      <p>
        <em>Placeholder.</em> These terms are intended to be governed by the laws of the State of
        Nevada, pending confirmation.
      </p>

      <h2>Changes to These Terms</h2>
      <p>We may update these terms as the business evolves. Material changes will be reflected here.</p>

      <h2>Contact</h2>
      <p>Questions about these terms? Reach out via the <NuxtLink to="/contact">Contact page</NuxtLink>.</p>
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
