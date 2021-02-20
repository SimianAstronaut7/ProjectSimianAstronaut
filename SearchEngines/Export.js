(function exportSEs() {
  /* Auxiliary function to download a file with the exported data */
  function downloadData(filename, data) {
    const file = new File([data], { type: 'text/json' });
    const elem = document.createElement('a');
    elem.href = URL.createObjectURL(file);
    elem.download = filename;
    elem.click();
  }

  let searchEngines = [];
  document.querySelector('settings-ui').shadowRoot
    .querySelector('settings-main').shadowRoot
    .querySelector('settings-basic-page').shadowRoot
    .querySelector('settings-search-page').shadowRoot
    .querySelector('settings-search-engines-page').shadowRoot
    .querySelector('settings-search-engines-list#otherEngines').shadowRoot
    .querySelectorAll('settings-search-engine-entry')
    .forEach($el => searchEngines.push(
      {
        name: $el.shadowRoot.querySelector('#name-column').textContent,
        keyword: $el.shadowRoot.querySelector('#keyword-column').textContent,
        url: $el.shadowRoot.querySelector('#url-column').textContent
      })
    )

  downloadData('search_engines.json', JSON.stringify(searchEngines));
}());
