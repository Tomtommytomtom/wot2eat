<script setup lang="ts">
import { computed } from 'vue';


const props = withDefaults(defineProps<{ isLoading: boolean, width: number }>(), {
  isLoading: false,
  width: 200,
})

const r = computed(() => props.width / 2);
</script>

<template>
    <button class="container" :disabled="isLoading">
        <svg :width :height="width" :viewBox="`0 0 ${width} ${width}`" xmlns="http://www.w3.org/2000/svg">
            <circle :class="[isLoading ? 'animating' : '']" class="path" :cx="r" :cy="r" :r/>
        </svg>
        <div class="button-text">
            <slot>button text</slot>
        </div>
    </button>
</template>

<style scoped>
.container {
  color: white;
}

svg {
  fill: none;
  overflow: visible;
  transform: rotate(-90deg);
}
.path {
  stroke: white;
  stroke-width: 8;
  stroke-dasharray: 800;
  stroke-dashoffset: 0;
}

.animating {
  animation: borderanim 2s infinite;
}

button {
  position: relative;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}

.button-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  z-index: 100;
}

@keyframes borderanim {
  from {
    stroke-dashoffset: 800;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>
