// ==UserScript==
// @name         WSJ Banner Removal
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove an annoying banner
// @author       You
// @match        https://www.wsj.com/amp/articles/*
// @grant        none
// ==/UserScript==

function checkAndHide(){
    //console.log("*****RUNNING");
    var v = document.getElementsByClassName("login-section-container");
    //Banner may not have rendered yet. Retry in 2 seconds if not present.
    if(v.length>0){
        v[0].hidden=true;
    }
    else{
        setTimeout(checkAndHide,2000);
    }

}

(function() {
    'use strict';
    checkAndHide();
})();
