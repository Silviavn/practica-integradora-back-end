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
module.exports = router