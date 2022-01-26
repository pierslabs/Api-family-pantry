import { MongoCursorInUseError } from "mongodb";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  const { email, password } = req.body;
  const findUSer = await User.findOne({ email });

  if (findUSer) {
    throw new Error("El usuario ya existe");
  }

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(password, salt);

  try {
    const newUser = await new User(req.body);
    const user = await newUser.save();
    res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  res.send("soy login");
};
