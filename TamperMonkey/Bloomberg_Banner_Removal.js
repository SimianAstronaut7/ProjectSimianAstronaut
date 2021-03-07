// ==UserScript==
// @name         Bloomberg Banner Removal
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove several annoying banners
// @author       You
// @match        https://www.bloomberg.com/news/articles/*
// @grant        none
// ==/UserScript==
var top_banner=false;
var overlay =false;
function checkAndHide(){
    //console.log("*****RUNNING");
    var v = document.getElementById("banner-container");
    var subscribe_overlay= document.querySelector("#newsletter-modal > div > div.header__400271f0 > div > button");
    //Banner may not have rendered yet. Retry in 2 seconds if not present.
    if(v){
        v.hidden=true;
        top_banner = true
    }
    if (subscribe_overlay){
        subscribe_overlay.click();
        overlay=true;
    }

    if(top_banner && overlay){
        return;
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
