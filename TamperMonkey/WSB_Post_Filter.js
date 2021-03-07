// ==UserScript==
// @name         Filter out GME death cult posts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  The "DD" being put out is terrible. I want to be able to toggle ignoring it so it doesn't drown out good ideas.
// @author       You
// @match        https://new.reddit.com/r/wallstreetbets/search?sort=new&restrict_sr=on&q=flair%3ADD
// @grant        none
// ==/UserScript==

var terms_to_filter_by =['gme', 'gamestop', 'hedgies']

function post_is_GME(post_ele){
    var title = post_ele.textContent.toLowerCase();
    for (let term of terms_to_filter_by){
        if(title.includes(term)){
            return true;}
    }

    return false;

}

(function() {
    'use strict';
    //Pretty lazy. Not sure how to tell when scrolling has loaded new posts. Just poll every 2 seconds removing GME.
    setInterval(()=> {
        var posts = document.querySelector("#SHORTCUT_FOCUSABLE_DIV > div:nth-child(4) > div > div > div > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(4)").children;

        for (var p of posts){
            if(post_is_GME(p)){
                p.remove();
            }
        }
    },
               2000);
    
    
})();