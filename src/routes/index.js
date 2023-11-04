//Aqui van los endpoints con sus importaciones y sus configuraciones de ruter 

const { Router } = require ('express')

const router = Router()
router.use('/', (req, res) => {
    res.send('Hola mundo de prueba con el servidor')
})

router.use('/views', ()=> {})
router.use('/api/users', ()=> {})
router.use('/api/products', ()=> {})

module.exports = router