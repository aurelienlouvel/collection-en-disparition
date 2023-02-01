<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "PlayControls",
  data() {
    return {
      isPlaying: true as boolean,
    };
  },
  methods: {
    toggleState() {
      this.isPlaying = !this.isPlaying;
    },
  },
  expose: ["toggleState"],
});
</script>

<template>
  <font-awesome-icon
    v-if="isPlaying"
    class="button"
    icon="fa-solid fa-pause"
    size="lg"
  />
  <font-awesome-icon v-else class="button" icon="fa-solid fa-play" />
</template>

<style scoped>
.button {
  cursor: pointer;
}
</style>
