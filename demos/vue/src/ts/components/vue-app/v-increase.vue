<template>
  <div>
    <h1>My Event</h1>
    <p>Capacity: {{ capacity }}</p>
    <button @click="increaseCapacity()">Increase Capacity</button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const capacity = ref(3);

    function increaseCapacity() { 
      capacity.value++;
    }
    return { capacity, increaseCapacity };
  }
};
</script>