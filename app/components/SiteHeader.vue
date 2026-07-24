<script setup lang="ts">
const isOpen = ref(false)

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About Nicole' },
  { to: '/shop', label: 'Shop' },
  { to: '/contact', label: 'Contact' },
]

function closeMenu() {
  isOpen.value = false
}
</script>

<template>
  <header class="site-header">
    <div class="container bar">
      <NuxtLink to="/" class="brand-link" @click="closeMenu">
        <BrandMark theme="dark" />
      </NuxtLink>

      <nav class="nav-links" aria-label="Primary">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to">
          {{ link.label }}
        </NuxtLink>
      </nav>

      <NuxtLink to="/quiz" class="btn btn-outline-light quiz-cta">
        Take the Skin Quiz
      </NuxtLink>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="isOpen"
        aria-label="Toggle menu"
        @click="isOpen = !isOpen"
      >
        <span />
        <span />
        <span />
      </button>
    </div>

    <div v-if="isOpen" class="mobile-menu">
      <NuxtLink v-for="link in links" :key="link.to" :to="link.to" @click="closeMenu">
        {{ link.label }}
      </NuxtLink>
      <NuxtLink to="/quiz" class="btn btn-primary" @click="closeMenu">
        Take the Skin Quiz
      </NuxtLink>
    </div>
  </header>
  <div class="sage-bar" />
</template>

<style scoped>
.site-header {
  background: var(--color-navy);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 24px;
}

.brand-link {
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 28px;
  font-size: 13px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.nav-links a {
  text-decoration: none;
  color: var(--color-powder-blue);
  transition: color 0.15s ease;
}

.nav-links a:hover,
.nav-links a.router-link-exact-active {
  color: var(--color-white);
}

.quiz-cta {
  padding: 10px 22px;
  font-size: 12px;
  flex-shrink: 0;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
}

.menu-toggle span {
  width: 22px;
  height: 2px;
  background: var(--color-white);
  display: block;
}

.sage-bar {
  height: 4px;
  background: var(--color-sage);
}

.mobile-menu {
  display: none;
}

@media (max-width: 860px) {
  .nav-links {
    display: none;
  }
  .quiz-cta {
    display: none;
  }
  .menu-toggle {
    display: flex;
  }
  .mobile-menu.mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 24px;
    background: var(--color-navy);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  .mobile-menu a {
    color: var(--color-white);
    text-decoration: none;
    font-size: 15px;
  }
  .mobile-menu .btn {
    align-self: flex-start;
  }
}
</style>
