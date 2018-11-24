/* jshint esversion: 6 */
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
