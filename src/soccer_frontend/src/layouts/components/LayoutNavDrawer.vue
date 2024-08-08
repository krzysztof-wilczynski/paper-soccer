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
            <q-btn color="primary" text-color="white" @click="connectionStore.joinQueue()">
              {{ connectionStore.inQueue ? 'Przerwij wyszukiwanie' : 'Znajdź przeciwnika' }}
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
import {useConnectionStore} from 'src/stores/connection';
import LayoutNavDrawerLink from 'src/layouts/components/LayoutNavDrawerLink.vue';
import ConnectionState from 'src/components/ConnectionState.vue';

const componentStore = useComponentsStore()
const connectionStore = useConnectionStore()

</script>
