import express from "express";
import Auth from "./src/routes/auth.routes.js";

const app = express();

app.set("port", 3000);
app.use(express.json());
app.use("/", Auth);

export default app;
