export const socket = new WebSocket('ws://localhost:8000/ws/lobby/')

socket.onmessage = (e) => {
  switch (e.type) {
    case 'lobby_join' :{
      console.log('joined')
    }
  }
}
