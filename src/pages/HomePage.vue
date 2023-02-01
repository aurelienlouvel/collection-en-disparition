<script lang="ts">
import GobelinsParisLogo from "@/components/logos/GobelinsParisLogo.vue";
import LanguageButton from "@/components/buttons/LanguageButton.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import OneLineDecoration from "@/components/decorations/OneLineDecoration.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    GobelinsParisLogo,
    LanguageButton,
    BaseButton,
    OneLineDecoration,
  },
});
</script>

<template>
  <header>
    <LanguageButton class="language-button" />
  </header>
  <main>
    <div class="content">
      <div class="illustration">
        <img src="@/assets/images/paul_guillaume_frame.png" />
        <h1>Collection<br />en disparition</h1>
      </div>
      <p class="light">
        Paul Guillaume soupçonne sa femme de vouloir revendre une partie de sa
        collection.
      </p>
      <div class="catchline">
        <p class="bold">Aidez le à la conserver au plus vite !</p>
        <OneLineDecoration class="decoration" />
      </div>
    </div>
    <BaseButton icon="play" page="onboarding" text="Commencer" />
  </main>
  <footer>
    <div class="duration">
      <font-awesome-icon icon="fa-solid fa-stopwatch" />
      <p class="duration__text">15 minutes</p>
    </div>
    <GobelinsParisLogo />
  </footer>
</template>

<style lang="scss" scoped>
.language-button {
  position: absolute;
  top: 24px;
  right: 24px;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  padding: 80px 24px 16vh;
  gap: 32px;
}

.illustration {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    height: calc(var(--vh) * 42);
  }
}

.illustration h1 {
  position: absolute;
  bottom: 0;
}

.content {
  z-index: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 24px;
  text-align: center;
}

.decoration {
  bottom: -0.5rem;
  left: 13.5ch;
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  padding: 24px;
}

.duration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  color: var(--color-camel);

  &__text {
    color: var(--color-camel);
  }
}
</style>
