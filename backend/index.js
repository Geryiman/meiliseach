const express = require('express');
const { MeiliSearch } = require('meilisearch');
const cors = require('cors'); 

const app = express();


app.use(cors());
app.use(express.json()); 

const client = new MeiliSearch({
  host: 'http://172.233.131.83:7700',
  apiKey: '6d9bb59dca80659707c17d1363e5393fd13475362644c14faf0652ee886',
});

app.post('/search', async (req, res) => {
  try {
    const { query } = req.body; 
    const index = client.index('movies'); 
    const searchResults = await index.search(query);
    res.json(searchResults);
  } catch (error) {
    console.error('Error al realizar la búsqueda:', error);
    res.status(500).json({ error: 'Error al realizar la búsqueda' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
