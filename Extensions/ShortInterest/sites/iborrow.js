//Dynamic loading of table. Doesn't come back w/ website. 
function pull_iborrow(web_page, ticker){
    var r = iborrow_get_row(web_page, 1);
    console.log(iborrow_row_to_string(r));

    // standard_webpull('https://www.marketbeat.com/stocks/NYSE/'+ ticker +'/short-interest/', ticker, pull_market_beat);
}

function iborrow_row_to_string(r){
    return r.children[0] + " " + r.children[1] + " " + r.children[2] + " ";
}

function iborrow_get_row(web_page, i){
    //1-based counting
    return web_page.querySelector("body > div > div > div:nth-child(1) > div > div:nth-child(2) > div.col-md-4.col-md-offset-4 > div > table > tbody > tr:nth-child(" + i + ")");
}