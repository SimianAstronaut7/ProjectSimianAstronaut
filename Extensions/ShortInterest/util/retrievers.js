/**
 * Pulls a WebPage
 * @param {*} url 
 * @param {*} success_func 
 */
function standard_webpull(url, success_func){
    var xhttp = new XMLHttpRequest();
    xhttp.responseType='document';
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            success_func(xhttp.responseXML);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

/**
 * Uses our function call chain to move onto the next call in the chain on completion. 
 *    Expected to pass control + context via the final command invoking `process_function_chain(func_chain, index+1, ticker, data_dict);`
 * @param {*} url 
 * @param {*} func_chain 
 * @param {*} index 
 * @param {*} ticker 
 * @param {*} data_dict 
 */
function chained_webpull(url, func_chain, index, ticker, data_dict){
    standard_webpull(url, (web_page)=>{
        console.log(func_chain);
        var f = func_chain[index];
        f.process_func(web_page, func_chain, index, ticker, data_dict);
    });
}

/**
 * Pulls a TEXT file
 * @param {*} url 
 * @param {*} success_func 
 */
function webcall_txt(url, success_func){
    var xhttp = new XMLHttpRequest();
    xhttp.responseType='text';
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           success_func(xhttp.responseText);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}