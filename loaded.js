'use strict';

function loop() {
  try {
    console.log(document.documentElement.innerHTML.split('ytp-play-progress')[1].split('scaleX(')[1].split(')')[0]);
  } catch(e) {
    console.log(e);
  }

  setTimeout(loop, 500);
}

loop();
