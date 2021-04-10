// ==UserScript==
// @name         StackOverflow
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove Cookie acceptance message + bottom "Join via Facebook, Twitter,etc" banner
// @author       You
// @match        https://stackoverflow.com/questions/*
// @grant        none
// ==/UserScript==

function SafeRemoval(e) {
    if (e.length > 0) {
        e[0].remove();
    }
}

(function () {
    'use strict';
    SafeRemoval(document.getElementsByClassName("js-consent-banner"));
    SafeRemoval(document.getElementsByClassName("js-dismissable-hero"));
})();