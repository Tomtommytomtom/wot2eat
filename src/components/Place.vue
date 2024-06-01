<script setup lang="ts">
import { Place } from "./place";

defineProps<{ place: Place }>();

const getIframeUrl = (placeId: string) => {
  return `https://www.google.com/maps/embed/v1/place?key=AIzaSyDZGuUd-EdDZW4R2drWRl-VsSOIWZY-rDk&q=place_id:${placeId}`;
};
</script>

<template>
  <div class="container">
    <h5>You are going to eat at:</h5>
    <h4>{{ place.name }}</h4>
    <iframe :src="getIframeUrl(place.place_id)"></iframe>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
