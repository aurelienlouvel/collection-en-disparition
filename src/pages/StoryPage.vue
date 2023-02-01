<script lang="ts">
import { defineComponent } from "vue";
import { useExperienceStore } from "@/stores/Experience";

import ChapterHeader from "@/components/headers/ChapterHeader.vue";
import SoundControls from "@/components/controls/SoundControls.vue";
import TextButton from "@/components/buttons/TextButton.vue";
import CameraButton from "@/components/buttons/CameraButton.vue";
import PlayControls from "@/components/controls/PlayControls.vue";
import ProgressControls from "@/components/controls/ProgressControls.vue";
import MapButton from "@/components/buttons/MapButton.vue";
import RewardButton from "@/components/buttons/RewardButton.vue";
import BottomSheetLayout from "@/components/layouts/BottomSheetLayout.vue";

import chapters from "@/data/chapters";

export default defineComponent({
  name: "StoryPage",
  components: {
    BottomSheetLayout,
    SoundControls,
    ProgressControls,
    PlayControls,
    RewardButton,
    MapButton,
    CameraButton,
    TextButton,
    ChapterHeader,
  },
  data() {
    return {
      progression: 0,
      chapters: chapters,
      button: "camera",
      story: "" as string,
      bottomSheet: false as boolean,
    };
  },
  methods: {
    getProgression(): void {
      const experienceStore = useExperienceStore();
      this.progression = experienceStore.progression;

      if (experienceStore.progression === 0) {
        this.button = "camera";
      } else if (experienceStore.progression === 5) {
        this.button = "reward";
      } else {
        this.button = "map";
      }
    },
    toggleSound(): void {
      const video = this.$refs["video"] as HTMLVideoElement;
      video.muted = !video.muted;

      const sound = this.$refs["sound"] as any;
      sound.toggleState();
    },
    playVideo(): void {
      const video = this.$refs["video"] as HTMLVideoElement;
      video.play();
      const playControls = this.$refs["play"] as any;
      playControls.toggleState();
    },
    pauseVideo(): void {
      const video = this.$refs["video"] as HTMLVideoElement;
      video.pause();
      const playControls = this.$refs["play"] as any;
      playControls.toggleState();
    },
    togglePlay(): void {
      const video = this.$refs["video"] as HTMLVideoElement;
      if (video.paused) {
        this.playVideo();
      } else {
        this.pauseVideo();
      }
    },
    updateCurrentTime(time: number): void {
      const video = this.$refs["video"] as HTMLVideoElement;
      video.currentTime = time;
    },
    updateVideo(state: boolean): void {
      if (state) {
        this.pauseVideo();
      } else {
        this.playVideo();
      }
    },
    toggleBottomSheet(): void {
      const bottomSheet = this.$refs["bottom-sheet"] as any;
      if (!this.bottomSheet) {
        bottomSheet.toggle();
      }
    },
    updatedBottomSheet(state: boolean): void {
      this.bottomSheet = state;
    },
  },

  mounted() {
    this.getProgression();
    const progress = this.$refs["progress"] as any;
    const video = this.$refs["video"] as HTMLVideoElement;
    video.onloadedmetadata = () => {
      progress.updateDuration(video.duration);
    };
    video.ontimeupdate = () => {
      progress.updateProgress(video.currentTime);
    };
  },
});
</script>

<template>
  <header>
    <ChapterHeader />
    <div class="side_controls">
      <SoundControls ref="sound" @click="toggleSound" />
      <TextButton @click="toggleBottomSheet" />
    </div>
  </header>
  <main>
    <div class="filter"></div>
    <video id="video" ref="video" autoplay muted>
      <source :src="chapters[progression].video" type="video/mp4" />
    </video>
  </main>
  <footer>
    <div class="main_controls">
      <PlayControls ref="play" @click="togglePlay" />
      <ProgressControls
        ref="progress"
        @skip="updateCurrentTime"
        :duration="0"
      />
    </div>
    <CameraButton v-if="button === 'camera'" />
    <MapButton v-if="button === 'map'" />
    <RewardButton v-if="button === 'reward'" />
  </footer>
  <BottomSheetLayout
    ref="bottom-sheet"
    :text="chapters[progression].story"
    @toggled="updateVideo"
    @completly-toggled="updatedBottomSheet"
  />
</template>

<style lang="scss" scoped>
header {
  z-index: 2;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 64px 48px 8vh;
  background: var(--gradient-black-down);

  .side_controls {
    z-index: 1;
    position: absolute;
    top: 32px;
    right: 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 24px;
    gap: 24px;
    color: var(--color-camel);
  }
}

main {
  width: 100%;
  height: 100%;

  .filter {
    width: 100%;
    height: 100%;
    z-index: 1;
    position: absolute;
    background-color: var(--color-black-transparent);
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: bottom;
  }
}

footer {
  z-index: 2;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem 2rem 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: var(--color-camel);

  .main_controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 24px;
    padding: 0 16px;
    flex-grow: 1;
    height: 10px;
  }
}
</style>
