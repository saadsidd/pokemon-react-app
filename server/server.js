const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
const PORT = 8080;

app.use(express.static('./public'));
const types = require('./data/types.json');
const pokedex = require('./data/pokedex.json');

const getPokemonByType = (type) => {
  const filtered = pokedex.filter(pokemon => pokemon.type.includes(type));
  return filtered.slice(0, 10);
}

app.get('/types', (req, res) => {
  res.send(types);
});

app.get('/types/:type', (req, res) => {
  const results = getPokemonByType(req.params.type);
  res.send(results);
});

app.listen(PORT, () => console.log(`Server started. Listening on port ${PORT}`));