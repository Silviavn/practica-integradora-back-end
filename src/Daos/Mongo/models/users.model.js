const {Schema, model} = require('mongoose')

//importamos la libreria paginate-v2 version dos
const mongoosePaginate = require('mongoose-paginate-v2')

const userCollection = 'users'

const userSchema = new Schema({
    first_name:{
        type: String,
        index: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ['user', 'user_premium', 'admin'],
        default: 'user'
    },


})
userSchema.plugin(mongoosePaginate)
const userModel = model(userCollection, userSchema) // metodos acciones para interactuar con la base de datos 

module.exports = { userModel }
