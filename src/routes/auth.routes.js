import express from "express";
import * as AuthCtl from "../controllers/auth.controller.js";
const auth = express.Router();

auth.post("/signup", AuthCtl.signUp);
auth.post("/login", AuthCtl.login);

export default auth;
