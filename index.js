import app from "./app.js";
import dbConnect from "./src/config/db.js";

dbConnect();

app.listen(app.get("port") || 3000, () => {
  console.log(`Server connect at port: ${app.get("port")}`);
});
