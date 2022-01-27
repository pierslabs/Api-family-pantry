import express from "express";
const pantry = express.Router();

import * as pantryCtl from "../controllers/pantry.controller.js";

pantry.get("/pantry/:id", pantryCtl.getPantry);
pantry.get("/pantrys", pantryCtl.getPantrys);
pantry.post("/pantry", pantryCtl.createPantry);
pantry.put("/pantry/:id", pantryCtl.updatePantry);
pantry.delete("/pantry/:id", pantryCtl.deletePantry);

export default pantry;
