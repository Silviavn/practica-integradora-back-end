import mongoose from "mongoose";
import { logger } from "../utils/logger.js";



export const mongoDBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    logger.info("Conexión con MongoDB establecida");
  } catch (error) {
    logger.info("Error al conectar con MongoDB");
    logger.error(error.message);
  }
};