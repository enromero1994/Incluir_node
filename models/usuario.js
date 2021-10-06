const {Schema,model} = require('mongoose');

const UsuarioSchema = Schema({
   nombre:{
       type: String,
       required : [true,'El nombre es obligatorio']

   } ,
   correo:{
       type:String,
       required:[true,'El correo es obligatorio'],
       unique:true
   },
   password:{
       type:String,
       required:[true,'La contraseña es obligatoria'],

   },
   img:{
       type:String,

   },
   rol:{
       type:String,
       required: true,
       emun: ['ADMIN_ROLE','USER_ROLE']
   },
   estado:{
       type:Boolean,
       default:true
   },
   google:{
       type:Boolean,
       default:false
   }
});


UsuarioSchema.methods.toJSON = function(){
    // operador rest para separar __v y password del resto del arreglo que guardo en usuario
    const {__v,password, _id, ...usuario} = this.toObject();
    usuario.uid = _id
    return usuario;
}


//le pasamos el modelo Usuario, Mongoose lo pasara a plural
// y luego le pasamos el Schema
module.exports = model('Usuario',UsuarioSchema);