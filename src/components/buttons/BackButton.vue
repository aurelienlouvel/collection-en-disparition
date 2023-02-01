<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";

export default defineComponent({
  name: "BackButton",
  methods: {
    goBack() {
      router.back();
    },
  },
});
</script>

<template>
  <a class="button" @click="goBack">
    <font-awesome-icon icon="fa-solid fa-arrow-left" />
  </a>
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
  cursor: pointer;
}
</style>
