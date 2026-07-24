<script setup lang="ts">
definePageMeta({
  layout: 'quiz',
})

useHead({
  title: 'Skin Quiz — Skin Fluent by Nicole',
})
</script>

<template>
  <section class="quiz-placeholder container">
    <p class="section-label">Free Skin Quiz</p>
    <h1>Find out what your skin is trying to tell you.</h1>
    <p class="copy">
      8 quick questions. Instant results. A personalized guide sent straight to your inbox.
    </p>

    <div class="pending-card">
      <p class="pending-title">Quiz coming soon</p>
      <p class="pending-body">
        The interactive quiz (<code>skinfluent_quiz_v4.html</code>) is being finalized on
        Nicole's side. Once it's delivered, it embeds directly on this route — full-page,
        no nav distractions, so nothing pulls visitors away mid-quiz.
      </p>
    </div>

    <NuxtLink to="/" class="text-link">← Back to home</NuxtLink>
  </section>
</template>

<style scoped>
.quiz-placeholder {
  padding: 96px 24px;
  max-width: 640px;
  text-align: center;
  margin: 0 auto;
}

h1 {
  font-size: clamp(30px, 4vw, 42px);
  margin: 12px 0 16px;
}

.copy {
  font-size: 16px;
  font-weight: 300;
  color: var(--color-mute);
  margin-bottom: 40px;
}

.pending-card {
  background: var(--color-pale-purple);
  border-radius: 14px;
  padding: 32px 28px;
  text-align: left;
  margin-bottom: 32px;
}

.pending-title {
  font-weight: 600;
  color: var(--color-navy);
  margin-bottom: 8px;
}

.pending-body {
  font-size: 14px;
  font-weight: 300;
}

.pending-body code {
  background: var(--color-white);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  color: var(--color-deep-purple);
}

.text-link {
  color: var(--color-sage);
  font-weight: 500;
  text-decoration: none;
  font-size: 14px;
}

.text-link:hover {
  text-decoration: underline;
}
</style>
