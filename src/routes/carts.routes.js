import { Router } from "express";
import {
  addCart,
  addProductInUserCart,
  addProductToCart,
  deleteAllProductsFromCart,
  deleteCart,
  deleteProductFromCart,
  getAllCarts,
  getCartById,
  purchaseCart,
  updateProductQuantityFromCart,
  updateProductsFromCart,
} from "../controller/cart.controllers.js";
import { isAuthorize, isLogin, isUserAuthorized } from "../middlewares/checkUser.js";

const routerCarts = Router();


routerCarts.get("/", getAllCarts);   //listamos todos los carritos
routerCarts.get("/:cid", getCartById); //Listamos un carrito por su id
routerCarts.post("/", isAuthorize, addCart);// Creamos ó Adicionamos un carrito
routerCarts.post("/:cid/products/:pid", isLogin, isUserAuthorized, addProductToCart);// Adicionamos un producto a un carrito
routerCarts.post("/products/:pid", isLogin, isUserAuthorized, addProductInUserCart);
routerCarts.post("/:cid/purchase", isLogin, purchaseCart);// Proceso de compra de un carrito
routerCarts.delete("/:cid", isAuthorize, deleteCart);// Eliminamos un carrito
routerCarts.delete("/:cid/products", deleteAllProductsFromCart);// Eliminamos todos los productos de un carrito
routerCarts.delete("/:cid/products/:pid", deleteProductFromCart);// Eliminamos un producto de un carrito
routerCarts.put("/:cid", updateProductsFromCart);// Actualizamos un carrito
routerCarts.put("/:cid/products/:pid", isAuthorize, updateProductQuantityFromCart);// Actualizamos la cantidad de un producto en el carrito

export { 
    routerCarts 
};