/* jshint esversion: 6 */

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
