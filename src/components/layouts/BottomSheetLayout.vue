<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "BottomSheetLayout",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  emits: ["toggled", "completlyToggled"],
  setup(props, { emit, expose }) {
    const overlay = ref<HTMLElement | null>(null);
    const sheet = ref<HTMLElement | null>(null);

    const state = ref<Boolean>(false);

    const toggle = () => {
      if (state.value) {
        overlay.value?.classList.remove("active");
        sheet.value?.classList.remove("active");
        state.value = false;
      } else {
        overlay.value?.classList.add("active");
        sheet.value?.classList.add("active");
        state.value = true;
      }
      emit("toggled", state.value);
      setTimeout(() => {
        emit("completlyToggled", state.value);
      }, 300);
    };

    expose({
      toggle,
    });

    return {
      overlay,
      sheet,
      state,
      toggle,
    };
  },
});
</script>

<template>
  <div ref="overlay" class="overlay" @click="toggle"></div>
  <div ref="sheet" class="bottom-sheet">
    <div class="background"></div>
    <div class="mask">
      <div class="top"></div>
      <div class="bottom"></div>
    </div>
    <div class="text_container">
      <p class="text" v-html="text"></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  z-index: 3;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-black-transparent);
  opacity: 0;
  pointer-events: none;
  transition: 300ms linear;

  &.active {
    opacity: 1;
    pointer-events: all;
  }
}

.mask {
  pointer-events: none;
  z-index: 5;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;

  .top {
    background: var(--gradient-black-down);
    height: 48px;
    width: 100%;
  }

  .bottom {
    background: var(--gradient-black-up);
    height: 160px;
    width: 100%;
    bottom: 0;
  }
}

.bottom-sheet {
  z-index: 4;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 1rem 1rem 0 0;
  overflow: hidden;
  transform: translateY(100%);
  transition: 300ms ease-in-out;

  &.active {
    transform: translateY(0);
  }

  .text_container {
    overflow-y: scroll;
    max-height: calc(66vh);
    padding: 2rem 1.5rem 3rem;

    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }

    p {
      font-size: 1.2rem;
      line-height: 1.5rem;
      padding-bottom: 32px;
    }
  }
}

.background {
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: var(--background-image);
  filter: brightness(0.5);
  opacity: 0.96;
}
</style>
