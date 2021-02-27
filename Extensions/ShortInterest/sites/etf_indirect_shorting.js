function pull_etfs(web_page, func_chain, index, ticker, data_dict){
    var tr = web_page.querySelector("#topETFHolders > table > tbody");

    // https://www.etf.com/XRT  gives "Issuer". From there issuer seems to be required to host an up to date (https://www.ssga.com/us/en/institutional/etfs/funds/spdr-sp-retail-etf-xrt)
    process_function_chain(func_chain, index+1, ticker, data_dict);
}
