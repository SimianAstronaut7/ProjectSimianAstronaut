// ==UserScript==
// @name         Bloomberg Banner Removal
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove an annoying banner
// @author       You
// @match        https://www.bloomberg.com/news/articles/*
// @grant        none
// ==/UserScript==

function checkAndHide(){
    //console.log("*****RUNNING");
    var v = document.getElementById("banner-container");
    //Banner may not have rendered yet. Retry in 2 seconds if not present.
    if(v){
        v.hidden=true;
    }
    else{
        setTimeout(checkAndHide,2000);
    }

}

(function() {
    'use strict';
    checkAndHide();
    console.log("Ran Bloomberg script");
})();
