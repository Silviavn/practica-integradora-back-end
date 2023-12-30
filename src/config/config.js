//Aqui realizamos la configuracion de la base de datos a traves del metodo conect 
const mongoose = require ('mongoose')

const uri = "mongodb+srv://SilviaVN:Ma.2405@cluster0.k4o0wdx.mongodb.net/?retryWrites=true&w=majority"

const connectDb = async () => {
    try {
        console.log ('Hemos conectado con la base de datos') 
        return await mongoose.connect(uri)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb
