<template>
  <div class="decoration">
    <svg
      fill="none"
      height="12"
      viewBox="0 0 98 12"
      width="98"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M97 1C86.4012 2.61173 76.8194 3.9998 68.1884 5.18427M68.1884 5.18427C10.4386 13.1096 -4.74584 11.9203 2.7945 7.62845C7.82788 4.76351 40.045 4.62319 68.1884 5.18427ZM68.1884 5.18427C78.8145 5.39612 88.8599 5.70796 96.6421 6.01089"
        stroke="#FFC31E"
        stroke-width="0.6"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TwoLinesDecoration",
});
</script>

<style scoped>
.decoration {
  z-index: -1;
  position: absolute;
}

svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
