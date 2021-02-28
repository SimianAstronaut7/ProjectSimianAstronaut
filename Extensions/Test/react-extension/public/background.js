//Useful for quickly testing a piece of code w/o having to manually interact. 
chrome.runtime.onInstalled.addListener(function () {
    // open_all_short_interest_template_bookmarks('gme');

    chrome.tabs.create({
        "url": "index.html",
        "active": true
    },
        (tab)=>{
          console.log(tab);
        }
    );

});

