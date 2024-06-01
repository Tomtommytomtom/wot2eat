<script setup lang="ts">
import { ref } from 'vue';

const isVegan = ref(false);

const getCoordinates = () => new Promise<GeolocationPosition>((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(resolve, reject);
});

const onSearch = async () => {
  const coordinates = await getCoordinates();

  const data = {
    isVegan: isVegan.value,
    latitude: coordinates.coords.latitude,
    longitude: coordinates.coords.longitude,
  };

  return data
};
</script>

<template>
  <div class="container" :class="isVegan ? 'vegan-background' : 'non-vegan-background'">
    <label class="vegan-input">
      Vegan
      <input v-model="isVegan" type="checkbox"></input>
    </label>

    <button @click="onSearch">Search</button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.vegan-background {
  background-color: lightgreen;
}

.non-vegan-background {
  background-color: lightcoral;
}

.vegan-input {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
