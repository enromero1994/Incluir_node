const {validationResult} = require('express-validator');
//next es lo que llamamos si el middleware pasa. Si es exitoso sigue con el siguiente middleware o el controlador
const validarCampos = (req,res,next) =>{
 //obtenemos los errores del req
 const errors = validationResult(req);
 //si existen errores
 if(!errors.isEmpty()){
     //devolvemos status 400 con errores en json 
     return res.status(400).json(errors)
 }
 next();
}

module.exports = {
    validarCampos
}