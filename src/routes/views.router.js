const { Router } = requiere('express')

const router = Router()

router.get('/subArc', (req, res) => {
    res.render('subArc')
})

module.exports = router