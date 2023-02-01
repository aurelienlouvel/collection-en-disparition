<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TextButton",
});
</script>

<template>
  <font-awesome-icon class="button" icon="fa-solid fa-book-open" size="lg" />
</template>

<style scoped>
.button {
  cursor: pointer;
}
</style>
