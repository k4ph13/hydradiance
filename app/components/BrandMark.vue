<script setup lang="ts">
withDefaults(
  defineProps<{
    theme?: 'light' | 'dark'
  }>(),
  { theme: 'dark' },
)
</script>

<template>
  <span class="brand-mark" :class="`theme-${theme}`">
    <span class="monogram" aria-hidden="true">SF</span>
    <span class="wordmark">
      <span class="name">Skin Fluent</span>
      <span class="byline">by Nicole</span>
    </span>
  </span>
</template>

<style scoped>
/*
  Placeholder mark: real logo (soft pink lotus + SF monogram, per creative
  brief) is pending from Nicole. Swap the .monogram span for the delivered
  SVG/PNG once available — layout and sizing are already wired for it.
*/
.brand-mark {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.monogram {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.02em;
  background: var(--color-sage);
  color: var(--color-white);
}

.wordmark {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.name {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.byline {
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-top: 2px;
}

.theme-dark .name {
  color: var(--color-white);
}
.theme-dark .byline {
  color: var(--color-powder-blue);
}

.theme-light .monogram {
  background: var(--color-navy);
}
.theme-light .name {
  color: var(--color-navy);
}
.theme-light .byline {
  color: var(--color-mute);
}
</style>
