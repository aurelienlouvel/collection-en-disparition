<template>
  <div class="decoration">
    <svg
      fill="none"
      height="28"
      viewBox="0 0 182 28"
      width="182"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M96.7897 1C-19.6389 13.7604 -40.7736 31.4952 94.1307 25.9584C229.035 20.4216 201.693 -5.00682 47.5948 5.06018"
        stroke="#FFC31E"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="0.6"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SurroundDecoration",
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
