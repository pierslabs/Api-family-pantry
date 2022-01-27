import Pantry from "../models/pantry.js";
import { decodeToken } from "../helper/jwt.js";

export const getPantry = async (req, res) => {
  const user = decodeToken(req);
  const { id } = req.params;

  try {
    const pantry = await Pantry.findOne({ _id: id });

    if (!pantry) {
      throw new Error("Cesta no encontrada");
    }

    console.log(pantry.user_id.toString());
    console.log(user.id);
    if (pantry.user_id.toString() !== user.id) {
      throw new Error("No tienes privilegios para ver esta cesta");
    }

    res.status(200).json(pantry);
  } catch (error) {
    console.log(error);
  }
};

export const getPantrys = async (req, res) => {
  const user = decodeToken(req);

  try {
    const pantrys = await Pantry.find({ user_id: user.id });
    res.status(200).json(pantrys);
  } catch (error) {
    console.log(error);
  }
};

export const createPantry = async (req, res) => {
  const user = decodeToken(req);

  const { name } = req.body;

  try {
    const newPantry = await new Pantry({ name });
    newPantry.user_id = user.id;
    const pantry = await newPantry.save();
    res.status(200).json(pantry);
  } catch (error) {
    console.log(error);
  }
};

export const updatePantry = async (req, res) => {
  const user = decodeToken(req);
  const { id } = req.params;
  const { name } = req.body;

  const findPantry = await Pantry.findOne({ _id: id });

  if (!findPantry) {
    throw new Error("Cesta no encontrada");
  }

  if (findPantry.user_id.toString() !== user.id) {
    throw new Error("No tienes privilegios para actualizar esta cesta");
  }

  try {
    const updatePantry = await Pantry.findOneAndUpdate(
      { _id: id },
      { name },
      {
        new: true,
      }
    );

    res.status(200).json(updatePantry);
  } catch (error) {
    console.log(error);
  }
};

export const deletePantry = async (req, res) => {
  const user = decodeToken(req);
  const { id } = req.params;

  const findPantry = await Pantry.findOne({ _id: id });

  if (!findPantry) {
    throw new Error("Cesta no encontrada");
  }

  if (findPantry.user_id.toString() !== user.id) {
    throw new Error("No tienes privilegios para eliminar esta cesta");
  }

  try {
    await Pantry.findOneAndRemove({ _id: id });
    res.status(200).json("La cesta se ha eliminado correctamente");
  } catch (error) {
    console.log(error);
  }
};
