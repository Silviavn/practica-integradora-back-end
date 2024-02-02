import mongoose from "mongoose"
import { logger } from "../../logger/logger.js"

class MongoSingleton {
    static #instance

    constructor(mongo_url){
     mongoose.connect(mongo_url,{
         // useNewUrlParse: true,
         useUnifiedTopology: true
         
     })
 }
 static getInstance(mongo_url){
     if(this.#instance){
         logger.info(msg`Base de datos creada`)
         return this.#instance
     }
     this.#instance = new MongoSingleton(mongo_url)
     logger.info(`Base de datos CONECTADA`)
     this.#instance
 }
}
export default MongoSingleton