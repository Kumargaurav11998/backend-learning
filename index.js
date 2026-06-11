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

import express from "express";

const app = express();

app.get("/health", health);


app.listen(3000, () => {
  console.log("Server started");
});