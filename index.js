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
import { resgister } from "./src/register.ts";
import { connectDB } from "./src/db/db.js";

import express from "express";

const app = express();
app.use(express.json());
await connectDB();
// app.get("/health", health);

//app.get("/products/:id",getProduct);

//==== post api ===//
app.post("/register", resgister);
app.listen(3000, () => {
  console.log("Server started");
});