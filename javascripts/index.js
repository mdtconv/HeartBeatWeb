var animation = bodymovin.loadAnimation({
  container: document.getElementById('bm'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: './../animation.json'
})

var socket = io('http://13.125.124.80:3000');

let beforeHeartBeat = 0;

socket.on('connect', () => {
  
})

let audio = new Audio('./../heartbeat1seconds.mp3');

setInterval(() => {
  audio.play();
}, 1000);

socket.on('heartbeat', (_heartbeat) => {
  let thisHeartbeat = parseInt(_heartbeat);
  console.log('now heartbeat is', thisHeartbeat);
  if(beforeHeartBeat === 0 && thisHeartbeat !== 0 ) {
    animation.play();
  }
  if(thisHeartbeat > 0) { // valid
    animation.setSpeed(thisHeartbeat/60);    
    beforeHeartBeat = thisHeartbeat;
  } else { // invalid
    animation.goToAndStop(0);
    beforeHeartBeat = 0;
  }
})