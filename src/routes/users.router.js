const { Router } = require ('express')

const router = Router()
let userService = new UserManagerMongo()

router.get('/', async (req, res) => {
    try {
        let users = await userService.getUsers()
        res.send({
            status: 'success',
            payload: users
        
        })
    } catch (error) {
        console.log(error)
    }
}) 

//Aqui realizamos las validaciones con destructurin donde me retorna los resultados, validando la funcionalidad en el postman

router.post('/', async (req, res) => {
    try {
        //const {first_name, last_name, email} = req.body
        const newUser = req.body

        let result = await userService.createUsers(newUser)
        res.send({
            status: 'success',
            payload: result
        
        })
    } catch (error) {
        console.log(error)
    }
}) 
module.exports = router