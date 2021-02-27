
chrome.runtime.onInstalled.addListener(function () {
//Useful for quickly testing a piece of code w/o having to manually interact. 

    // open_all_short_interest_template_bookmarks();

    pull_short_interest_raw_data("gme");
});

chrome.omnibox.onInputEntered.addListener(function (ticker) {
    pull_short_interest_raw_data(ticker);
});

function open_all_short_interest_template_bookmarks(){
    var bookmark_template_set = bookmarks_get_matches(/#quarterly/);
    console.log(v);
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
    // v.push(create_link('https://www.marketbeat.com/stocks/NYSE/'+ ticker +'/short-interest/', pull_market_beat));
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
