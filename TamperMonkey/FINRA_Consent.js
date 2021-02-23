// ==UserScript==
// @name         Accept FINRA Consent Form
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  When adding FINRA lookup as a "Search Engine" in Chrome you get prompted for a user acceptance. This bypasses that. 
// @author       You
// @match        https://finra-markets.morningstar.com/BondCenter/UserAgreement.jsp
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const consent_button = document.querySelector("#ms-agreement > input");

    if (consent_button){
        consent_button.click();
    }
})();
