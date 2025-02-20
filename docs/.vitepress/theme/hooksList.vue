<script setup>
const features = [
  { title: "Simple and minimal, always", details: "Lorem ipsum...", link: "/hooks" },
  { title: "Optimized Performance", details: "Uses efficient rendering to keep your app fast." },
  { title: "Fully Type-Safe", details: "Built with TypeScript for better developer experience." },
  { title: "Reusable & Composable", details: "Designed for reusability in modern apps." },
  { title: "Lightweight & Fast", details: "Zero dependencies and optimized bundle size." }
];
</script>

<template>
  <div class="feature-grid">
    <div v-for="(feature, index) in features" :key="index" class="feature-card">
      <h3>{{ feature.title }}</h3>
      <p>{{ feature.details }}</p>
      <a v-if="feature.link" :href="feature.link">Learn more →</a>
    </div>
  </div>
</template>

<style scoped>
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
.feature-card {
  padding: 16px;
  border-radius: 8px;
  background: #f8f9fa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.feature-card h3 {
  margin: 0 0 8px;
}
</style>
