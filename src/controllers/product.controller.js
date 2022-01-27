import Product from "../models/product.js";
import { decodeToken } from "../helper/jwt.js";

export const getProduct = async (req, res) => {};
export const getProducts = async (req, res) => {};
export const createProduct = async (req, res) => {
  const user = decodeToken(req);

  try {
    const newProduct = await new Product(req.body);
    newProduct.user_id = user.id;
    const product = await newProduct.save();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};
export const updateProduct = async (req, res) => {};
export const deleteProduct = async (req, res) => {};
