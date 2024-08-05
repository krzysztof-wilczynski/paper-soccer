import {defineStore} from 'pinia';

export const useComponentsStore = defineStore('components', {
  state: () => {
    return {
      navDrawerOpen: false
    }
  },
  actions: {
    toggleNavDrawer() {
      this.navDrawerOpen = !this.navDrawerOpen;
    }
  }
});
