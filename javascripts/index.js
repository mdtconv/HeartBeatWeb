var animation = bodymovin.loadAnimation({
  container: document.getElementById('bm'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'animation.json'
})

var socket = io('http://13.125.124.80:3000');

socket.on('connect', () => {
  
})

socket.on('heartbeat', (heartbeat) => {
  console.log('now heartbeat is', heartbeat);
  animation.setSpeed(parseInt(heartbeat)/60);
})
