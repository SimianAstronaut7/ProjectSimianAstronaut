/**
 * 
 * @param {*} set - Object of interest. Accumulates URLs we are interested in.
 * @param {*} regex 
 * @param {*} arr 
 * @param {*} parent_had_tag 
 */
function f(set, regex, arr, parent_had_tag){
        if(! arr){
            return;
        }
        for (var i=0; i< arr.length; i++){

            if(regex.test(arr[i].title) || parent_had_tag){
                // A url with the desired tag
                if('url' in arr[i]){
                    set.add(arr[i].url);
                }
                else{
                    // A folder that has the desired tag. Expand it to add all child bookmarks
                    f(set, regex, arr[i].children, true);
                }
            }
            else{
                // A non-matching folder. Expand it to see if any of its children match. 
                f(set, regex, arr[i].children, false);
            }
        }
}

function get_quarterly_bookmarks() {
    chrome.bookmarks.getTree(function(results){
        var set = new Set();
        var regex = new RegExp(/#quarterly/)
        
        f(set, regex, results, false);

        console.log(set);

    }

    );
}



chrome.runtime.onInstalled.addListener(function () {
    //Useful for quickly testing a piece of code w/o having to manually interact. 

    //TODO: 
    //WhaleWisdom tells when the next filing deadline is.
    // #f-filing > div > div > div.col-xs-12.col-sm-12.col-md-10.col-md-offset-1 > h4
    // Track last date this was checked. Give alert message updates on upcoming filings

    //TODO: Individual company tracking (see most recent Quarter filings + transcript)

    //TODO: Daily: Company news, press releases (google search), tie into Feed or monitor site?

    get_quarterly_bookmarks();


});


chrome.omnibox.onInputEntered.addListener(function (ticker) {
    get_quarterly_bookmarks();
});


function create_inactive_tab(url) {
    create_inactive_tab(url, (tab) => { });
}


function create_inactive_tab(url, success_func) {
    chrome.tabs.create({
        "url": url,
        "active": false
    },
        success_func
    );
}