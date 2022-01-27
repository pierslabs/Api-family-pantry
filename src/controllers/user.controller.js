import User from "../models/user.js";
import { decodeToken } from "../helper/jwt.js";

export const getUser = async (req, res) => {
  const user = decodeToken(req);

  if (!user) {
    throw new Error("Hemos tenido un error con el usuario");
  }

  res.status(200).json(user);
};

export const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = decodeToken(req);
  try {
    const updateUser = await User.findOneAndUpdate(
      user.id,
      {
        name,
        email,
        password,
      },
      { new: true }
    );

    res.status(200).json({ updateUser });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  const user = decodeToken(req);

  try {
    await User.findOneAndRemove({ _id: user.id });
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.log(error);
  }
};
