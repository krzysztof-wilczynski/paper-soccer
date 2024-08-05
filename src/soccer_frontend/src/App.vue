<template>
  <router-view/>
</template>

<script setup lang="ts">
import {socket} from 'src/socket';
import {useConnectionStore} from 'src/stores/connection';

const connectionStore = useConnectionStore();

socket.off()

connectionStore.bindEvents()
</script>
