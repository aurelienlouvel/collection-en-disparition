<script lang="ts">
export default {
  name: "BaseButton",
  props: {
    page: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      required: false,
      default: "right",
    },
  },
};
</script>

<template>
  <router-link :to="page" class="button">
    <p class="text bold">{{ text }}</p>
    <font-awesome-icon v-if="icon === 'play'" icon="fa-solid fa-play" />
    <font-awesome-icon v-if="icon === 'book'" icon="fa-solid fa-book-open" />
    <svg class="mask" height="0" width="0">
      <defs>
        <clipPath id="svgPath" clipPathUnits="objectBoundingBox">
          <path
            d="M106.649 0.209556L4.26461 5.14076C1.95565 5.25196 0.221346 7.29151 0.482682 9.58833L5.24208 51.4175C5.47372 53.4533 7.20627 54.9849 9.25514 54.9651L105.183 54.0369C107.319 54.0163 109.062 52.3202 109.141 50.1852L110.839 4.35297C110.926 2.01123 108.99 0.0968222 106.649 0.209556Z"
            transform="scale(0.009, 0.018)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  </router-link>
</template>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  gap: 8px;
  color: var(--color-black);
  background-color: var(--color-camel);
  clip-path: url(#svgPath);
}

.button p {
  color: var(--color-black);
}

.mask {
  position: absolute;
}
</style>
