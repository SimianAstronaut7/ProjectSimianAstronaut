let page = document.getElementById('siteSelectionDiv');

function constructOptions(sites) {
  chrome.storage.sync.get(null, function (data) {

    for (let site of sites) {
      constructOption(data, site, page);
    }
  }
  )
}


function constructOption(data, site, page) {
  let input = document.createElement('input');
  input.value = site;
  input.type= 'checkbox';
  //These may not be necessary.
  input.name = site;
  input.id = site;

  if (site in data){
    //We may not have defined the variable in the Chrome storage yet.
    //If we have use it.
    input.checked = data[site];
  }
  else{
    input.checked = false;
  }
  

  let label = document.createElement('label');
  label.for = site;
  label.textContent = site;


  // input.addEventListener('click', function () {
  //   console.log("Rec click");
  //   chrome.storage.sync.set({ site: event.target.checked },
  //     () => { })
  // });


  input.addEventListener('change', function () {
    console.log("Rec click");
    chrome.storage.sync.set({ site: event.target.checked },
      () => { })
  });

  page.appendChild(input);
  page.appendChild(label);
}

var bp = chrome.extension.getBackgroundPage();
constructOptions(bp.sites);