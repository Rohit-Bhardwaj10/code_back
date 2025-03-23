import mongoose from "mongoose";
import { Dbname } from "../constants.js";

const connectDb = async () => {
  try {
    const connection_instance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${Dbname}`,
    );
    console.log(
      `mongo_db connected !! DB host : ${connection_instance.connection.host}`,
    );
  } catch (error) {
    console.error("mongo_db connection error", error);
    process.exit(1);
  }
};

export default connectDb;
