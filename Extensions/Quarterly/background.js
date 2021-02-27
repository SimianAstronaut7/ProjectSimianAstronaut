function get_quarterly_bookmarks() {
    bookmarks_get_matches(/#quarterly_generic/, (the_set) => {
        console.log(the_set);

    });
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