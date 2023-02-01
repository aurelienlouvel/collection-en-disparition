<script lang="ts">
import { defineComponent } from "vue";

import EnglishIcon from "@/components/icons/EnglishFlagIcon.vue";
import FrenchIcon from "@/components/icons/FrenchFlagIcon.vue";

export default defineComponent({
  name: "LanguageButton",
  components: { FrenchIcon, EnglishIcon },
  data() {
    return {
      lang: "fr",
    };
  },
  methods: {
    getBrowserLanguage() {
      if (navigator.language.match(/fr*/ || /br*/ || /_*FR/)) {
        this.lang = "fr";
      } else {
        this.lang = "en";
      }
    },
  },
  mounted() {
    this.getBrowserLanguage();
  },
});
</script>

<template>
  <div class="button">
    <EnglishIcon v-if="lang === 'fr'" class="icon" />
    <FrenchIcon v-if="lang === 'en'" class="icon" />
  </div>
</template>

<style scoped>
.button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--color-camel);
  overflow: hidden;
}

svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
}
</style>
