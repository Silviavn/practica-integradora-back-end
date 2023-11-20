//Aqui van los endpoints con sus importaciones y sus configuraciones de ruter 

const { Router } = require ('express')
const usersRouter = require('.users.router.js/')
const viewsRouter = require('./views.router.js')

const router = Router()


//router.use('/', (req, res) => {
  //  res.send('Hola mundo de prueba con el servidor')
//})

router.use('/views', viewsRouter)
router.use('/api/users', usersRouter)
//router.use('/api/products', ()=> {})

module.exports = router