function click() {
  allowRunning = true;
  run();
}

function resetCounter() {
  chrome.storage.local.set({"current": "0"}, function() { });
}


var allowRunning = false;
function run() {
  // Get Current URL Number
  chrome.storage.local.get(["current"], function(result) {
    var currentURLN = 0;
    if (result.current == null) {
      chrome.storage.local.set({"current": "0"}, function() { });
    } else {
      currentURLN = parseInt(result.current);
    }
    var currentURL = "https://www.khanacademy.org" + urls[currentURLN].ref.replace("&amp;open=1", "");
    chrome.tabs.update({
      url: currentURL
    });


    setTimeout(function() {
      allowRunning = true;
    }, 10000);

    setTimeout(function() {
      if (!(publicProg > 0.02))
      allowRunning = false;
      run();
    }, 30000);

  });
}
function tryRunning() {
  if (allowRunning) {
    if (ended) {
      // Increment and Rerun
      chrome.storage.local.get(["current"], function(result) {
        var currentURLN = parseInt(result.current);
        currentURLN += 1;
        chrome.storage.local.set({"current": currentURLN}, function() {
          run();
        });
      });
      allowRunning = false;
    }
  }
}

document.getElementById('go').onclick = click;
document.getElementById('reset').onclick = resetCounter;





var publicProg = 0;
var ended = false;
function checkEnded() {
  try {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendRequest(tab.id, {action: "getPlayer"}, function(response) {
        var progC = response.split(',');
        var prog = parseFloat(progC[0])/parseFloat(progC[1]);
        publicProg = prog;
        if (prog > 0.996) {
          console.log('video complete');
          ended = true;
        } else {
          ended = false;
          console.log('not done');
        }
      });
    });
  } catch(e) {
    ended = false;
    console.log(e)
  }
  tryRunning();
  setTimeout(checkEnded, 1000);
}
checkEnded();



















