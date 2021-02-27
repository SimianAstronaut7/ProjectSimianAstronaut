function pull_fintel(web_page, func_chain, index, ticker, data_dict){

    data_dict['fintel_shares_available_last_update_time'] = web_page.querySelector("#topic-table-body > tbody > tr:nth-child(1) > td:nth-child(2) > nobr").textContent;
    data_dict['fintel_shares_available_total'] = web_page.querySelector("#topic-table-body > tbody > tr:nth-child(1) > td.text-right").textContent;

    data_dict['fintel_short_borrow_last_update_time'] = web_page.querySelector("#topic-table-body > tbody > tr:nth-child(1) > td:nth-child(2) > nobr").textContent;
    data_dict['fintel_short_borrow_rate'] = web_page.querySelector("#topic-table-body > tbody > tr:nth-child(1) > td.text-right").textContent;

    process_function_chain(func_chain, index+1, ticker, data_dict);
}