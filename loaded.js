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
        document.getElementsByClassName('_1lwv0f3').item(0).click();
      } catch(e) {
        console.log(e);
      }
    } else {
      console.log("false");
      // Check if Video In progress
      try {
        chrome.storage.local.get(["rtxprog"], function(result) {
          var progressInVideo = 0;
          try {
            progressInVideo = parseFloat(result.rtxprog);
          } catch(e) {
            console.log(e);
            progressInVideo = 0;
          }
          //parseFloat("1"));
          if (progressInVideo == 1) {
            console.log("completed");
            // Video Is Complete
            setTimeout(function() {
              try {
                document.querySelector("#__MODAL_PARENT__ > div > div._1bdwasy > div > div._h42z2xd > div._tamrgg > button").click();
              } catch(e) {
                console.log(e);
              }
            }, 500);
          } else {
            // Video Is In Progress
            console.log("vid in prog");
          }
        });
      } catch(e) {
        console.log(e);
      }
    }

  } else {
    // YouTube
    // Save Progress To Cache
    try {
      let prog = document.documentElement.innerHTML.split('ytp-play-progress')[1].split('scaleX(')[1].split(')')[0];
      chrome.storage.local.set({"rtxprog": prog}, function() { });
    } catch(e) {
      console.log(e);
    }
  }



  setTimeout(loop, 2000);
}

loop();
