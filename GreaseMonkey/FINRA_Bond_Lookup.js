// ==UserScript==
// @name         Bond Lookup
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  The FINRA morningstar page does not have a simple way to provide the desired ticker. We will use Chrome's Search Engines feature to create a Search Engine that takes a ticker, add its on to the query string, this
// script will pull it out/place it in the input field/submit the search
// @author       You
// @match        https://finra-markets.morningstar.com/BondCenter/Default.jsp*
// @grant        none

// ==/UserScript==

(function() {
    'use strict';
    // Select the Search taab
    const search_tab= document.querySelector("#TabContainer > div > div.rtq-tab-wrap > div.rtq-tab-menus-wrap > ul > li:nth-child(3) > a");
    search_tab.click();

    // Insert the Ticker
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ticker=urlParams.get('q');
    const input_field = document.querySelector("#firscreener-cusip");
    input_field.value = ticker;

    // Submit search
    const submit_button = document.querySelector("#ms-finra-advanced-search-form > div.ms-finra-advanced-search-btn > input:nth-child(2)").click();
    submit_button.click();


})();
