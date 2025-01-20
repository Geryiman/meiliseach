const express = require('express');
const { MeiliSearch } = require('meilisearch');

const app = express();
const client = new MeiliSearch({
  host: 'http://172.233.131.83:7700',
  apiKey: '6d9bb59dca80659707c17d1363e5393fd13475362644c14faf0652ee886'
});

async function performSearch() {
  try {
    const index = client.index('movies'); 
    const search = await index.search(Search());
    console.log('Resultados de búsqueda:', search);
  } catch (error) {
    console.error('Error al realizar la búsqueda:', error);
  }
}
performSearch();
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});