<template>
  <div class="absolute-top bg-primary text-white items-center flex" style="height: 131px">
    isConnected: {{ connectionStore.isConnected }}
  </div>
</template>

<script setup lang="ts">
import {useConnectionStore} from 'src/stores/connection';

const connectionStore = useConnectionStore()


</script>

<style scoped lang="scss">

</style>
