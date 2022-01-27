import express from "express";
import * as productCtl from "../controllers/product.controller.js";

const product = express.Router();

product.post("/:pantryid/product", productCtl.createProduct);
product.get("/product/:id", productCtl.getProduct);
product.delete("/product/:id", productCtl.deleteProduct);
product.delete("/:pantryid/products", productCtl.deleteAllProducts);

export default product;
