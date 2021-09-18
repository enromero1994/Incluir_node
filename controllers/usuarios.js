const { response, request } = require('express');

const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');


//query params. ejemplo en postman - localhost:8080/api/usuarios?q=add&apikey=125211
const usuariosGet = async (req = request, res = response) => {

    const {limite = 5, desde = 0, hasta } = req.query
    // const usuarios = await Usuario.find({
    //     estado : true
    // })
    //     .skip(Number(desde))
    //     .limit(Number(limite));
    // const total = await Usuario.countDocuments({estado : true});
    //HACEMOS ESTO PARA QU ESE EJECUTEN LAS PROMESAS AL MISMO TIEMPO Y NO UNA LEGO DE QU TERMINE LA OTRA COMO SUCEDE EN EL CODIGO DE ARRIBA. ASI ES MAS RAPIDA LA QUERYw
    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments({estado : true}),
        Usuario.find({
            estado : true
        })
            .skip(Number(desde))
            .limit(Number(limite)) 
    ])
    res.json({ 
        total,
        usuarios
        
        
    });
}
const usuariosPost = async (req, res = response) => {
   
    const {nombre,correo,password,rol} = req.body;
    //creamos instancia
    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });
 
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password,salt);

    //grabamos registro
    await usuario.save();
    res.json({

        msg: 'Post Api - controlador',
        usuario
    });
}
const usuariosPut = async (req, res = response) => {
    const { id } = req.params
    //desestructuracion y operador rest 
    const {_id,password,google,correo, ...resto} = req.body
        // const id = req.params.id     
    //TODO validar contra bd
    if(password){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password,salt);    
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto)
    res.json(usuario);
}
const usuariosPatch = (req, res = response) => {

    res.json({

        msg: 'Patch Api - controlador'
    });
}
//USAMOS ASYNC Y AWAIT PORQUE INTERACTUAMOS CON LA BASE DE DATOS. ES DECIR, NECESITAMOS QUE TERMINE EL PROCESAMIENTO CON ELLA PARA PODER SEGUIR.
const usuariosDelete = async (req, res = response) => {
   
    const {id} = req.params
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado : false})
    res.json({
 
        msg : `El usuario que se elimino es ${usuario}`
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}