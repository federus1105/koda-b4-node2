import { Router } from "express";
import authRoutes from "./auth.router.js"
import productRoutes from "./products.router.js"


const router = Router();

router.use('/auth', authRoutes);
router.use('/product', productRoutes);

export default router;