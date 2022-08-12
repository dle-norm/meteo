const express = require('express');
const path = require('path');
const app = express();
var allowedOrigins = [
    'http://localhost:8080',
    'https://meteo-dln.herokuapp.com',
    'https://geocoding-api.open-meteo.com',
    'https://api.open-meteo.com',
    '/'];
var cors = require('cors');
app.use(cors({
    origin: function(origin, callback){
      // allow requests with no origin 
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
}));
app.use(express.static('./dist/meteo'));
app.get('/*', function(req,res) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    res.sendFile(path.join(
    './dist/meteo/index.html'));
});
app.listen(process.env.PORT || 8080);
