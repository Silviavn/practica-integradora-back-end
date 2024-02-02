import dotenv from "dotenv";
import MongoSingleton from "../public/MongoSingleton.jl/mongoSingleton.js";

dotenv.config();

export default {

    port:                process.env.PORT,
    mongo_url:           process.env.MONGO_URL,
    privateKey:          process.env.PRIVATE_KEY,
    cookieKey:           process.env.SECRET_SESSIONS,
    clientId:            process.env.CLIENT_ID,
    clientSecret:        process.env.CLIENT_SECRET,
    callbackURL:         process.env.CALLBACK_URL,
    persistence:         process.env.PERSISTENCE,
    nodemailer_password: process.env.NODMAILER_PASSWORD,
    nodemailer_user:     process.env.NODEMAILER_USER,
    enviorment:          process.env.ENVIORMENT,
    connectDb: async () => await MongoSingleton.getInstance(process.env.MONGO_URL)
    
  
};

      //  console.log ('Hemos conectado con la base de datos') 
     //   return await connect('mongodb+srv://SilviaVN:Ma.2405@practica-integradora.mongodb.net/test?retryWrites=true&w=majority&appName=AtlasApp')
 