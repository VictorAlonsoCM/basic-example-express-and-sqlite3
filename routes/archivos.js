var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', (req, res, next) => {
  res.send('Archivos lol');
});

router.get('/leer', (req, res, next) => {
  var datos = fs.readFileSync('datos.json', 'utf8');
  res.render('archivos/leer', JSON.parse(datos));
})

module.exports = router;