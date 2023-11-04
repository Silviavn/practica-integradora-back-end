//Aqui van los endpoints con sus importaciones y sus configuraciones de ruter 

const { Router } = require ('express')
const usersRouter = require('.users.router/')

const router = Router()


//router.use('/', (req, res) => {
  //  res.send('Hola mundo de prueba con el servidor')
//})

router.use('/api/users', usersRouter)
//router.use('/views', ()=> {})
//router.use('/api/products', ()=> {})

module.exports = router