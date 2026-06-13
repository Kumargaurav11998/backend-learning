import 'dotenv/config';
import mongoose from "mongoose";

const uri = process.env.MONGO_URI;

//const client = new MongoClient(uri);

export const connectDB = async () => {
  try {
        await mongoose.connect(uri);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
  }
};

//export const db = client.db("backend_learning");