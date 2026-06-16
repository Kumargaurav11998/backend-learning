import express from "express";
import router from "./routes/index";

const app = express();

// Global Middlewares
app.use(express.json());

// Main router mounts at root
app.use("/", router);

export default app;
