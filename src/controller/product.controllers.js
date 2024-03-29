import * as productServices from "../services/product.services.js";
import { EErrors, customError } from "../utils/customErro.js";
import { generateProducts } from "../utils/generate.Products.js";
import { logger } from "../utils/logger.js";
import { sendOwnerMail } from "../utils/sendOwnerMail.js";

const getAllProducts = async (req, res) => {
  try {
    const resProducts = await productServices.getAllProducts(req.query);

    const { totalPages, docs, hasPrevPage, hasNextPage, prevPage, nextPage } = resProducts;
    res.status(200).json({
      status: "success",
      products: docs,
      totalPages,
      prevPage,
      nextPage,
      page: resProducts.page,
      hasPrevPage,
      hasNextPage,
      prevLink: `http://localhost:8080/products?page=${prevPage}`,
      nextLink: `http://localhost:8080/products?page=${nextPage}`,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const resProduct = await productServices.getProductById(id);

    res.status(200).json(resProduct);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const addProduct = async (req, res) => {
  const body = req.body;
  try {
    const user = req.session.user;
    console.log(user)
    // Verificamos si el usuario es premium y si lo es, le asignamos el producto
    if (user.role === "premium") {
      const newProduct = { ...body, owner: user.email };
      console.log(newProduct)
      const resProducts = await productServices.addProduct(newProduct);
      return res.status(200).json(resProducts);
    }

    const resProducts = await productServices.addProduct(body);

    res.status(200).json(resProducts);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    await productServices.updateProduct(id, body);
    const product = await productServices.getProductById(id);

    res.status(200).json({
      msg: "Producto actualizado",
      product,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
  
    const product = await productServices.getProductById(id);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    if (product.owner !== req.session.user.email) {
      // Si el usuario no es el dueño del producto, se le envía un mail al owner del producto
      // y se le notifica que alguien eliminó su producto
      sendOwnerMail(product.owner);
    }
    await productServices.deleteProduct(id);
    
    res.status(200).json({ msg: "Producto eliminado" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
  }
};

const generateMockingProducts = async (req, res) => {
  try {
    const products = generateProducts();
    console.log(products)
    if (products.length > 1)
      customError({
        name: "Error mock",
        message: "Error al generar productos de mock",
        cause: "Error en el servidor",
        code: EErrors.PRODUCT_NOT_FOUND,
      });
    res.status(200).json(products);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Server internal error" });
    res.status(500).json({ msg: "Error en el servidor" });
  }
};



export { 
  addProduct, 
  deleteProduct, 
  generateMockingProducts, 
  getAllProducts, 
  getProductById, 
  updateProduct 
};