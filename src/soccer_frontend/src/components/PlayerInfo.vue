<template>
  {{playerInfo}}
</template>

<script setup lang="ts">

import { ref } from 'vue';
import {PlayerInfoResponse} from 'src/components/models';
import {getPlayerInfo} from 'src/api/endpoints';

const playerInfo = ref<PlayerInfoResponse>([])
playerInfo.value = await getPlayerInfo()
</script>
