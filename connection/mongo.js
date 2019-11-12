const mongoose = require('mongoose');
const db = 'cinebit';

mongoose

  .connect('mongodb://localhost:27017', {
    dbName: db,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`Ingresando a la base de datos <<${db}>> con éxito`);
  })
  .catch(err => {
    console.log(`Error de conexión: ${err}`);
  })