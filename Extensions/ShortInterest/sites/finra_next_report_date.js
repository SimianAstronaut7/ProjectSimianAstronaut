function pull_finra_next_report_date(web_page, func_chain, index, ticker, data_dict){
    //This could be cached. Doesn't seem to update very often
    var table_body = web_page.querySelector("#overview > div > div > div > div > div > table > tbody");
    data_dict['next_report_due'] = find_nearest_report_date(table_body);

    process_function_chain(func_chain, index+1, ticker, data_dict);
}

function find_nearest_report_date(table_body){
    var all_dates = convert_to_dates(table_body);

    var today = new Date();

    //List is in ascending order. First date > today is what we want.
    for (const date of all_dates) {
        if(date >= today){
            return date;
        }
    }
}

const monthNames = ["one-based-offset", "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
];

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