import { Router } from "express";
import { getdevice } from "../controllers/device.controller";
const router = Router();

router.get("/", getdevice);

export default router;