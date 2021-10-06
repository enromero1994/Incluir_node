const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const validarJWT = (req = request,res = response,next) => {
//obtenemos el header de la request

    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg :"No hay token en la peticion"
        });
    }
    try {
        //Valido que el jwt sea valido
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY)
        
        //le paso el uid a un nuevo parametro en la request que llamo req.uid que luego lo tomare del controlador usuario para tratarlo
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
    

}

module.exports = {
    validarJWT
}