<script lang="ts" setup>
import { onMounted, ref } from "vue";
import emblaCarouselVue from "embla-carousel-vue";
import Autoplay from "embla-carousel-autoplay";
import BaseButton from "@/components/buttons/BaseButton.vue";
import OneLineDecoration from "@/components/decorations/OneLineDecoration.vue";
import slides from "@/data/slides";

const slideCurrentPosition = ref(0);

const [emblaNode, emblaApi] = emblaCarouselVue({ loop: false }, [
  Autoplay({ delay: 6000, stopOnInteraction: false, stopOnLastSnap: true }),
]);

const scrollTo = (index: number) => {
  if (emblaApi.value) {
    emblaApi.value.scrollTo(index);
  }
};

onMounted(() => {
  if (emblaApi.value) {
    emblaApi.value.on("select", () => {
      if (emblaApi.value) {
        slideCurrentPosition.value = emblaApi.value.selectedScrollSnap();
      }
    });
  }
});
</script>

<template>
  <main>
    <div class="embla">
      <div ref="emblaNode" class="embla__viewport">
        <div class="embla__container">
          <div
            v-for="(slide, index) in slides"
            :id="'slide' + index"
            :key="index"
            class="embla__slide"
          >
            <img :src="slide.image" :alt="slide.title" />
            <div class="title">
              <h3>{{ slide.title }}</h3>
              <OneLineDecoration class="decoration" />
            </div>
            <p class="light" v-html="slide.description"></p>
          </div>
        </div>
      </div>
      <div ref="dotsNode" class="embla__dots">
        <div
          v-for="(_, index) in slides"
          :key="index"
          :class="{ 'is-selected': index === slideCurrentPosition }"
          class="embla__dot"
          @click="scrollTo(index)"
        />
      </div>
    </div>
  </main>
  <BaseButton
    class="base-button"
    icon="play"
    page="/story"
    text="C'est parti"
  />
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 80px 0 16vh;

  .decoration {
    left: 14ch;
  }

  .embla {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .embla__container {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .embla__slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 0 24px;
    gap: 24px;
    width: 100%;
    height: 100%;
    flex: 0 0 100%;
    min-width: 0;
    margin-right: 96px;

    img {
      height: calc(var(--vh, 1vh) * 30);
      aspect-ratio: 2/3;
      background-color: var(--color-camel-transparent);
      border-radius: 8px;
    }

    p {
      text-align: center;
    }

    &#slide0 .decoration {
      left: 29ch;
    }

    &#slide1 .decoration {
      left: 15ch;
    }

    &#slide2 .decoration {
      left: 6ch;
    }
  }

  .embla__dots {
    position: absolute;
    bottom: 16px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    .embla__dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: var(--color-camel-transparent);
      cursor: pointer;
      transition: 300ms background-color ease-in-out;

      &.is-selected {
        background-color: var(--color-camel);
      }
    }
  }
}

.base-button {
  position: absolute;
  bottom: 48px;
  right: 32px;
}
</style>
