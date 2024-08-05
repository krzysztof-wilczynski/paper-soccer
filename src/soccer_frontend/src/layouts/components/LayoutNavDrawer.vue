<template>
  <q-drawer
    v-model="componentStore.navDrawerOpen"
    show-if-above
    bordered
  >
    <q-scroll-area style="height: calc(100% - 131px); margin-top: 131px">
      <q-list>
        <q-item>
          <q-item-section>
            <q-btn color="primary" text-color="white" @click="joinQueue()">
              {{ inQueue ? 'Przerwij wyszukiwanie' : 'Znajdź przeciwnika' }}
            </q-btn>
          </q-item-section>
        </q-item>
        <LayoutNavDrawerLink icon="menu" name="Menu" title="Menu"/>
      </q-list>
    </q-scroll-area>
    <ConnectionState/>
  </q-drawer>

</template>

<script setup lang="ts">
import {useComponentsStore} from 'src/stores/components';
import LayoutNavDrawerLink from 'src/layouts/components/LayoutNavDrawerLink.vue';
import {ref} from 'vue'
import ConnectionState from 'src/components/ConnectionState.vue';

const componentStore = useComponentsStore()
const inQueue = ref<boolean>(false)

const inQueueCount = ref<number>(0)

const joinQueue = () => {
  const socket = new WebSocket('ws://localhost:8000/ws/lobby/')

  socket.onopen = () => {
    console.log('connected')
    inQueue.value = true
  }

  socket.onclose = () => {
    console.log('closed')
    inQueue.value = false
  }

  socket.onmessage = (e) => {
    const data = JSON.parse(e.data)
    inQueueCount.value = data.inQueue
  }
}

</script>
