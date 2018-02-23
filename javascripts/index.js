var animation = bodymovin.loadAnimation({
  container: document.getElementById('bm'),
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: './../animation.json'
})

var socket = io('http://13.125.124.80:3000');
let audio = new Audio('./../heartbeat1seconds.mp3');

let beforeHeartBeat = 0;

socket.on('connect', () => {
  
})

socket.on('heartbeat', (_heartbeat) => { // response got every 1 seconds
  let thisHeartbeat = parseInt(_heartbeat);
  console.log('now heartbeat is', thisHeartbeat);
  if(beforeHeartBeat === 0 && thisHeartbeat !== 0 ) {
    animation.play();
  }
  if(thisHeartbeat > 0) { // valid
    animation.stop();
    animation.setSpeed(thisHeartbeat/60);    
    animation.play();
    beforeHeartBeat = thisHeartbeat;
  } else { // invalid
    animation.goToAndStop(0);
    beforeHeartBeat = 0;
  }
})