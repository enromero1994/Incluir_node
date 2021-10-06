const { Router } = require('express');
const {check} = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorid } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')
const router = Router();

router.get('/', usuariosGet);
router.put('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorid),
    check('rol').custom(esRoleValido),
    validarCampos
    
]
,usuariosPut);
router.post('/', [
    //Middleware de libreria express validator que me permite especificar que campo del body deseo revisar
    //check('name input','msg error',method validator)
    check('correo','El correo no es valido').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 letras').isLength({min: 6}),
    check('correo').custom(emailExiste),    
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),  
    check('rol').custom(esRoleValido),
    //Estos errores que se toman aca los puedo validar desde el req en el controlador
    validarCampos
] ,usuariosPost);

//las validaciones de los middlewares se hacen secuencial, si uno falla los demas no se ejecutan
router.delete('/:id',[
    validarJWT,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorid),
    validarCampos
],
 usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router;