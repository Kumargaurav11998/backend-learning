import { MongoClient } from "mongodb";

const uri = "mongodb://gaurav_admin:Gaurav%40123456@ac-jj6ltzh-shard-00-00.9yzpecz.mongodb.net:27017,ac-jj6ltzh-shard-00-01.9yzpecz.mongodb.net:27017,ac-jj6ltzh-shard-00-02.9yzpecz.mongodb.net:27017/?ssl=true&replicaSet=atlas-103fne-shard-0&authSource=admin&appName=Cluster0";

const client = new MongoClient(uri);

export const connectDB = async () => {
  try {
    await client.connect();
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
  }
};

export const db = client.db("backend_learning");