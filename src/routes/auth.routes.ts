import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { LoginUserSchema, RegisterUserSchema } from "../schemas/user.schema";

import { login, register } from "../controllers/user.controller";

const router = Router();

// Register route with Zod input validation
router.post("/register", validate(RegisterUserSchema), register);

// Login route with Zod input validation
router.post("/login", validate(LoginUserSchema), login);

export default router;