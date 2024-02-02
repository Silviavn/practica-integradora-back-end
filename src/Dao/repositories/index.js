import {Carts, Products, Users, Tickets} from "../factory.js";
import CartsRepository from "./Carts.repository.js";
import TicketsRepository from "./Tickets.repository.js";
import ProductsRepository from "./Products.repository.js";
import UsersRepository from "./Users.repository.js";

export const CartsService = new CartsRepository();
export const ProductsService = new ProductsRepository();
export const UsersService = new UsersRepository();
export const TicketsService = new TicketsRepository();