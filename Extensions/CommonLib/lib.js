/**
 * 
 * @param {*} set - Object of interest. Accumulates URLs we are interested in.
 * @param {*} regex 
 * @param {*} arr 
 * @param {*} parent_had_tag 
 */
function _bookmark_search(set, regex, arr, parent_had_tag) {
    if (!arr) {
        return;
    }
    for (var i = 0; i < arr.length; i++) {

        if (regex.test(arr[i].title) || parent_had_tag) {
            // A url with the desired tag
            if ('url' in arr[i]) {
                set.add(arr[i].url);
            }
            else {
                // A folder that has the desired tag. Expand it to add all child bookmarks
                _bookmark_search(set, regex, arr[i].children, true);
            }
        }
        else {
            // A non-matching folder. Expand it to see if any of its children match. 
            _bookmark_search(set, regex, arr[i].children, false);
        }
    }
}

/**
 * Will search the 'title' of every bookmark in the bookmark tree
 * 
 * @param {*} search_regex - Example: /#quarterly/
 * @param {*} bookmark_processing_func - Callback that should have the signature: f(the_set){....}
 */
function bookmarks_get_matches(search_regex, bookmark_processing_func) {
    chrome.bookmarks.getTree(function (results) {
        var set = new Set();

        _bookmark_search(set, search_regex, results, false);

        bookmark_processing_func(set);
    });
}

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