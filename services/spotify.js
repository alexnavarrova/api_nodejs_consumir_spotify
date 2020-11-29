const axios = require('axios');
const constantes = require('../helpers/constantes.js');
var querystring = require('querystring');

let token = {};

const getToken = async () => {

  const requestBody = {
    grant_type: 'client_credentials'
  };
  try {
    const response = await axios.post(constantes.urlSpotifyToken, querystring.stringify(requestBody), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + constantes.key_spotify,
      }
    });
    
    response.data.fecha = Date.now();
    token = response.data;

  } catch (error) {
    console.log('error => ', error);
  }
}

const searchSong = async (query, offset = 0, limit = 20) => {
  
  await getToken();
  
  const url = constantes.urlSpotifySearch + `?q=${query}&type=playlist&offset=${offset}&limit=${limit}`;
  
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + token.access_token,
      }
    });
    return response.data.playlists;
    
  } catch (error) {
    console.log('error => ', error);
  }
   
}

module.exports = {
  getToken,
  searchSong
};