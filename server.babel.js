import express from 'express';
import hogan from 'hogan-express';
import bodyParser from 'body-parser';
import mysql from 'promise-mysql';
import { v4 } from 'uuid';

mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'organizame',
}).then((connection) => {
  const app = express();

  app.set('views', './views');
  app.set('view engine', 'html');
  app.engine('html', hogan);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('./client', { maxAge: 31557600000 }));

  app.post('/login', async (req, res) => {
    const { user, pass } = req.body;
    const query = `
      SELECT *
      FROM login
      WHERE username="${user}"
      AND password="${pass}"
    `;
    try{
      const data = await connection.query(query);
      res.json(data[0]);
    }catch(error){
      res.json(error);
    }
  });
  app.get('/tipoLicencia', async (req, res) => {
    const query = 'SELECT * from tipoLicencia';
    const data = await connection.query(query);
    res.json(data);
  });
  app.get('/licenses', async (req, res) => {
    const query = 'SELECT * from licencias';
    const data = await connection.query(query);
    res.json(data);
  });
  app.get('/licenses/:id', async (req, res) => {
    const query = `SELECT * from licencias WHERE id="${req.params.id}"`;
    const data = await connection.query(query);
    res.json(data[0]);
  });
  app.post('/licenses', async (req, res) => {
    const whitelistHeaders = [
      'nombre',
      'descripcion',
      'tipo',
      'precio',
      'numeroUsuarios',
      'numeroRegistros',
      'duracion',
      'publicado',
      'imagen',
      'precioMes',
      'numeroRegistroMes',
      'llamadaAccion',
      'descripcionAdicional',
    ];
    const headers = Object.keys(req.body).filter((value) => (
      whitelistHeaders.includes(value)
    ));
    //TODO: escape quotes
    const values = headers.map((header) => (
      `"${req.body[header]}"`
    ));
    const query = `
      INSERT INTO licencias(id, ${headers}, activo)
      VALUES ("${v4()}", ${values}, "1")
    `;
    try{
      const data = await connection.query(query);
      res.json(data);
    }catch(error){
      res.json(error);
    }
  });
  app.put('/licenses/:id', async (req, res) => {
    const whitelistHeaders = [
      'nombre',
      'descripcion',
      'tipo',
      'precio',
      'numeroUsuarios',
      'numeroRegistros',
      'duracion',
      'publicado',
      'imagen',
      'precioMes',
      'numeroRegistroMes',
      'llamadaAccion',
      'descripcionAdicional',
    ];
    const entries = Object.entries(req.body).filter((value) => (
      whitelistHeaders.includes(value[0])
    ));
    //TODO: escape quotes
    const query = `
      UPDATE licencias
      SET ${entries.map((entry) => `${entry[0]}="${entry[1]}"`)}
      WHERE id="${req.params.id}"
    `;
    try{
      const data = await connection.query(query);
      res.json(data);
    }catch(error){
      res.json(error);
    }
  });
  app.delete('/licenses/:id', async (req, res) => {
    const query = `
      DELETE FROM licencias
      WHERE id="${req.params.id}"
    `;
    try{
      const data = await connection.query(query);
      res.json(data);
    }catch(error){
      res.json(error);
    }
  });
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.listen(3000, () => {
    console.log('Example app listening on port 3000');
  });
});
