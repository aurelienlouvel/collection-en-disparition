<script lang="ts">
import { RouterView } from "vue-router";
import MuseeOrangerieLogo from "@/components/logos/MuseeOrangerieLogo.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    RouterView,
    MuseeOrangerieLogo,
  },
  mounted() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  },
});
</script>

<template>
  <MuseeOrangerieLogo />
  <RouterView />
</template>

<style>
:root {
  --color-white: #ffffff;
  --color-black: #141008;
  --color-camel: #e8d8ab;
  --color-yellow: #ffc31e;
  --color-black-transparent: rgba(20, 16, 8, 0.3);
  --color-camel-transparent: rgba(232, 216, 171, 0.6);

  --gradient-black-up: linear-gradient(
    180deg,
    rgba(20, 16, 8, 0) 0%,
    rgba(20, 16, 8, 0.8) 100%
  );
  --gradient-black-down: linear-gradient(
    180deg,
    rgba(20, 16, 8, 0.8) 0%,
    rgba(20, 16, 8, 0) 100%
  );
  --background-image: url("@/assets/images/background.jpg");
}

@font-face {
  font-family: "Branch";
  src: url("@/assets/fonts/branch.woff2") format("woff2"),
    url("@/assets/fonts/branch.woff") format("woff");
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  position: relative;
  font-weight: normal;
}

body {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  color: var(--color-black);
  background: var(--color-black);
  font-family: Inter, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  position: absolute;
  top: 0;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background: var(--background-image);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

header,
footer {
  position: absolute;
}

footer {
  bottom: 0;
}

h1 {
  color: var(--color-yellow);
}

h2,
h3,
p {
  color: var(--color-white);
}

h1 {
  font-family: "Kristi", cursive;
  font-style: italic;
  font-weight: 400;
  font-size: 4.75rem;
  line-height: 100%;
  text-align: center;
}

h2 {
  font-family: "Kristi", cursive;
  font-style: italic;
  font-weight: 400;
  font-size: 2.5rem;
  line-height: 100%;
  text-align: center;
}

h3 {
  font-family: "Branch", serif;
  font-weight: 400;
  font-size: 1.625rem;
  line-height: 120%;
  text-align: center;
}

p {
  font-family: "Barlow", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
}

p.code {
  font-size: 3rem;
  font-weight: 600;
}

p.large {
  font-size: 1.25rem;
}

p.small {
  font-size: 0.875rem;
}

p.bold {
  font-weight: 500;
}

p.light {
  font-weight: 300;
}

a {
  color: unset;
  text-decoration: none;
}

@media (min-width: 480px) {
  body {
    padding: 4vh;
    background: var(--color-camel-transparent);
  }

  #app {
    top: unset;
    height: calc(var(--vh, 1vh) * 100 - 8vh);
    max-height: 812px;
    width: auto;
    aspect-ratio: 390/812;
    border-radius: 24px;
    overflow: hidden;
  }
}

#arjs-video {
  z-index: 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center !important;
  margin: 0 !important;
  top: unset !important;
  left: unset !important;
}

.canvas canvas {
  position: absolute;
}

.canvas canvas:last-child {
  z-index: -1 !important;
}

[data-engine="three.js r148"] {
  z-index: 5;
}
</style>
