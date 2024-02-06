import { Router } from "express";
import {
  cartDetail,
  changePassword,
  chat,
  home,
  loginUser,
  logoutUser,
  productDetail,
  products,
  realTimeProducts,
  registerUser,
  resetPassword,
  viewChangePassword,
  viewLogin,
  viewProfile,
  viewRegister,
  viewResetPassword,
  addProductToCart,
  buyCart,
  admin

} from "../controller/views.controllers.js";
import { checkResetToken } from "../middlewares/checkResetToken.js";
import { checkToken } from "../middlewares/checkToken.js";
import { isAdmin } from "../middlewares/checkUser.js";

const routerViews = Router();

routerViews.get("/home", home);
routerViews.get("/realtimeproducts", realTimeProducts);
routerViews.get("/chat", chat);
routerViews.get("/products", checkToken, products);
routerViews.get("/product/:pid", checkToken, productDetail);
routerViews.get("/cart/:cid", checkToken, cartDetail);
routerViews.get("/cart", checkToken, cartDetail);
routerViews.post("/cart/:pid", checkToken, addProductToCart);// Agregamos un producto al carrito
routerViews.post("/cart/buy/:cid", checkToken, buyCart);
routerViews.get("/login", viewLogin);// Vista de login
routerViews.post("/login", loginUser);
routerViews.get("/register", viewRegister);// Vista de registro
routerViews.post("/register", registerUser);
routerViews.get("/profile", checkToken, viewProfile);// Vista de perfil
routerViews.get("/logout", checkToken, logoutUser);// Cerrar sesión
routerViews.get("/resetpassword", viewResetPassword);// Vista restaurar contraseña
routerViews.post("/resetpassword", resetPassword);
routerViews.get("/changepassword/:token", checkResetToken, viewChangePassword);// Vista cambiar contraseña
routerViews.post("/changepassword", changePassword);
routerViews.get("/admin", checkToken, isAdmin, admin);// Vista de administrador


export { 
    routerViews 
};