import express from "express";
import * as productCtl from "../controllers/product.controller.js";

const product = express.Router();

product.post("/product", productCtl.createProduct);

export default product;
