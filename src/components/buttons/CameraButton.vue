<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CameraButton",
  props: {
    size: {
      type: String,
      required: false,
      default: "1x",
    },
  },
});
</script>

<template>
  <router-link :class="'--' + size" :to="'/camera'" class="button">
    <font-awesome-icon :size="size" icon="fa-solid fa-camera-retro" />
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

  &.--3x {
    height: 96px;
    width: 96px;
    padding: 24px;

    svg {
      font-size: 2.5rem;
    }
  }
}
</style>
