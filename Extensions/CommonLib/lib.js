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
 * @returns   set - All bookmarks matching the search
 */
function get_quarterly_bookmarks(search_regex) {
    chrome.bookmarks.getTree(function (results) {
        var set = new Set();
        var regex = new RegExp(search_regex);

        _bookmark_search(set, regex, results, false);

        console.log(set);
        return set;
    });
}
