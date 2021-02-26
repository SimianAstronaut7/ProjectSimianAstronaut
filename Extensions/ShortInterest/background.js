
chrome.runtime.onInstalled.addListener(function () {
//Useful for quickly testing a piece of code w/o having to manually interact. 
get_short_interest("gme");
});


chrome.omnibox.onInputEntered.addListener(function (ticker) {
    get_short_interest(ticker);
});

function get_short_interest(ticker){
    ticker = ticker.trim();
    // get_finra_report(ticker);
    standard_webpull('http://regsho.finra.org/regsho-Index.html', ticker, get_finra_report_name)

}
var finra_report_name = "";
var finra_report_data = "";

function get_finra_report_name(web_page, ticker){
    
    var latest_daily_report = web_page.querySelector("body > ul:nth-child(14) > li:nth-child(1) > a");

    finra_report_name = latest_daily_report.text;

    webcall_txt(latest_daily_report.href, ticker, get_finra_data);
}

function get_finra_data(txt_report, ticker){
    
    var lines = txt_report.split('\n');
    var i = 0;
    var upper_case_ticker = ticker.toUpperCase();
    for(; i< lines.length; i++){
        if (lines[i].search(upper_case_ticker) != -1){
            break;
        }
    }
    finra_report_data = lines[0] + '\n' + lines[i];

    console.log(finra_report_name);
    console.log(finra_report_data);

    standard_webpull("https://fintel.io/ss/us/"+ticker, ticker, pull_fintel);
}


function standard_webpull(url, ticker, success_func){
    
    var xhttp = new XMLHttpRequest();
    xhttp.responseType='document';
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           success_func(xhttp.responseXML, ticker);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function webcall_txt(url, ticker, success_func){
    var xhttp = new XMLHttpRequest();
    xhttp.responseType='text';
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           success_func(xhttp.responseText, ticker);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function pull_fintel(web_page, ticker){
 
    var last_update_time = web_page.querySelector("#topic-table-body > tbody > tr:nth-child(1) > td:nth-child(2) > nobr").text;
    var shares_available = web_page.querySelector("#topic-table-body > tbody > tr:nth-child(1) > td.text-right").textContent;

    // standard_webpull('https://iborrowdesk.com/report/' + ticker, ticker, pull_iborrow);
    standard_webpull('https://www.marketbeat.com/stocks/NYSE/'+ ticker +'/short-interest/', ticker, pull_market_beat);
}

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

function pull_market_beat(web_page, ticker){
    //They also dynamically load table. Not coming back...
    var short_as_percent_of_float = web_page.querySelector("#cphPrimaryContent_tabShortInterest > div:nth-child(3) > div.col-md-6.col-lg-5 > table > tbody > tr:nth-child(9) > td:nth-child(2)").text;
    //TODO: They have a history of the short interests

    standard_webpull('https://www.finra.org/filing-reporting/regulatory-filing-systems/short-interest#overview', ticker, pull_finra_next_report_date);
}

const monthNames = ["one-based-offset", "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december"
];

function pull_finra_next_report_date(web_page, ticker){
    //This could be cached. Doesn't seem to update very often
    var table_body = web_page.querySelector("#overview > div > div > div > div > div > table > tbody");
    var next_report_due = find_nearest_report_date(table_body);

}

function  find_nearest_report_date(table_body){
    var all_dates = convert_to_dates(table_body);

    var today = new Date();

    //List is in ascending order. First date > today is what we want.
    for (const date of all_dates) {
        if(today >= date){
            return date;
        }
    }
    }

function convert_to_dates(table_body){
    //Each table row is composed of 3 TDs. The final one is the Report release date
    
    var list = [];
    var current_year = (new Date()).getFullYear();
    
    for(var i = 0; i< table_body.children.length; i++){
        var the_date_str = table_body.children[i].children[2].textContent.trim().split("\t")[0].toLowerCase();
        // In the format "January 15"
        var split = the_date_str.split(" ");
        var month_number = -1;
        for(var j = 0; j< monthNames.length; j++){
            if (monthNames[j] == split[0]){
                month_number=j;
                break;
            }
        }

        //Slice needed to remove \n character.
        list.push(new Date(month_number + "-" +split[1].slice(0,-1) + "-" + current_year));
    }

    return list.sort((a,b)=> a-b); //Ascending sort
  
}