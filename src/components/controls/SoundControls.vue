<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SoundControls",
  data() {
    return {
      isActive: false as boolean,
    };
  },
  methods: {
    toggleState() {
      this.isActive = !this.isActive;
    },
  },
  expose: ["toggleState"],
});
</script>

<template>
  <font-awesome-icon
    v-if="isActive"
    class="button"
    icon="fa-solid fa-volume-high"
    size="lg"
  />
  <font-awesome-icon
    v-else
    class="button"
    icon="fa-solid fa-volume-mute"
    size="lg"
  />
</template>

<style scoped>
.button {
  cursor: pointer;
}
</style>
