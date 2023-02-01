<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RewardButton",
});
</script>

<template>
  <router-link :to="'/reward'" class="button">
    <font-awesome-icon icon="fa-solid fa-gift" />
  </router-link>
</template>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  border-radius: 50%;
  background-color: var(--color-camel);
  color: var(--color-black);
}
</style>
