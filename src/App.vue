<script setup lang="ts">
import { ref } from 'vue';
import SpinningButton from './SpinningButton.vue';
import Place from './components/Place.vue';

const isVegan = ref(false);

const getCoordinates = () => new Promise<GeolocationPosition>((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(resolve, reject);
});

const place = ref()

const getRandomArrayElement = (array: any[]) => array[Math.floor(Math.random() * array.length)];

const isLoading = ref(false);
const isError = ref<string | undefined>(undefined);

const onSearch = async () => {
  const coordinates = await getCoordinates();

  const data = {
    isVegan: isVegan.value,
    latitude: coordinates.coords.latitude,
    longitude: coordinates.coords.longitude,
  };

  const paramString = new URLSearchParams(data as any).toString();

  isLoading.value = true;
  fetch('https://worker-delicate-dew-3a48.schueleraron.workers.dev/?' + paramString).then(response => response.json()).then(response => {
    if(!response.length) {
      isError.value = 'No places found';
      return;
    }
    place.value = getRandomArrayElement(response);
  }).finally(() => {
    isLoading.value = false;
  })  
};
</script>

<template>
  <div class="container" :class="isVegan ? 'vegan-background' : 'non-vegan-background'">
    <label class="vegan-input">
      Vegan
      <input v-model="isVegan" type="checkbox"></input>
    </label>

    <SpinningButton v-if="!place" :is-loading @click="onSearch">What 2 Eat?</SpinningButton>
    <p v-else-if="isError"
    >{{ isError }}</p>
    <Place v-else :place="place"></Place>
  </div>
</template>

<style scoped>
.container {
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
}

.vegan-background {
  background-color: #105831;
}

.non-vegan-background {
  background-color: #692d2d;
}

.vegan-input {
  position: absolute;
  top: 1em;
  right: 1em;
}
</style>
