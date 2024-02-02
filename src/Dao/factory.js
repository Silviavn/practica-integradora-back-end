import mongoose from "mongoose";
import config from "../config/config.js";

export let Carts;
export let Products;
export let Users;
export let Tickets;

switch (config.persistence) {
  case "mongodb":
    async function connectToMongoDB() {
        try {
           await mongoose.connect(config.mongo_url);
           console.log("Conexion con MongoDB exitosa");
        } catch (error) {
           console.error("Error de conexión a MongoDB:", error);
           process.exit(1); // 1 indica que el proceso termina con un error
        }
     }
     
     // Llamada a la función asincrónica
     connectToMongoDB();    

    const {default: CartsMongo} = await import(
      "./classes/dbManager/CartsManager.js"
    );
    const {default: ProductsMongo} = await import(
      "./classes/dbManager/ProductsManager.js"
    );
    
    const {default: UsersMongo} = await import(
      "./classes/dbManager/UsersManager.js"
    );

    const {default: TicketsMongo} = await import(
      "./classes/dbManager/TicketsManager.js"
    );
    
    Carts = CartsMongo;
    Products = ProductsMongo;
    Users = UsersMongo;
    Tickets = TicketsMongo;
    break;

  case "filesystem":
    console.log("Working with filesystem");

    const {default: CartsMemory} = await import(
      "./classes/fileManager/CartsManager.js"
    );
    const {default: ProductsMemory} = await import(
      "./classes/fileManager/ProductsManager.js"
    );
    const {default: UsersMemory} = await import(
      "./classes/fileManager/UsersManager.js"
    );

    Carts = CartsMemory;
    Products = ProductsMemory;
    Users = UsersMemory;
    break;
}