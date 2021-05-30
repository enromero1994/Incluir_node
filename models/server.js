const express = require('express');
var cors = require('cors');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //middlewares
        //funcion que se ejecuta siemppre cuando se ejecuta nuestra funcion
        this.middlewares();

        this.routes();
    }
    middlewares() {
        //Cors
        this.app.use(cors())
            // Lectura y Parseo del body
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }
    listen() {

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}
module.exports = Server;