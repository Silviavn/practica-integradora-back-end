const { userModel } = require("./models/users.model")

//CRUD
class UserManagerMongo {
    constructor(){
        this.model = userModel
    }

    async getUsers (){
        try {
            return this.model.find({})
        } catch (error){
            console.log(error)
        }
    }
    getUser = async ()=>{}
    async createUser(){}
    async updateUser(){}
    async deleteUser(){}
}
module.exports = { UserManagerMongo}