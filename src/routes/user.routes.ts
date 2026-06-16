import { Router } from "express";
import { register, login, getUser } from "../controllers/user.controller";
import { validate } from "../middleware/validate.middleware";
import { protectRoute } from "../middleware/auth.middleware";
import { RegisterUserSchema, LoginUserSchema, GetUserSchema } from "../schemas/user.schema";

const router = Router();

// Register route with Zod input validation
router.post("/register", validate(RegisterUserSchema), register);

// Login route with Zod input validation
router.post("/login", validate(LoginUserSchema), login);

// Get User profile route, protected by JWT authentication and input validation
router.post("/getuser", protectRoute, validate(GetUserSchema), getUser);

export default router;
