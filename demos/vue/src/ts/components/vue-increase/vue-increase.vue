<template>
  <div class="v-increase">
    <h1>Vue Increase Component</h1>
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

<style lang="css">
.v-increase {
  display: block;
  border: 5px solid #35495e;
  background-color: #41b883;
  color: black;
  padding: 20px;
  margin: 20px;
}
</style>