// ==UserScript==
// @name         Yahoo Finance News Banner removal + auto expand article
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Annoying banner stays at the top of the page blocking out some of the article space. I don't want to click to "Read More"
// @author       You
// @match        https://finance.yahoo.com/news/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //Top banner
    document.querySelector("#ybar-inner-wrap").remove();
    //Read More button
    document.getElementsByClassName('caas-button collapse-button')[0].click();
})();
