<template>
  <q-layout view="lHh Lpr lFf">
    <LayoutHeader/>
    <LayoutNavDrawer/>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import LayoutHeader from 'src/layouts/components/LayoutHeader.vue';
import LayoutNavDrawer from 'src/layouts/components/LayoutNavDrawer.vue';
</script>
