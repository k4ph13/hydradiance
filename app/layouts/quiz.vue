<template>
  <div class="quiz-page">
    <header class="quiz-header">
      <div class="container">
        <NuxtLink to="/" aria-label="Skin Fluent home">
          <BrandMark theme="dark" />
        </NuxtLink>
      </div>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
.quiz-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.quiz-header {
  background: var(--color-navy);
  padding: 20px 0;
}

main {
  flex: 1;
}
</style>
