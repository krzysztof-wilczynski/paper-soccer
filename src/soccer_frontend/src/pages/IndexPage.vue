<template>
  <q-page class="row items-center justify-evenly">
    <Suspense>
      <PlayerInfo/>
      <template #fallback>
        ...
      </template>
    </Suspense>
  </q-page>
</template>

<script setup lang="ts">

import PlayerInfo from 'src/components/PlayerInfo.vue';
</script>
