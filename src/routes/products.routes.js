import { Router } from "express";

import {
  addProduct,
  deleteProduct,
  generateMockingProducts,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controller/product.controllers.js";
import { isAuthorize, isOwnerAuthorized } from "../middlewares/checkUser.js";
import { checkMongoId } from "../middlewares/checkMongoId.js";

const routerProducts = Router();

routerProducts.get("/mockingproducts", generateMockingProducts);
routerProducts.get("/", getAllProducts);//listamos todos los productos
routerProducts.get("/:id", checkMongoId, getProductById);//listamos un producto por ID
routerProducts.post("/", isAuthorize, addProduct);//adicionamos producto con autorización
routerProducts.put("/:id", checkMongoId, isAuthorize, updateProduct);
routerProducts.delete("/:id", checkMongoId, isAuthorize, isOwnerAuthorized, deleteProduct);//eliminamos producto con autorización


export { 
    routerProducts 
};