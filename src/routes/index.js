import { Router } from "express";
import authRoutes from "./auth.router.js"
import productRoutes from "./products.router.js"
import authMiddleware from "../middleware/auth.midlleware.js";


const router = Router();

router.use('/auth', authRoutes);
router.use('/product', authMiddleware, productRoutes);

export default router;