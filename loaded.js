'use strict';

function loop() {
  console.log("Working")
  setTimeout(loop, 500);
}

loop();
