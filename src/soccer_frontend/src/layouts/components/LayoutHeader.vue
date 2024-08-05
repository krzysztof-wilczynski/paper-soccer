<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="componentsStore.toggleNavDrawer"
      />

      <q-toolbar-title>
        Quasar App
      </q-toolbar-title>

      <q-btn icon="logout" @click="logoutUser()"></q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import {useComponentsStore} from 'src/stores/components';
import {useRouter} from 'vue-router'

const componentsStore = useComponentsStore()

const router = useRouter()

const logoutUser = () => {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  router.push({name: 'Login'})
}

</script>
