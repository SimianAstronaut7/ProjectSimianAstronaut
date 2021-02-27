//Useful for quickly testing a piece of code w/o having to manually interact. 
chrome.runtime.onInstalled.addListener(function () {
    // open_all_short_interest_template_bookmarks('gme');

    // pull_short_interest_raw_data("gme");
});

chrome.omnibox.onInputEntered.addListener(function (ticker) {
    open_all_short_interest_template_bookmarks(ticker);
});

function open_all_short_interest_template_bookmarks(ticker){
    var bookmark_template_set = bookmarks_get_matches(/#short_interest_templated/, (the_set)=>{
        for (var s of the_set){
            var url = s.replace(TEMPLATE_REPLACEMENT_STRING, ticker);
            try{
                //Validate URL before passing to Chrome.
                new URL(url);
                create_inactive_tab(url);
            }
            catch(err){
                console.error("Bad url passed via Bookmarks: " + url);
            }
        }
    });
}

function pull_short_interest_raw_data(ticker){
    ticker = ticker.trim();

    var func_chain = create_function_chain(ticker);

    process_function_chain(func_chain, 0, ticker, {});
}

function create_function_chain(ticker){
    var v = [];

    v.push(create_chain_link(chained_webpull, 'http://regsho.finra.org/regsho-Index.html', pull_finra_report_name));
    v.push(create_chain_link(chained_webpull, 'https://www.finra.org/filing-reporting/regulatory-filing-systems/short-interest#overview', pull_finra_next_report_date));
    v.push(create_chain_link(chained_webpull, 'https://fintel.io/ss/us/' + ticker, pull_fintel));
    //TODO: Work in ETF indirect shorting
    //v.push(create_chain_link(chained_webpull, 'https://www.etf.com/stock/'+ ticker, pull_etfs));

    //TODO: Marketbeat and iBorrow are dynamic sites. Require maybe creating a new tab + interacting w/ + removing once data pulled?
    // v.push(create_link('https://iborrowdesk.com/report/' + ticker, pull_iborrow));
    return v;
}

function create_chain_link(retrieval_func, url,  process_func){
    
    return {'retrieval_func': retrieval_func, // Expected to have the format f(url, processing_func)
            'url': url, 
            'process_func':process_func};  // f(web_page, func_chain, index, ticker, data_dict)
}

function process_function_chain(func_chain, index, ticker, data_dict){
    if(func_chain.length <= index){
        console.log("Completed chain processing");
        return;
    }

    var chain_link = func_chain[index];
    
    chain_link.retrieval_func(chain_link.url, func_chain, index, ticker, data_dict);
}
