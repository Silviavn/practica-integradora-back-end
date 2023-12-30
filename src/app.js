//Nuestro servidor con passport y jws
const express = require('express')
const handlebars = require('express-handlebars')
const connectDb = require('./config/config')
const routerApp = require('./routes')
const { initializePassport } = require('./config/passport.config')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require("express-session")


const app = express()
const PORT = 8080
const cookieSecret = "C0D3R";

connectDb()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser('firmaSecret@'))

app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(session({ secret: cookieSecret, resave: true, saveUninitialized: true }));

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(routerApp)
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`)
})
