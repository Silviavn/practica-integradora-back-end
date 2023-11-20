//Creamos la configuracion del destino donde se guardan las imagenes y pasamos eso a multer y luego exportamos, al agregar una imagen en localhost automaticamente la imagen debe aparecer en la carpeta image

 const multer = require('multer')
 const { dirname } = require('node:path')

const storage = multer.diskStorage({
    destination: function(rep, file, cb){
        cb(null, '${__dirname}/image')
    },
    filename: function(req, file, cb){
        cb(null, '${Date.now()}-${file.originalname}')
    }
})
 
const uploader = multer({
    storage
})
module.exports =  { uploader }