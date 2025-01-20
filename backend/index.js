const express = require('express');
const { MeiliSearch } = require('meilisearch');
const cors = require('cors'); // Habilitar CORS para permitir solicitudes desde el frontend

const app = express();

// Configurar CORS
app.use(cors());
app.use(express.json()); // Para manejar JSON en el cuerpo de las solicitudes

const client = new MeiliSearch({
  host: 'http://172.233.131.83:7700',
  apiKey: '6d9bb59dca80659707c17d1363e5393fd13475362644c14faf0652ee886',
});

// Endpoint para realizar la búsqueda
app.post('/search', async (req, res) => {
  try {
    const { query } = req.body; // Recibir el término de búsqueda desde el frontend
    const index = client.index('movies'); // Asegúrate de que 'movies' es el índice correcto
    const searchResults = await index.search(query);
    res.json(searchResults);
  } catch (error) {
    console.error('Error al realizar la búsqueda:', error);
    res.status(500).json({ error: 'Error al realizar la búsqueda' });
  }
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
