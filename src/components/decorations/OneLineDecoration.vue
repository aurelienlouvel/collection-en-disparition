<template>
  <div class="decoration">
    <svg
      fill="none"
      height="8"
      viewBox="0 0 62 8"
      width="62"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 7C6.64103 4.47201 25.1026 -0.864864 61 1.66313"
        stroke="#FFC31E"
        stroke-linecap="round"
        stroke-width="0.6"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "OneLineDecoration",
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
