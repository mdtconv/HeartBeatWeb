var animation = bodymovin.loadAnimation({
  container: document.getElementById('bm'),
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: './../animation.json'
})

var socket = io('http://13.125.124.80:3000');
let audio = new Audio('./../heartbeat1seconds.mp3');
let textBox = document.getElementById('txtBox')

let beforeHeartBeat = 0;

let triggerFlag = false;

socket.on('connect', () => {
  
})

socket.on('heartbeat', (_heartbeat) => { // response got every 1 seconds
  let thisHeartbeat = parseInt(_heartbeat);
  console.log('now heartbeat is', thisHeartbeat);
  if(thisHeartbeat > 150) return;
  textBox.innerHTML = ""+thisHeartbeat;
  // console.log('triggerFlag is', triggerFlag);
  if(beforeHeartBeat === 0 && thisHeartbeat !== 0 ) {
    animation.play();
  }
  if(thisHeartbeat > 0) { // valid
    let totalFrame = Math.round(animation.totalFrames, 2);
    let currentFrame = Math.round(animation.currentRawFrame, 2);
    // console.log('totalFrame is', totalFrame);
    // console.log('currentFrame is', currentFrame);

    if(totalFrame - currentFrame == 0 || totalFrame - currentFrame == totalFrame) { // 정지되어 있는 경우
      // play
      
    }
    audio.pause();
    audio.currentTime = 0;
    audio.play();
    animation.stop();
    animation.setSpeed(thisHeartbeat/60);    
    animation.play();
    beforeHeartBeat = thisHeartbeat;
  } else { // invalid
    animation.goToAndStop(0);
    beforeHeartBeat = 0;
  }
})

// audio.load();
// audio.play();
// 1초마다 트리거, 속도는 조정