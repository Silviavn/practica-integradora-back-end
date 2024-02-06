import fs from "fs";
import { __dirname } from "../utils.js";

class ProductsManager {
  constructor() {
    this.path = __dirname + "/managers/data/products.json";
  }

  async getAllProducts() {
    const productsJson = await fs.promises.readFile(this.path, "utf-8");

    if (!productsJson.trim()) {
      return [];
    }

    const productsParse = JSON.parse(productsJson);
    return productsParse;
  }

  async getProductById(id) {
    const products = await this.getAllProducts();
    const product = products.find((product) => product.id === id);

    if (!product) return `No se encontró el producto con el id ${id}`;

    return product;
  }

  async addProduct(product) {
    const { title, price, description, thumbnail, status, stock, code, category } = product;
    const products = await this.getAllProducts();

    const newProduct = {
      id: Date.now(),
      title,
      price,
      description,
      thumbnail,
      status,
      stock,
      code,
      category,
    };

    const checkProductInfo = Object.values(newProduct).includes(undefined);

    if (checkProductInfo) return "Faltan propiedades al producto";

    products.push(newProduct);
    await fs.promises.writeFile(this.path, JSON.stringify(products));

    return products;
  }

  async updateProduct(id, data) {
    const products = await this.getAllProducts();
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) return `No se encontró el producto con el id ${id}`;

    products[productIndex] = {
      ...products[productIndex],
      ...data,
    };

    const checkProductInfo = Object.values(products[productIndex]).includes(undefined);

    if (checkProductInfo) return "Faltan propiedades al producto";

    await fs.promises.writeFile(this.path, JSON.stringify(products));
    return products;
  }

  async deleteProduct(id) {
    const products = await this.getAllProducts();
    const product = products.find((product) => product.id === id);

    if (!product) return `No se encontró el producto con el id ${id}`;

    const productsFilter = products.filter((product) => product.id !== id);

    await fs.promises.writeFile(this.path, JSON.stringify(productsFilter));
    return productsFilter;
  }
}

export const productsManager = new ProductsManager();