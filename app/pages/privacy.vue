<script setup lang="ts">
useHead({
  title: 'Privacy Policy — Skin Fluent by Nicole',
})
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <p class="section-label">Legal</p>
        <h1>Privacy Policy</h1>
      </div>
    </section>

    <section class="container legal-body">
      <div class="draft-notice">
        <p class="draft-title">Draft — pending review</p>
        <p class="draft-text">
          This page reflects what the site actually collects today. It has not been reviewed by
          a lawyer and should not be treated as final before the quiz's email capture goes live.
        </p>
      </div>

      <p class="updated">Last updated: draft, not yet published</p>

      <h2>Overview</h2>
      <p>
        Skin Fluent by Nicole ("Skin Fluent," "we," "us") respects your privacy. This policy
        explains what information we collect through skinfluent.com, how it's used, and who it's
        shared with.
      </p>

      <h2>Information We Collect</h2>
      <p>
        <strong>Skin quiz &amp; email.</strong> When you take the free skin quiz, we collect your
        answers and the email address you provide to receive your personalized guide.
      </p>
      <p>
        <strong>Contact page.</strong> The Contact page opens your own email client via a
        <code>mailto:</code> link — any message you send goes directly to Nicole's inbox and is
        never stored or processed by this website.
      </p>
      <p>
        <strong>Shop &amp; booking.</strong> Product purchases and consultation bookings happen
        entirely on third-party platforms (see below) — this site does not collect payment,
        scheduling, or order information itself.
      </p>
      <p>
        <strong>Cookies &amp; analytics.</strong> This site does not currently use cookies or
        analytics tracking. If that changes, this policy will be updated first.
      </p>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To send your personalized skin profile guide after the quiz</li>
        <li>To send occasional coaching-related emails, which you can unsubscribe from anytime</li>
        <li>To respond to messages sent through the Contact page</li>
      </ul>

      <h2>Third-Party Services</h2>
      <p>
        Quiz responses and email addresses are shared with our email delivery platform (provider
        to be finalized) solely to send your guide and any follow-up communications. Product
        purchases and consultation bookings are handled by
        <strong>Pomp Beauty</strong> and our scheduling provider respectively — each has its own
        privacy policy governing information you provide directly to them, which we encourage you
        to review.
      </p>

      <h2>Your Choices</h2>
      <p>
        You can unsubscribe from emails at any time using the link in any message we send, or
        request that we delete your information by contacting us directly.
      </p>

      <h2>Children's Privacy</h2>
      <p>This site is not directed at, and does not knowingly collect information from, children under 13.</p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this policy as the site evolves. Material changes will be reflected here
        with an updated date.
      </p>

      <h2>Contact</h2>
      <p>Questions about this policy? Reach out via the <NuxtLink to="/contact">Contact page</NuxtLink>.</p>
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

.legal-body ul {
  margin: 0 0 14px 20px;
  font-size: 15px;
  font-weight: 300;
}

.legal-body li {
  margin-bottom: 6px;
}

.legal-body code {
  background: var(--color-pale-purple);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 13px;
  color: var(--color-deep-purple);
}

.legal-body a {
  color: var(--color-sage);
  font-weight: 500;
}
</style>
