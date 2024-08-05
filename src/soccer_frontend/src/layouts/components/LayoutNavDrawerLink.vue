<template>
  <q-item clickable :to="{'name': name}"
          active-class=""
          exact-active-class="nav-drawer__link--active">
    <q-item-section avatar class="q-mx-sm">
      <q-icon :name="icon"/>
    </q-item-section>
    <q-item-section>{{ title }}</q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface NavDrawerLinkProps {
  name: string,
  icon: string,
  title: string
}

withDefaults(defineProps<NavDrawerLinkProps>(), {
  name: '',
  icon: '',
  title: ''
})

</script>

<style scoped lang="scss">
.nav-drawer__link--active {
  border-right: 4px solid $primary;
  color: $grey-10;
  font-weight: bolder;
  background-color: rgba(0, 0, 0, .1);

  i {
    color: $primary;
  }
}

.q-item__section--avatar {
  min-width: unset;
}
</style>
