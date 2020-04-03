'use strict';

function inject(payload) {
  try {
    var tag = document.createElement('script');
    tag.textContent = '(' + payload  + ')();';
    document.head.appendChild(tag);
  } catch(e) {console.log(e);}
}


var getAPI = function() {
  try {
    let testYT = window.YT;
    if (testYT == null) { } else {
      window.YTAPI = testYT;
      var parsedID = window.document.getElementsByName('ka-player-iframe')[0].id
      console.log(parsedID);
      window.player = window.YT.get(parsedID);
      console.log(window.player);
    }
  } catch(e) {console.log(e);}
}

var playIfNotPlaying = function() {
  try {
    window.player.playVideo();
    window.player.seekTo(0, true);
  } catch(e) {console.log(e);}
}

var setPref = function() {
  try {
    window.player.setPlaybackRate(2);
  } catch(e) {console.log(e);}
}

var playerHeadUpdate = function() {
  function saveYTPos() {
    try {
      try {
        var element = window.document.getElementById('playbackID');
        element.parentNode.removeChild(element);
      } catch(e) {console.log(e);}
      let frac = window.player.getCurrentTime() + "," + window.player.getDuration();
      var tag = window.document.createElement('div');
      tag.id = 'playbackID';
      tag.textContent = frac;
      document.head.appendChild(tag);
    } catch(e) {console.log(e);}
    setTimeout(saveYTPos, 500);
  }
  saveYTPos();
}

console.log(window.document.documentElement.outerHTML);

setTimeout(function() {
  inject(getAPI);
}, 4000);
setTimeout(function() {
  inject(playIfNotPlaying);
  setTimeout(function() {
    inject(setPref);
  }, 1000);
  setTimeout(function () {
    inject(playerHeadUpdate);
  }, 3000);
}, 5000);

//console.log(document.documentElement.outerHTML);
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {

  var content = document.documentElement.innerHTML;
  var returnVar = "";

  if (content.includes("site_name\" content=\"Khan Academy")) {

    if (request.action == "getDOM") {
      returnVar = content;
    }

    if (request.action == "playIfNot") {
      inject(playIfNotPlaying);
    }

    if (request.action == "setPref") {
      inject(setPref);
      setTimeout(function () {
        inject(playerHeadUpdate);
      }, 3000);
    }

    if (request.action == "getPlayer") {
      try {
        returnVar = document.getElementById('playbackID').textContent;
      } catch(e) {console.log(e);}
    }
    console.log(returnVar);
    sendResponse(returnVar);
  } else {


  }
});
