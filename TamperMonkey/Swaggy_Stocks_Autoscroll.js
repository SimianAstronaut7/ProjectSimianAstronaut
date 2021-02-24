// ==UserScript==
// @name         Swaggy Stocks Ticker Sentiment Autoscroll
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Scroll the graph into the center of the view
// @author       You
// @match        https://swaggystocks.com/dashboard/wallstreetbets/ticker-sentiment/*
// @grant        none
// ==/UserScript==

(function() {

    // Kind of hacky, but unclear how to check when the graph is done rendering. Just give it 1.5 seconds, then scroll.
    setTimeout(function(){
        const description_header = document.querySelector("#root > div > div > div.main-view > div > div.economic-table-container.chart-a-container > div > canvas");
        description_header.scrollIntoView();
    }, 1500);

})();