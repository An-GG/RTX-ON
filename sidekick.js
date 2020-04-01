'use strict';

var actualCode = '(' + function() {
  console.log("AAASSSS")
  console.log(window);


  console.log(window.alert);

  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  function onYouTubeIframeAPIReady() {
    console.log("lreadyAASDSADSADKJANSDAJSKNDAKJSD");
  }

  console.log(window.YT);
} + ')();';

function loadScript() {
  //chrome.tabs.executeScript(actualCode);
  var tag = document.createElement('script');
  tag.textContent = actualCode;
  document.head.appendChild(tag);
}

function loadPlayer() {
  window.onYouTubePlayerAPIReady = function() {
      onYouTubePlayer();
      console.log('apidone');
  };
}




setTimeout(function() {
  loadScript();

}, 6000);

//console.log(document.documentElement.outerHTML);
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {

  var content = document.documentElement.innerHTML;
  var returnVar = "";

  if (content.includes("site_name\" content=\"Khan Academy")) {

    if (request.action == "getDOM") {
      returnVar = content;
    }

    if (request.action == "playIfNot") {
      //console.log(document.documentElement.outerHTML);
    }

  } else {
    if (request.action == "getPlayer") {
      returnVar = "not possible yet"
    }

  }
  sendResponse(returnVar);
});
