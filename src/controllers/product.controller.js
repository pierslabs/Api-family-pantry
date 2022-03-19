import Product from "../models/product.js";
import Pantry from "../models/pantry.js";

import { decodeToken } from "../helper/jwt.js";

export const getProduct = async (req, res) => {
  const user = decodeToken(req);
  const { id } = req.params;

  const findProduct = await Product.findOne({ _id: id });

  if (!findProduct) {
    res.status(400).json("Producto no encontrado");
  }

  if (findProduct.user_id.toString() !== user.id) {
    res.status(400).json("No tienes privilegios para ver este producto");
  }

  res.status(200).json(findProduct);
};

export const getAllProducts = async (req, res) => {};

export const createProduct = async (req, res) => {
  const user = decodeToken(req);
  const { pantryid } = req.params;

  const findPantry = await Pantry.findOne({ _id: pantryid });

  if (!pantryid) {
    throw new Error("Cesta no encontrada");
  }

  if (findPantry.user_id.toString() !== user.id) {
    throw new Error(
      "No dispones de credenciales para agregar productos a esta cesta"
    );
  }

  try {
    const newProduct = await new Product(req.body);
    newProduct.user_id = user.id;
    newProduct.pantry_id = pantryid;
    const product = await newProduct.save();

    findPantry.products.push(product._id);
    await findPantry.save();

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req, res) => {
  const user = decodeToken(req);
  const { id } = req.params;

  try {
    const findProduct = await Product.findOne({ _id: id });

    if (!findProduct) {
      throw new Error("Producto no encontrado");
    }

    if (findProduct.user_id.toString() !== user.id) {
      throw new Error("No tienes privilegios para eliminar este producto");
    }

    await Product.findByIdAndRemove({ _id: id });
    res.status(200).json("Producto eliminado correctamente");
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllProducts = async (req, res) => {
  const user = decodeToken(req);

  const { pantryid } = req.params;

  const pantry = await Pantry.findOne({ _id: pantryid });

  if (!pantry) {
    throw new Error("Cesta no encontrada");
  }

  if (pantry.user_id.toString() !== user.id) {
    throw new Error("No tienes privilegios para realizar esta acción");
  }

  for await (const product of pantry.products) {
    const productId = product.toString();

    pantry.products = [];
    await pantry.save();

    await Product.findOneAndRemove({ _id: productId });
  }

  res.status(200).json("Los productos de esta cesta han sido eliminados");
};
