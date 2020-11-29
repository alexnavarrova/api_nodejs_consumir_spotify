const express = require('express');
const app = express();
const cors = require('cors');
const constantes = require('./helpers/constantes.js');

const spotify = require('./services/spotify');

app.use(express.static(__dirname));

app.get('/', cors(constantes.corsOptions), async (req, res, newxt) => {
  const query = req.query.q || '';
  const offset = req.query.offset || 0;

  //realiza la petición a la api de spotify
  const data = await spotify.searchSong(query,offset);
  
  try {
    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error) {
    console.log(error);
  }
});

const server = app.listen(8000, function(){

  //obtiene el token para enviar en cada consulta de spotify
  spotify.getToken();
});
