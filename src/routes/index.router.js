import {Router} from "express";
import viewsRouter from "./views.router.js";
import sessionRouter from "./sessions.routes.js";
import productsRoutes from "./mocking-products.router.js";
import cartsRoutes from "./carts.routes.js";
import ticketsRoutes from "./tickets.router.js";
import usersRoutes from "./users.router.js";
import mockingRoutes from "./mocking-products.router.js";

const router = new Router();

router.use("/", viewsRouter);
router.use("/api/session", sessionRouter);
router.use("/api/products", productsRoutes);
router.use("/api/carts", cartsRoutes);
router.use("/api/tickets", ticketsRoutes);
router.use("/api/users", usersRoutes);
router.use("/mockingproducts", mockingRoutes);

export default router;