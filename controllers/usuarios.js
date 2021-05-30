const { response, request } = require('express');

//query params. ejemplo en postman - localhost:8080/api/usuarios?q=add&apikey=125211
const usuariosGet = (req = request, res = response) => {
    //valores por defecto en nombre si no se envia nada.
    const { q, nombre = "sin nombre", apikey } = req.query;
    res.json({

        msg: 'Get Api - controlador',
        q,
        nombre,
        apikey
    });
}
const usuariosPost = (req, res = response) => {
    const body = req.body;

    res.json({

        msg: 'Post Api - controlador',
        body
    });
}
const usuariosPut = (req, res = response) => {
    const { id } = req.params
        // const id = req.params.id
    res.json({

        msg: 'Put Api - controlador',
        id
    });
}
const usuariosPatch = (req, res = response) => {

    res.json({

        msg: 'Patch Api - controlador'
    });
}
const usuariosDelete = (req, res = response) => {

    res.json({

        msg: 'Delete Api - controlador'
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}