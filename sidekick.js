'use strict';

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {

  var content = document.documentElement.innerHTML;
  console.log(content);
  sendResponse('');
  /*if (content.includes("Learn for free about math, art, computer programming, economics, physics, chemistry, biology")) {

    if (request.action == "getDOM") {
      sendResponse(document.documentElement.innerHTML);
      console.log(request.action);
      console.log("-------------------");
      console.log(document.documentElement.innerHTML);
    }

  } else {

    if (request.action == "getPlayer") {
      sendResponse("OMW");
      chrome.extension.sendRequest(tab.id, {action: "fromPlayer", data: content}, function(response) {
        console.log(response);
      });
    }

  }*/




});
