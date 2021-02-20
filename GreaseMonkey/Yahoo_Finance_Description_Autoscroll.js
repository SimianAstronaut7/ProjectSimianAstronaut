// ==UserScript==
// @name         Yahoo Finance Descriptions
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  We are interested in the "Description" portion of the page which occurs toward the middle. Saves on scrolling. 
// @author       You
// @match        https://finance.yahoo.com/quote/*/profile?p=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // A hacky way based on approximate pixels down to go
    //window.scroll(0,1400);

    // More reliant on the page structure not changing, but nicer!
    const description_header = document.querySelector("#Col1-0-Profile-Proxy > section > section.quote-sub-section.Mt\\(30px\\) > h2 > span");
    description_header.scrollIntoView();
    
})();
