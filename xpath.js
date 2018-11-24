/* jshint esversion: 6 */

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
