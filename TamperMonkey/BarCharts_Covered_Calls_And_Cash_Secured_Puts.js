// ==UserScript==
// @name         BarCharts Covered Calls / Cash Secured Puts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Want to quickly see what the return would be on these strategies at different strikes.
// @author       You
// @match        https://www.barchart.com/stocks/quotes/*/options*
// @grant        none
// @require http://code.jquery.com/jquery-3.4.1.min.js

// ==/UserScript==

var selector_call_table_rows = '#main-content-column > div > div.bc-options-quotes > div:nth-child(1) > div > div.middleware-wrapper > div:nth-child(1) > div.bc-datatable > div > div > div > ng-transclude > table > tbody > tr';
var selector_call_table_headers = '#main-content-column > div > div.bc-options-quotes > div:nth-child(1) > div > div.middleware-wrapper > div:nth-child(1) > div.bc-datatable > div > div > div > ng-transclude > table > thead > tr'

var selector_put_table_rows = '#main-content-column > div > div.bc-options-quotes > div:nth-child(1) > div > div.middleware-wrapper > div:nth-child(2) > div.bc-datatable > div > div > div > ng-transclude > table > tbody > tr';
var selector_put_table_headers = '#main-content-column > div > div.bc-options-quotes > div:nth-child(1) > div > div.middleware-wrapper > div:nth-child(2) > div.bc-datatable > div > div > div > ng-transclude > table > thead > tr'


function get_float(jQ, selector){
    try{
        return parseFloat(jQ.children(selector).text());
    }
    catch(err){
        console.log("Bad value (float expected) for selector: " + selector + " value: " + jQ.children(selector));
    }
}

function create_new_row_entry(sibling, desired_text){
    var new_row_entry = sibling.clone();
    new_row_entry.text(desired_text);
    new_row_entry[0].style.whiteSpace="pre"; //Line breaks
    new_row_entry.appendTo(sibling.parent());

}

var call_headers_added=false;

function update_call_table(){
    console.log("Updating call table");

    if (!call_headers_added){
        var header_sibling = jQuery(selector_call_table_headers).children('.quick-links');

        create_new_row_entry(header_sibling, "Return % \n(unexercised)");
        create_new_row_entry(header_sibling, "Return % \n(exercised)");
        call_headers_added= true;
    }
    var spot_price = parseFloat(jQuery('#main-content-column > div > div.page-title.symbol-header-info > div.symbol-price-wrapper > div.pricechangerow > span:nth-child(1)').text());

    var table_rows = jQuery(selector_call_table_rows);

    for (var i = 0; i < table_rows.length; i++){
        var jQ = $(table_rows[i]);
        var strike = get_float(jQ, '.strikePrice');
        var premium = get_float(jQ, '.midpoint');

        var row_sibling = jQ.children('.quick-links');

        //Unexercised return
        var percentage_return = (premium/spot_price)*100;
        create_new_row_entry(row_sibling, percentage_return.toFixed(2) + "%");

        //Exercised return
        var difference = spot_price - strike;
        var exercised_return = ((premium + difference)/spot_price) * 100;

        create_new_row_entry(row_sibling, exercised_return.toFixed(2) + "%");
    }
}

var put_headers_added=false;
function update_put_table(){
    console.log("Updating put table");

    if (!put_headers_added){
        var header_sibling = jQuery(selector_put_table_headers).children('.lastPrice');

        create_new_row_entry(header_sibling, "Return %");
        create_new_row_entry(header_sibling, "Downside protection");
        put_headers_added= true;
    }

    var spot_price = parseFloat(jQuery('#main-content-column > div > div.page-title.symbol-header-info > div.symbol-price-wrapper > div.pricechangerow > span:nth-child(1)').text());

    var table_rows = jQuery(selector_put_table_rows);

    for (var i = 0; i < table_rows.length; i++){
        var jQ = $(table_rows[i]);
        var strike = get_float(jQ, '.strikePrice');
        var premium = get_float(jQ, '.midpoint');

        var row_sibling = jQ.children('.quick-links');

        //Return
        var percentage_return = (premium/strike)*100;
        create_new_row_entry(row_sibling, percentage_return.toFixed(2) + "%");

        //Downside protection
        var break_even = spot_price - strike - premium;
        var exercised_return = -1* (1- (break_even/spot_price)) * 100;

        create_new_row_entry(row_sibling, exercised_return.toFixed(2) + "%");
    }



}

function update_tables(){
    update_call_table();
    update_put_table();
}


function set_change_listeners_on_selects(){
    //Table will be reloading data
    $('#main-content-column > div > div.bc-datatable-toolbar.landscape-no-padding.clearfix.invisible.visible > div:nth-child(1) > div > div.clearfix.left.bc-dropdown.filter.expiration-name > select').change(loading_delay);
    $('#main-content-column > div > div.bc-datatable-toolbar.landscape-no-padding.clearfix.invisible.visible > div:nth-child(1) > div > div.bc-dropdown.filter.in-the-money > select').change(loading_delay);

}

var initial_load = true;
function loading_delay(){
    //Terrible hacks because I don't know how to listen for this async loading they have to be done
    if(initial_load){
        if($(selector_call_table_rows).length == 0){
            console.log("Page not loaded yet, sleeping");
            setTimeout(loading_delay, 1000);
        }
        else{
            if(initial_load)
                set_change_listeners_on_selects();

            initial_load=false;
            update_tables();

        }
    }
    else{
        setTimeout(update_tables, 3000);
    }

}

(function() {

    loading_delay();

    //    setTimeout(function(){
    //  }, 5000);

})();