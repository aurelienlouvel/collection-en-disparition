<script lang="ts">
import { defineComponent } from "vue";
import { useExperienceStore } from "@/stores/Experience";

import SurroundDecoration from "@/components/decorations/SurroundDecoration.vue";

import chapters from "@/data/chapters";

export default defineComponent({
  name: "ChapterHeader",
  components: { SurroundDecoration },
  data() {
    return {
      progression: 0,
      chapters: chapters,
    };
  },
  methods: {
    getProgression(): void {
      const experienceStore = useExperienceStore();
      this.progression = experienceStore.progression;
    },
  },
  mounted() {
    this.getProgression();
  },
});
</script>

<template>
  <div class="chapter">
    <p>{{ chapters[progression].time_period }}</p>
    <div class="title">
      <p class="large bold">{{ chapters[progression].title }}</p>
      <SurroundDecoration />
    </div>
  </div>
</template>

<style scoped>
.chapter {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  gap: 8px;
  text-align: center;
}

.title {
  z-index: 0;
}

.decoration {
  top: 50%;
  left: 50%;
}
</style>
