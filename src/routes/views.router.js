//Aqui renderizamos las vistas
const { Router } = requiere('express')

const router = Router()

router.get('/subArc', (req, res) => {
    res.render('subArc')
})

router.post('/subArch.hbs', uploder, (req, res) => {
    
})
module.exports = router