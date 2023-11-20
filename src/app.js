const express = require ('express')
const handlebars = require ('express-handlebars')

const routerApp = require ('./routes')
const {connectDb} = require('./config/config')

const app = express()
const PORT = 8080

connectDb()

app.use( express.json())
app.use (express.urlencoded({extended: true}))

app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))

app.set('view engine', 'hbs')
app.set('views', __dirname +'/views')

app.use(routerApp)

app.listen(PORT, ()=> {
    console.log("Servidor escuchando el puerto ${PORT}")
})