<template>
  <div class="quiz-page">
    <SiteHeader />
    <main>
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.quiz-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  background:
    radial-gradient(ellipse 80% 50% at 50% -10%, rgba(143, 167, 212, 0.18), transparent 60%),
    radial-gradient(ellipse 60% 40% at 90% 110%, rgba(109, 91, 158, 0.1), transparent 60%),
    var(--color-cream);
}
</style>
