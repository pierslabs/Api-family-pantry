import express from "express";
import Auth from "./src/routes/auth.routes.js";
import User from "./src/routes/user.routes.js";
import Pantry from "./src/routes/pantry.routes.js";
const app = express();

app.set("port", 3000);
app.use(express.json());
app.use("/", Auth);
app.use("/", User);
app.use("/", Pantry);

export default app;
