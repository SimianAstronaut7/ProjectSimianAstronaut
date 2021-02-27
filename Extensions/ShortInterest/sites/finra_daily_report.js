
function pull_finra_report_name(web_page, func_chain, index, ticker, data_dict){
    
    var latest_daily_report = web_page.querySelector("body > ul:nth-child(14) > li:nth-child(1) > a");

    data_dict['finra_report_name'] = latest_daily_report.text;

    webcall_txt(latest_daily_report.href, (txt_page)=>{
        data_dict['finra_daily_report'] = pull_finra_data(txt_page, ticker, data_dict);
        process_function_chain(func_chain, index+1, ticker, data_dict);
    });
}

function pull_finra_data(txt_report, ticker, data_dict){
    
    var lines = txt_report.split('\n');
    var i = 0;
    var upper_case_ticker = ticker.toUpperCase();
    for(; i< lines.length; i++){
        if (lines[i].search(upper_case_ticker) != -1){
            break;
        }
    }
    return lines[0] + '\n' + lines[i];
}