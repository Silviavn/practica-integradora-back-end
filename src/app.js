const express = require ('express')
const routerApp = requiere ('./routes')

const app = express()
const PORT = 8080

app.use( express.json())
app.use (express.urlencoded({extended: true}))

app.use('/', (req, res) => {
    res.send('Hola mundo de prueba con el servidor')
})

app.use(routerApp)

app.listen(PORT, ()=> {
    console.log("Servidor escuchando el puerto ${PORT}")
})