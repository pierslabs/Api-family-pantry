import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { createToken } from "../helper/jwt.js";
import dotenv from "dotenv";

dotenv.config({ path: "variables.env" });

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
  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({ email });

    if (!findUser) {
      res.json("El usuario no existe");
    }

    const verifyPass = await bcrypt.compare(password, findUser.password);

    if (!verifyPass) {
      res.json("El email o el password no son correctos");
    }

    const token = createToken(findUser, process.env.SECRET, "48h");

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
};
