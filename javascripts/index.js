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

socket.on('heartbeat', (_heartbeat) => {
  let heartbeat = parseInt(_heartbeat);
  console.log('now heartbeat is', heartbeat);
  if(heartbeat > 0) { // valid
    animation.setSpeed(heartbeat/60);    
  } else { // invalid
    animation.goToAndStop(0);
  }  


})
