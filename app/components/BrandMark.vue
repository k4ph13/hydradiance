<script setup lang="ts">
withDefaults(
  defineProps<{
    theme?: 'light' | 'dark'
  }>(),
  { theme: 'dark' },
)

// Gradient ids must be unique per instance — the mark renders in both
// SiteHeader and SiteFooter on every page, and SVG gradient refs collide
// across duplicate ids in the same document.
const uid = useId()
</script>

<template>
  <span class="brand-mark" :class="`theme-${theme}`">
    <svg class="lotus-mark" width="40" height="43" viewBox="50 30 220 200" aria-hidden="true">
      <defs>
        <radialGradient :id="`${uid}-core`" cx="0.5" cy="0.62" r="0.65">
          <stop offset="0" stop-color="#FFFFFF" /><stop offset="0.45" stop-color="#FCEFF2" />
          <stop offset="0.8" stop-color="#C8D8EF" /><stop offset="1" stop-color="#8FA7D4" />
        </radialGradient>
        <linearGradient :id="`${uid}-is`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#E4DFF5" /><stop offset="1" stop-color="#8FA7D4" />
        </linearGradient>
        <linearGradient :id="`${uid}-os`" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#DDE6F4" /><stop offset="1" stop-color="#EDE8F8" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="44" rx="1.4" ry="3" fill="#C8D8EF" opacity="0.8" />
      <circle cx="160" cy="60" r="1.2" fill="#C8D8EF" opacity="0.6" />
      <circle cx="160" cy="72" r="1" fill="#C8D8EF" opacity="0.5" />
      <path d="M160 182 C118 180 70 176 58 158 C52 150 60 144 72 146 C108 152 142 168 160 182Z" :fill="`url(#${uid}-os)`" stroke="#C8D8EF" stroke-width="0.6" opacity="0.78" />
      <path d="M160 182 C202 180 250 176 262 158 C268 150 260 144 248 146 C212 152 178 168 160 182Z" :fill="`url(#${uid}-os)`" stroke="#C8D8EF" stroke-width="0.6" opacity="0.78" />
      <path d="M160 184 C128 180 92 162 84 134 C81 122 92 118 102 126 C124 142 150 168 160 184Z" :fill="`url(#${uid}-is)`" stroke="#C8D8EF" stroke-width="0.6" opacity="0.88" />
      <path d="M160 184 C192 180 228 162 236 134 C239 122 228 118 218 126 C196 142 170 168 160 184Z" :fill="`url(#${uid}-is)`" stroke="#C8D8EF" stroke-width="0.6" opacity="0.88" />
      <path d="M160 186 C142 178 124 150 126 118 C127 104 138 102 146 114 C154 128 158 168 160 186Z" :fill="`url(#${uid}-is)`" stroke="#C8D8EF" stroke-width="0.6" opacity="0.92" />
      <path d="M160 186 C178 178 196 150 194 118 C193 104 182 102 174 114 C166 128 162 168 160 186Z" :fill="`url(#${uid}-is)`" stroke="#C8D8EF" stroke-width="0.6" opacity="0.92" />
      <path d="M160 188 C150 168 142 132 150 104 C155 88 160 82 160 82 C160 82 165 88 170 104 C178 132 170 168 160 188Z" :fill="`url(#${uid}-core)`" stroke="#C8D8EF" stroke-width="0.8" />
      <ellipse cx="160" cy="208" rx="1.4" ry="3" fill="#C8D8EF" opacity="0.55" />
    </svg>
    <span class="wordmark">
      <span class="name">Skin Fluent</span>
      <span class="byline">by Nicole</span>
    </span>
  </span>
</template>

<style scoped>
.brand-mark {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.lotus-mark {
  flex-shrink: 0;
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
  color: var(--color-periwinkle);
}

.theme-light .name {
  color: var(--color-navy);
}
.theme-light .byline {
  color: var(--color-mute);
}
</style>
