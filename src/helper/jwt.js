import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "varibles.env" });

export const createToken = (user, secret, expiresIn) => {
  const { id, email, name } = user;
  return jwt.sign({ id, email, name }, secret, { expiresIn });
};

export const decodeToken = (req) => {
  const token = req.headers["authorization"];

  if (token) {
    try {
      const user = jwt.verify(token.replace("Bearer ", ""), process.env.SECRET);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
};
