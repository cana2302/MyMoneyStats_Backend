/*
El archivo index.js solo importa la app-express y luego inicia la aplicación. 
La aplicación Express (app.js) y el código que se encarga del servidor web están separados siguiendo las mejores prácticas.
*/
const app = require('./app') // Importa la App-Express
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`) // mensaje de confirmación
})

/*
app.listen(): Método de Express que inicia el servidor HTTP, que escucha conexiones en el puerto especificado
(definido por config.PORT.)
*/