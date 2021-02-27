function pull_market_beat(web_page, ticker){
    //They also dynamically load table. Not coming back...
    var short_as_percent_of_float = web_page.querySelector("#cphPrimaryContent_tabShortInterest > div:nth-child(3) > div.col-md-6.col-lg-5 > table > tbody > tr:nth-child(9) > td:nth-child(2)").text;
    //TODO: They have a history of the short interests

    standard_webpull('https://www.finra.org/filing-reporting/regulatory-filing-systems/short-interest#overview', ticker, pull_finra_next_report_date);
}