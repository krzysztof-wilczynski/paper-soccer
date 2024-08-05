<template>
  <div class="absolute-top bg-primary text-white items-center flex" style="height: 131px">
    {{ connected }}
  </div>
</template>

<script setup lang="ts">
import {state} from 'src/socket';
import {computed} from 'vue';

const connected = computed(() => {
  return state.connected
})
</script>

<style scoped lang="scss">

</style>
