import {defineStore} from 'pinia';
import {socket} from 'src/socket';

export const useConnectionStore = defineStore('connection', {
  state: () => ({
    socket,
    inQueue: false,
    playersInQueue: null,
  }),

  actions: {
    joinQueue() {
      this.socket.send(JSON.stringify({'message': 'japa koniu'}))
    }
  }
});
