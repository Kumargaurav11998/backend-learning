import express from "express";
import router from "./routes/index";
import { globalErrorHandler } from "./middleware/error.middleware";

const app = express();

// Global Middlewares
app.use(express.json());

// Main router mounts at root
app.use("/", router);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