let urls = [{name:"The social contract(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/ideals-of-democracy/v/thomas-hobbes-and-social-contract?modal=1&amp;open=1"}, {name:"Democratic ideals of US government(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/ideals-of-democracy/v/democratic-ideals-of-us-government?modal=1&amp;open=1"}, {name:"The ideas at the heart of US government(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/ideals-of-democracy/a/the-ideas-at-the-heart-of-us-government?modal=1&amp;open=1"}, {name:"Democratic ideals in the Declaration of Independence(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/ideals-of-democracy/v/democratic-ideals-in-the-declaration-of-independence?modal=1&amp;open=1"}, {name:"Democratic ideals in the Declaration of Independence and the Constitution(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/ideals-of-democracy/a/democratic-ideals-in-the-declaration-of-independence-and-the-constitution?modal=1&amp;open=1"}, {name:"The Declaration of Independence(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/ideals-of-democracy/a/the-declaration-of-independence?modal=1&amp;open=1"}, {name:"Democratic ideals in the Preamble to the US Constitution(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/ideals-of-democracy/v/democratic-ideals-in-the-preamble-of-the-us-constitution?modal=1&amp;open=1"}, {name:"The Preamble to the Constitution(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/ideals-of-democracy/v/preamble?modal=1&amp;open=1"}, {name:"Ideals of democracy: lesson overview(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/ideals-of-democracy/a/ideals-of-democracy-lesson-overview?modal=1&amp;open=1"}, {name:"Introduction to democracy and its variations(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/types-of-democracy/v/introduction-to-democracy-and-its-broad-variations?modal=1&amp;open=1"}, {name:"Types of democracy(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/types-of-democracy/a/types-of-democracy?modal=1&amp;open=1"}, {name:"Types of democracy: lesson overview(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/types-of-democracy/a/types-of-democracy-lesson-overview?modal=1&amp;open=1"}, {name:"The Articles of Confederation and Shays' Rebellion(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/challenges-of-the-articles-of-confederation/v/the-articles-of-confederation-and-shays-rebellion?modal=1&amp;open=1"}, {name:"Challenges of the Articles of Confederation(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/challenges-of-the-articles-of-confederation/a/challenges-of-the-articles-of-confederation-article?modal=1&amp;open=1"}, {name:"The Articles of Confederation(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/challenges-of-the-articles-of-confederation/a/the-articles-of-confederation?modal=1&amp;open=1"}, {name:"Challenges of the Articles of Confederation: lesson overview(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/challenges-of-the-articles-of-confederation/a/challenges-of-the-articles-of-confederation-lesson-overview?modal=1&amp;open=1"}, {name:"Federalist No. 10 (part 1)(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/government-power-and-individual-rights/v/federalist-papers-10-part-1?modal=1&amp;open=1"}, {name:"Federalist No. 10 (part 2)(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/government-power-and-individual-rights/v/federalist-papers-10-part-2?modal=1&amp;open=1"}, {name:"Federalist No. 10(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/government-power-and-individual-rights/a/federalist-no-10?modal=1&amp;open=1"}, {name:"Anti-Federalists and Brutus No. 1(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/government-power-and-individual-rights/v/anti-federalists-and-brutus-i?modal=1&amp;open=1"}, {name:"Brutus No. 1(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/government-power-and-individual-rights/a/brutus-no-1?modal=1&amp;open=1"}, {name:"Government power and individual rights: lesson overview(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/government-power-and-individual-rights/a/government-power-and-individual-rights-lesson-overview?modal=1&amp;open=1"}, {name:"The Constitutional Convention(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/ratification-of-the-us-constitution/v/the-constitutional-convention?modal=1&amp;open=1"}, {name:"Constitutional compromises: The Electoral College(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/ratification-of-the-us-constitution/v/constitutional-compromises-the-electoral-college?modal=1&amp;open=1"}, {name:"Constitutional compromises: The Three-Fifths Compromise(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/ratification-of-the-us-constitution/v/constitutional-compromises-the-three-fifths-compromise?modal=1&amp;open=1"}, {name:"The impact of constitutional compromises on us today(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/ratification-of-the-us-constitution/v/impact-of-constitutional-compromise-on-us-today?modal=1&amp;open=1"}, {name:"The Constitution of the United States(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/ratification-of-the-us-constitution/a/us-constitution?modal=1&amp;open=1"}, {name:"Article V and the amendment process(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/ratification-of-the-us-constitution/a/article-v-and-the-amendment-process?modal=1&amp;open=1"}, {name:"Article V of the Constitution(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/ratification-of-the-us-constitution/v/article-v-of-the-constitution?modal=1&amp;open=1"}, {name:"Article VI of the Constitution(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/ratification-of-the-us-constitution/v/article-vi-of-the-constitution?modal=1&amp;open=1"}, {name:"Article VII of the Constitution(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/ratification-of-the-us-constitution/v/article-vii-of-the-constitution?modal=1&amp;open=1"}, {name:"Ratification of the US Constitution: lesson overview(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/ratification-of-the-us-constitution/a/ratification-of-the-us-constitution-lesson-overview?modal=1&amp;open=1"}, {name:"Separation of powers and checks and balances(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/principles-of-american-government/v/separation-of-powers-and-checks-and-balances?modal=1&amp;open=1"}, {name:"Principles of American government(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/principles-of-american-government/a/principles-of-american-government-article?modal=1&amp;open=1"}, {name:"Federalist No. 51(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/principles-of-american-government/a/federalist-no-51?modal=1&amp;open=1"}, {name:"Multiple points of influence due to separation of powers and checks and balances(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/principles-of-american-government/v/multiple-points-of-influence-due-to-separation-of-powers-and-checks-and-balances?modal=1&amp;open=1"}, {name:"Impeachment(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/principles-of-american-government/v/impeachment?modal=1&amp;open=1"}, {name:"Principles of American government: lesson overview(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/principles-of-american-government/a/principles-of-american-government-lesson-overview?modal=1&amp;open=1"}, {name:"Federalism in the United States(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/relationship-between-states-and-the-federal-government/v/federalism-in-the-united-states?modal=1&amp;open=1"}, {name:"Categorical grants, mandates, and the Commerce Clause(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/relationship-between-states-and-the-federal-government/v/categorical-grants-mandates-and-the-commerce-clause?modal=1&amp;open=1"}, {name:"Article IV of the Constitution(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/relationship-between-states-and-the-federal-government/v/article-iv-of-the-constitution?modal=1&amp;open=1"}, {name:"The relationship between the states and the federal government(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/relationship-between-states-and-the-federal-government/a/relationship-between-the-states-and-the-federal-government-article?modal=1&amp;open=1"}, {name:"The relationship between the states and the federal government: lesson overview(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/relationship-between-states-and-the-federal-government/a/relationship-between-the-states-and-the-federal-government-lesson-overview?modal=1&amp;open=1"}, {name:"Federal and state powers and the Tenth and Fourteenth Amendments(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/constitutional-interpretations-of-federalism/v/federal-and-state-powers-and-the-10th-and-14th-amendments?modal=1&amp;open=1"}, {name:"The Tenth Amendment(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/constitutional-interpretations-of-federalism/v/the-tenth-amendment?modal=1&amp;open=1"}, {name:"Enumerated and implied powers of the US federal government(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/constitutional-interpretations-of-federalism/v/enumerated-and-implied-powers-of-the-us-federal-government?modal=1&amp;open=1"}, {name:"McCulloch v. Maryland - case facts(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/constitutional-interpretations-of-federalism/v/mcculloch-vs-maryland?modal=1&amp;open=1"}, {name:"McCulloch v. Maryland(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/constitutional-interpretations-of-federalism/v/mcculloch-v-maryland?modal=1&amp;open=1"}, {name:"McCulloch v. Maryland (1819)(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/constitutional-interpretations-of-federalism/a/mcculloch-v-maryland-1819?modal=1&amp;open=1"}, {name:"United States v. Lopez(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/constitutional-interpretations-of-federalism/v/unites-states-v-lopez?modal=1&amp;open=1"}, {name:"US v. Lopez (1995)(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/constitutional-interpretations-of-federalism/a/us-v-lopez-1995?modal=1&amp;open=1"}, {name:"Constitutional interpretations of federalism: lesson overview(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/constitutional-interpretations-of-federalism/a/constitutional-interpretations-of-federalism-lesson-overview?modal=1&amp;open=1"}, {name:"Introduction to the public policy process(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/federalism-in-action/v/introduction-to-the-public-policy-process?modal=1&amp;open=1"}, {name:"Foundations of American democracy: unit review(Opens a modal)", ref:"/humanities/ap-us-government-and-politics/foundations-of-american-democracy/federalism-in-action/a/unit-1-review?modal=1&amp;open=1"}]
