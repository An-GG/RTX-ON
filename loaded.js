'use strict';


function loop() {

  // Check If Site Is khanacademy
  var content = document.documentElement.innerHTML;

  if (content.includes("Learn for free about math, art, computer programming, economics, physics, chemistry, biology")) {
    // Khan

    // Is Play Button There
    if (content.includes("video-play-button")) {
      console.log("Contains Button, Clicking...");
      try {
        document.querySelector("#uid-dialog-0-children > div > div > div > div.ka-video-player._d6bfgon > div > div._1tuo6xk > button").click();
      } catch(e) {
        console.log(e);
      }
    } else {
      // Check if Video In progress
      
    }

  } else {
    // YouTube
  }

  try {
    //console.log(document.documentElement.innerHTML.split('ytp-play-progress')[1].split('scaleX(')[1].split(')')[0]);
  } catch(e) {}

  setTimeout(loop, 2000);
}

loop();
