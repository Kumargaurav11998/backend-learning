import { Router } from "express";
import userRouter from "./user.routes";
import productRouter from "./product.routes";
import healthRouter from "./health.routes";
import authrouter from "./auth.routes";  

const router = Router();

router.use("/auth",authrouter);
// Backwards compatibility for root paths: /register, /login, /getuser
router.use("/", userRouter);

// Product endpoints: /products/:id
router.use("/products", productRouter);

// Health check endpoint: /health
router.use("/health", healthRouter);

export default router;
