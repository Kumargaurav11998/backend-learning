// import {add,subtract} from "./src/math"

// import express from "express";

// console.log("add ",add(5,5));
// console.log("subtract ",subtract(5,5));


// const app = express();

// app.get("/health", (req, res) => {
//   res.send("Server Running");
// });

// app.listen(3000, () => {
//   console.log("Server started");
// });
import { health } from "./src/health.ts";
import { getProduct } from "../backend-learning/src/products.ts";
//simport { resgister } from "./src/register.ts";
import {getUser,register,login} from "./src/controller/user.ts";
import { connectDB } from "./src/db/db.js";

import express from "express";
import user from "./src/modal/user.ts";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
await connectDB();
// app.get("/health", health);

//app.get("/products/:id",getProduct);

//==== post api ===//
app.post("/register", register);
app.post('/login',login)
app.post("/getuser",  getUser,)
app.listen(3000, () => {
  console.log("Server started");
});