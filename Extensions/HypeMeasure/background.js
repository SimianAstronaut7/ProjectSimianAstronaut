var sites = ['alexa', 'google_trends', 'similiar_web', 'swaggy_stocks'];
var test = "works";


chrome.runtime.onInstalled.addListener(function () {
    create_inactive_tab('https://swaggystocks.com/dashboard/wallstreetbets/ticker-sentiment', (tab)=>{
        chrome.tabs.executeScript(tab.id, {
            code: 'document.body.style.backgroundColor="red"'
        });
    });
});


chrome.omnibox.onInputEntered.addListener(function (ticker) {
    get_ticker_hype(ticker);
});

function get_ticker_hype(ticker){
    ticker = ticker.trim();

    translate_ticker_to_url(ticker, open_tabs_based_on_url_company_name);
}

function translate_ticker_to_url(ticker, successFunc){
    $.ajax({
        type: "GET",
        url: 'https://finance.yahoo.com/quote/'+ ticker +'/profile',
        crossDomain: true,
        dataType: "html",
        success: function (web_page) {
            
            var doc = $(web_page);

            var site_link = doc.find("#Col1-0-Profile-Proxy > section > div.asset-profile-container > div > div > p > a:nth-child(6)");
            var url = site_link.text();
            
            var company_name = doc.find('#Col1-0-Profile-Proxy > section > div.asset-profile-container > div > h3').text();

            successFunc(ticker, url, company_name);
        },
        error: function (e) {
            alert("error");
        }
    });
}

function open_tabs_based_on_url_company_name(ticker, url, company_name){
    try{
        url = new URL(url);
    }
    catch(err){
        alert("Cannot find this ticker on Yahoo Finance" + err);
        return;
    }

    create_inactive_tab('https://trends.google.com/trends/explore?q=' + ticker + '&geo=US'); //gme
    create_inactive_tab('https://trends.google.com/trends/explore?q=' + company_name  + '&geo=US'); //gamestop
    create_inactive_tab('https://trends.google.com/trends/explore?q=' + url.host + '&geo=US'); // www.gamestop.com
    
    var removed_www = url.host.slice(4);
    create_inactive_tab('https://trends.google.com/trends/explore?q=' + removed_www  + '&geo=US');// gamestop.com (trends shows different results for www prefixed term)
    create_inactive_tab('https://www.alexa.com/siteinfo/' + removed_www);
    create_inactive_tab('https://www.similarweb.com/website/' + removed_www +'/#overview');

    create_inactive_tab('https://swaggystocks.com/dashboard/wallstreetbets/ticker-sentiment/' + ticker);
    
}


function create_inactive_tab(url) {
    create_inactive_tab(url, (tab)=> {});
}


function create_inactive_tab(url, success_func) {
    chrome.tabs.create({
        "url": url,
        "active": false
    },
    success_func
    );
}