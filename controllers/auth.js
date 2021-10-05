const { response } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs') 
const { generarJWT } = require('../helpers/generar-jwt')

const login = async (req, res = response) => {
    const { correo, password } = req.body

    try {

        //verificar si el correo existe.
        const usuario = await Usuario.findOne({correo});
        
            if(!usuario){
                return res.status(400).json({
                    msg:"Usuario / password no son correctos"
                })
            }
             //verificar si el usuario esta activo
            if(!usuario.estado){
                return res.status(400).json({
                    msg:"Usuario inactivo"
                })
            }
       
           
        //verificar la contraseña
            // metodo de bcrypt que compara contraseñas y me devuelve un booleano
        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg:"Clave incorrecta",
                
            })
        }
        //generar jwt
        const token = await generarJWT(usuario.id)
        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            "msg": "Hable con el admin"
        })
    }


}

module.exports = {
    login
}