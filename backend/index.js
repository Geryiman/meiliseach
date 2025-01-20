const express = require('express');
const { MeiliSearch } = require('meilisearch');
const path = require('path');

const app = express();
const client = new MeiliSearch({
  host: 'http://172.233.131.83:7700',
  apiKey: '6d9bb59dca80659707c17d1363e5393fd13475362644c14faf0652ee886'
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/search', async (req, res) => {
  const query = req.query.q;

  try {
    const index = client.index('movies');
    const searchResults = await index.search(query); 
    res.json(searchResults);
  } catch (error) {
    console.error('Error al realizar la búsqueda:', error);
    res.status(500).json({ error: 'Ocurrió un error al buscar las películas.' });
  }
});
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
