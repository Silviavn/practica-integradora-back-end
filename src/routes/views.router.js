//Nuestro front-end
const { Router } = require('express')
const { uploader } = require('../utils/multer')
const { userModel } = require('../Daos/Mongo/models/users.model')
const { passportCall } = require('../middlewars/passportCall.middlewars')
const { authorization } = require('../middlewars/authorization.middlewars')

const router = Router()


router.get('/login', (req,res)=>{
    res.render('login', {
        showNav: true
    })
})

router.get('/register', (req,res)=>{
    res.render('register', {
        showNav: true
    })
})

router.get('/profile', (req,res)=>{
    res.render('profile', {
        showNav: true
    })
})
//Para proteger nuestra ruta de usuarios usaremos jwt aplicado con passport
router.get('/users', [
        passportCall('jwt'),
        authorization(['USER','ADMIN'])
    ], async (req, res) => {
    try {
        //Los filtros de busqueda van entre {}
        const {numPage=1, limit=2, query=''} = req.query

        let { 
            docs,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage,
            page
         } = await userModel.paginate({}, {limit: limit, page: numPage, lean: true})
        // console.log(users)
           
        res.status(200).render('users', {
            showNav: true,
            users: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page
        })

    } catch (error) {
        console.log(error)
    }   
})


router.get('/subirarch', (req, res)=>{
    res.render('subirArch')
})

router.post('/subirarch', uploader.single('file') ,(req,res) => {
    if (!req.file) return res.status(400).send({status: 'error', error: 'No se pudo guardar la imagen'})

    res.send({status: 'success', payload: 'Archivo Subido con Éxito'})
})


module.exports = router 