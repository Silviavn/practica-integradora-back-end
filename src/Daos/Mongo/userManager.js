const { userModel } = require("./models/users.model")

//CRUD para ir creando los usuarios
class UserManagerMongo {
    constructor(){
        this.model = userModel
    }

    async getUsers (){
        try {
            return  await this.model.find({})
        } catch (error){
            console.log(error)
        }
    }
    getUser = async (uid)=>{
        return await this.model.findOne({_id: uid})
    }
    async createUser(newUser){
        return await this.model.create(newUser)
    }
    async updateUser(){}
    async deleteUser(){}
}
module.exports = { UserManagerMongo}