---
layout: home

hero:
  name: vHooks
  text: A collection of React hooks.
  tagline: Optimized, reusable, and fully type-safe hooks for seamless React development.
  actions:
    - text: Get Started
      link: /guide/
      theme: brand
    - text: GitHub
      link: https://github.com/your-repo/vhooks
      theme: alt

features:
  - title: Simple and minimal, always
    details: Lorem ipsum...
    link: /hooks
  - title: Another cool feature
    details: Lorem ipsum...
# <--feature
---


<div class="c-container c-items">
  <div v-for="feature in $frontmatter.features" :key="feature.title" class="c-item">
    <h3>{{ feature.title }}</h3>
    <p>{{ feature.details }}</p>
    <a v-if="feature.link" :href="feature.link">Learn more →</a>
  </div>
</div>

<style scoped>
.c-container {
  margin: 0 auto;
  max-width: 1152px;
}
.c-items {
  display: flex;
  flex-wrap: wrap;
}
.c-item {
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;
  display: block;
}
</style>


## Getting Started

You can get started using VitePress right away using `npx`!

```sh
npm init
npx vitepress init
```
