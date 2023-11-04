//Aqui realizamos la configuracion de la base de datos a traves del metodo conect 

const connect = require ('mongoose')

const connectDb = async () => {
    try {

        console.log ('Hemos conectado con la base de datos') 
        return await connect('mongodb+srv://SilviaVN:Ma.2405@practica-integradora.mongodb.net/test?retryWrites=true&w=majority&appName=AtlasApp')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb