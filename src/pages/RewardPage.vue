<script lang="ts">
import { defineComponent } from "vue";

import BaseButton from "@/components/buttons/BaseButton.vue";

export default defineComponent({
  name: "RewardPage",
  components: { BaseButton },
  methods: {},
  mounted() {},
});
</script>

<template>
  <main>
    <div class="img"></div>
    <div class="artwork">
      <div class="title">
        <h2>Félicitations</h2>
      </div>
      <div class="illustration">
        <img src="@/assets/images/paul_guillaume.png" />
        <h1 class="styled">-20%</h1>
      </div>
      <div class="title">
        <p>
          Présentez ce code au Musée de l’Orangerie<br />
          et obtenez une réduction de 20%
        </p>
      </div>
      <p class="code">934023</p>
    </div>
  </main>
  <footer>
    <BaseButton
      class="base-button"
      icon="book"
      page="/story"
      text="Lire la fin de l’histoire"
    />
  </footer>
</template>

<style lang="scss" scoped>
main {
  width: 100%;
  height: 100%;

  .artwork {
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    padding: 80px 24px 32px;
    height: 100%;
    width: 100%;

    .illustration {
      display: flex;
      justify-content: center;

      img {
        width: auto;
        height: calc(var(--vh) * 36);
      }

      .styled {
        position: absolute;
        bottom: 32px;
        transform: rotate(-15deg);
      }
    }

    .title {
      padding: 8px 0;

      p {
        text-align: center;
      }
    }
  }
}

footer {
  width: 100%;

  .base-button {
    z-index: 8;
    position: absolute;
    bottom: 48px;
    right: 32px;
  }
}
</style>
