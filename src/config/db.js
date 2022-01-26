import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "variables.env" });

const dbConnect = async () => {
  const { connect } = mongoose;
  try {
    const db = await connect(process.env.DB_MONGO);
    console.log(`Connect DB ${db.connection.db.databaseName}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default dbConnect;
