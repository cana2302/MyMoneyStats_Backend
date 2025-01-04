/*
  El archivo 'app.js' crea la aplicación express real.
  Toma el enrutador (billsRouter), y se usa si la URL de la solicitud comienza con /api/bills.
  Encargado de conectar con la base de datos.
  Sirve archivo estático de la aplicacion frontend.
  Habilita 'CORS (Cross-Origin Resource Sharing) para peticiones de diferentes dominios
  Habilita 'express.json' para el parceo de las solicitudes HTTP(POST,PUT) que se envian desde: APP(en formato JSON) => WEB SERVICE(en formato JS)
*/

const config = require('./utils/config') //Importa el modulo config (contiene variables de entorno)
const express = require('express') //Importa el framework Express, que se utiliza para crear aplicaciones web en Node.js.
const app = express() //Se inicializa una instancia de la app Express, que será utilizada para definir rutas, middleware y controladores.
const cors = require('cors') //Importa el middleware cors, que habilita el CORS para permitir que el servidor acepte solicitudes desde diferentes dominios.
const billsRouter = require('./controllers/bills') //Importa un enrutador para manejar rutas relacionadas con la entidad bills
const middleware = require('./utils/middleware') //Importa middleware personalizado para manejar errores, logs, etc.
const logger = require('./utils/logger') //Importa modulo para registrar mensajes de log (información y errores)
const mongoose = require('mongoose') //Importa Mongoose, una biblioteca para interactuar con MongoDB desde Node.js.

mongoose.set('strictQuery', false) //Configuracion de mongoose. Se desactiva el modo estricto, lo que significa que las consultas de búsqueda no serán estrictas respecto a los campos definidos en el esquema.
logger.info('connecting to', config.MONGODB_URI) //Registra en consola que la app está intentando conectarse a MongoDB a la URI definida en config.MONGODB_URI.

mongoose.connect(config.MONGODB_URI)  //inicia la conexion
  .then(() => {
    logger.info('connected to MongoDB')  //si es exitosa, muestra mensaje en consola
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message) //Si ocurre un error se captura el error y se registra un mensaje de error en los logs.
  })

app.use(cors()) //Habilita el middleware CORS para permitir que la API acepte solicitudes desde diferentes dominios (por ej, para que la app-frontend pueda hacer peticiones a este backend desde otro dominio o puerto).
app.use(express.static('dist')) //Sirve archivos estáticos desde el directorio dist. Archivos de app-frontend (proyecto de React o Vue) desde el mismo servidor backend.
app.use(express.json()) //Habilita el middleware para el manejo de solicitudes HTTP entrantes al servidor que contienen cuerpos de datos en formato JSON
app.use(middleware.requestLogger) //Aplica el middleware personalizado para mostrar por consola los detalles de cada solicitud HTTP que llega al servidor

app.use('/api/bills', billsRouter) //Monta el enrutador billsRouter en el endpoint /api/bills. Esto significa que todas las solicitudes que lleguen a /api/bills serán manejadas por las rutas definidas en el archivo ./controllers/bills

app.use(middleware.unknownEndpoint) //Aplica un middleware para manejar las solicitudes a endpoints no definidos en la app. Este middleware va a devolver una respuesta con un mensaje de "404 - Not Found" si la ruta solicitada no existe.
app.use(middleware.errorHandler) //Aplica un middleware para manejar errores. Se encarga de capturar y gestionar cualquier error que ocurra en la app, devolverá respuestas adecuadas con el estado de error y un mensaje informativo.

module.exports = app //Exporta la instancia de la App-Express para que pueda ser utilizada en otros archivos (como en index.js, donde se monta el servidor y se especifica el puerto)