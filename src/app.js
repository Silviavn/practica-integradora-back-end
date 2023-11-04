const express = require ('express')
const routerApp = require ('./routes')
const { connect } = require('mongoose')

const app = express()
const PORT = 8080

connectDb()

app.use( express.json())
app.use (express.urlencoded({extended: true}))

app.use(routerApp)

app.listen(PORT, ()=> {
    console.log("Servidor escuchando el puerto ${PORT}")
})