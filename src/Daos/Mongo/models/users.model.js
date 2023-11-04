const { Schema, model } = require('mongoose')
// nombre de la coleccion
const collection = 'users'
//Aqui creamos las propiedades que va a tener
const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name : {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true

    }
})

const userModel = model(collection, userSchema)
module.exports = { userModel}