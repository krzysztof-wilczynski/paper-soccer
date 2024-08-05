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
            <q-btn color="primary" text-color="white">SZUKAJ</q-btn>
          </q-item-section>
        </q-item>
        <LayoutNavDrawerLink icon="menu" name="Menu" title="Menu"/>
      </q-list>
    </q-scroll-area>
    <div class="absolute-top bg-primary text-white" style="height: 131px"></div>
  </q-drawer>

</template>

<script setup lang="ts">
import {useComponentsStore} from 'src/stores/components';
import LayoutNavDrawerLink from 'src/layouts/components/LayoutNavDrawerLink.vue';

const componentStore = useComponentsStore()


</script>
