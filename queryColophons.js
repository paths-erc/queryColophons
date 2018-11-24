/* jshint esversion: 6 */

/**
 * Gets from GitHub complete list of available colophons
 * @param  {Function} loading Function to run while loading data
 * @return {Array}         Array of folophons and their texts
 */
 /* jshint ignore:start */
async function getAllColophons(loading){

  loading();

  const index = 'https://api.github.com/repos/paths-erc/coptic-texts/contents/colophons';

  const response = await fetch(index);
  const json = await response.json();

  return Promise.all(json.map(col =>
    fetch(col.download_url)
      .then(resp => resp.text() )
      .then(r => {
        return {
          "file": col.name.replace('.xml', ''),
          "text": r
        };
      })
  ));
}
/* jshint ignore:end */

/**
 * Runs an xpath query on the dataset and paginates results
 * @param       {Array} data  dataset to be queried
 * @param       {String} xpath Xpath query
 */
function RunQuery(data, xpath){
  html = '<ol>';
  data.map(i => {
    var arr = runXPath(i.text, xpath);
    var html_part = arr.map(e => {
      let data = [];
      Object.entries(e).forEach(
        ([key, value]) => {
          if(key != 'val'){
            data.push(`<span class="text-secondary">${key}:</span> <span class="text-info">${value}</span>`);
          }
        });
      data = data.join("<br>");
      return `<li>
        <div class="row">
        <div class="col">${e.val}</div>
        <div class="col">${data}</div>
        <div class="col text-secondary"><a href="https://github.com/paths-erc/coptic-texts/blob/master/colophons/${i.file}.xml" target="_blank">${i.file}</a></div>
        </div>
        </li>`;
    });
    html += html_part.join('');
  });
  html += '</ol>';

  return html;
}

/**
 * Runs an xpath query on the dataset and returns list of nodes
 * @param       {Array} data  dataset to be queried
 * @param       {String} xpath Xpath query
 */

function runXPath(data, xpath){
    var doc = (new DOMParser()).parseFromString(data, 'text/xml');
    var nodes = doc.evaluate(xpath, doc, function(prefix) { return "http://www.tei-c.org/ns/1.0"; } , XPathResult.ANY_TYPE, null);
    var result = nodes.iterateNext();
    var txt = [];
    while (result) {
      let obj = {};
      if (typeof result.childNodes[0] !== 'undefined'){
        for(var i = result.attributes.length - 1; i >= 0; i--) {
          obj[result.attributes[i].name] = result.attributes[i].value;
       }
       obj.val = result.childNodes[0].nodeValue;
        txt.push(obj);
      }
      result = nodes.iterateNext();

    }
    return txt;
}
