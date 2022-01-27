import express from "express";
import * as UserCtl from "../controllers/user.controller.js";
const user = express.Router();

user.get("/user", UserCtl.getUser);
user.put("/user", UserCtl.updateUser);
user.delete("/user", UserCtl.deleteUser);

export default user;
