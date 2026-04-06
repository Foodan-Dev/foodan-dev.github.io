<template>
  <section class="home-view">
    <div class="hero-card">
      <img class="logo" src="@/assets/logo-transparent.png" alt="旦食 Logo" />
      <h1>旦食</h1>
      <p class="subtitle">生命不息，干饭不止</p>
      <p class="version">Version v0.0.0</p>
      <div class="actions">
        <el-button class="action-primary" type="primary" size="large">下载</el-button>
        <el-button
          class="action-secondary"
          size="large"
          plain
          tag="a"
          href="https://github.com/Foodan-Dev"
          target="_blank"
          rel="noreferrer"
        >
          <span class="github-content">
            <svg class="github-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 0C5.37 0 0 5.5 0 12.28c0 5.42 3.44 10.01 8.2 11.63.6.11.82-.27.82-.59 0-.29-.01-1.06-.02-2.09-3.34.74-4.04-1.65-4.04-1.65-.54-1.43-1.33-1.8-1.33-1.8-1.09-.77.08-.75.08-.75 1.2.09 1.83 1.29 1.83 1.29 1.07 1.88 2.8 1.34 3.48 1.03.11-.8.42-1.34.76-1.65-2.66-.31-5.47-1.37-5.47-6.09 0-1.35.46-2.45 1.22-3.32-.12-.31-.53-1.56.12-3.25 0 0 1-.33 3.3 1.27a11.2 11.2 0 0 1 6 0c2.3-1.6 3.3-1.27 3.3-1.27.65 1.69.24 2.94.12 3.25.76.87 1.22 1.97 1.22 3.32 0 4.73-2.81 5.78-5.49 6.08.43.38.82 1.11.82 2.24 0 1.62-.01 2.93-.01 3.33 0 .33.22.71.83.59A12.05 12.05 0 0 0 24 12.28C24 5.5 18.63 0 12 0z"
              />
            </svg>
            GitHub
          </span>
        </el-button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-view {
  min-height: calc(100vh - 120px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
}

.hero-card {
  width: min(640px, 100%);
  border-radius: 24px;
  padding: 48px 28px;
  text-align: center;
}

.logo {
  width: 240px;
  height: 240px;
  margin-bottom: 12px;
}

h1 {
  font-size: 48px;
  line-height: 1.2;
  color: #6a3c13;
  font-weight: 700;
}

.subtitle {
  margin-top: 10px;
  font-size: 20px;
  color: #8b572a;
}

.version {
  margin-top: 8px;
  font-size: 13px;
  color: #ae997e;
}

.actions {
  margin-top: 28px;
  display: flex;
  justify-content: center;
  gap: 12px;
}

.actions :deep(.action-primary) {
  --el-button-bg-color: #d17b1f;
  --el-button-border-color: #d17b1f;
  --el-button-hover-bg-color: #e39138;
  --el-button-hover-border-color: #e39138;
  --el-button-active-bg-color: #bd6712;
  --el-button-active-border-color: #bd6712;
}

.actions :deep(.action-secondary) {
  --el-button-text-color: #8b572a;
  --el-button-border-color: #dfb07d;
  --el-button-bg-color: #fff8ef;
  --el-button-hover-text-color: #a86424;
  --el-button-hover-border-color: #d17b1f;
  --el-button-hover-bg-color: #fff2e2;
  --el-button-active-text-color: #7f4b1f;
}

.github-content {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.github-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

@media (max-width: 640px) {
  .hero-card {
    padding: 36px 20px;
  }

  h1 {
    font-size: 38px;
  }

  .subtitle {
    font-size: 17px;
  }
}
</style>
