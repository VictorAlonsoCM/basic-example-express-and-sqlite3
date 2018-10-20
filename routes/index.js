// KNEX es para conectar a una base de datos y poder realizar migraciones
// Es un tipo de ORM https://knexjs.org/
// comando para inicializar un project con knex
// knex init
// crear una migración 
// knex migrate:make usuarios
// knex migrate:latest
var express = require('express');
var router = express.Router();
var fs = require('fs');
var exec = require('child_process').exec;
var os = require('os');
var knex = require('knex');
var knexFilen = require('../knexfile');
var db = knex(knexFilen[process.env.NODE_ENV || 'development']);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/pepito', function(req, res, next) {
  res.render('pepito', { title: 'Victor',
  nuevo: 'Yes'
  });
});

router.get('/formulario', function(req, res, next) {
  res.render('formulario');
});

router.post('/nuevo', (req, res, next) => {
  const { nombre, edad } = req.body;

  db('usuarios')
    .insert({ nombre: nombre, edad: edad })
    .catch(err => {
      console.log(err);
    }).then(data => {
      res.redirect('/usuarios')
    })

  // fs.writeFile('datos.json', JSON.stringify(req.body),(err) => {
  //   if(!err){
  //   res.send('Se ha guardado satisfactoriamente');
  //   }else{
  //     res.send('No se pudo guardar el usuario');
  //   }
  // })
  //res.json(req.body);
});

router.get('/usuarios', (req, res, next) => {
  db('usuarios')
    .select('*')
    .then(data => {
      res.render('usuarios', {usuarios: data})
    })
});

router.get('/user/:id/show', authentication, (req, res, next) => {
  db('usuarios')
    .select('*')
    .where({ id: req.params.id })
    .then(user => {
      res.render('archivos/leer', user[0]);
    })
});

function authentication(req, res, next){
  if(req.params.id == 1){
    next();
  }else{
    res.send('Usuario prohibido');
  }
}

router.get('/comandos', (req, res, next) => {
  console.log(os.platform());
  // res.send(os.platform());

  //const { cmd } = req.query;
  // exec(cmd, (error, stdout, stderr) => {
  //   console.log(stdout);
  //   res.send(stdout);
  // });
  exec('ls', (error, stdout, stderr) => {
    console.log(stdout);
    res.send(stdout);
  });
  // exec('shutdown -r now', (error, stdout, stderr) => {
  //   console.log(stdout);
  // });
});

module.exports = router;