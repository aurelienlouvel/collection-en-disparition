<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProgressControls",
  props: {
    duration: {
      type: Number,
      required: true,
    },
  },
  methods: {
    updateDuration(duration: number) {
      const seek = this.$refs.seek as HTMLInputElement;
      const progress = this.$refs.progress as HTMLProgressElement;

      seek.setAttribute("max", Math.floor(duration).toString());
      progress.setAttribute("max", Math.floor(duration).toString());
    },
    updateProgress(time: number) {
      const seek = this.$refs.seek as HTMLInputElement;
      const progress = this.$refs.progress as HTMLProgressElement;

      seek.value = Math.floor(time).toString();
      progress.value = Math.floor(time);
    },
    skipAhead(time: number) {
      const seek = this.$refs.seek as HTMLInputElement;
      const progress = this.$refs.progress as HTMLProgressElement;

      seek.value = Math.floor(time).toString();
      progress.value = Math.floor(time);

      this.$emit("skip", time);
    },
  },
  mounted() {
    const seek = this.$refs.seek as HTMLInputElement;
    seek.addEventListener("input", () => {
      this.skipAhead(parseInt(seek.value));
    });
  },
  expose: ["updateDuration", "updateProgress"],
  emits: ["skip"],
});
</script>

<template>
  <div class="bar">
    <progress ref="progress" class="progress" value="0"></progress>
    <input ref="seek" class="seek" min="0" step="1" type="range" value="0" />
  </div>
</template>

<style scoped>
.bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

.progress {
  height: 6px;
  width: 100%;
  appearance: none;
  border: none;
}

.progress::-webkit-progress-bar {
  background-color: var(--color-camel-transparent);
  border-radius: 3px;
}

.progress::-webkit-progress-value {
  background-color: var(--color-camel);
  border-radius: 3px;
}
.seek {
  position: absolute;
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  background: transparent;
  outline: none;
}

.seek::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-camel);
  cursor: pointer;
}
</style>
