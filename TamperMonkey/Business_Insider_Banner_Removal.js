// ==UserScript==
// @name         Business Insider Banner removal
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Annoying fixed position banner taking up valuable real estate.
// @author       You
// @match        https://*.businessinsider.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementsByTagName('header')[0].remove();
})();
