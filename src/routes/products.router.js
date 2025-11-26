import express from 'express';
import productControllers from '../controllers/products.controllers.js'
import upload from '../libs/upload.js'
import { addProduct } from '../controllers/products.controllers.js';
import { productValidation } from '../utils/validators.js';
import { validate } from '../libs/validate.js';

const router = express.Router();

router.post('/', productValidation,validate, addProduct)
router.get('/', productControllers.getListProduct);
router.get('/:id', productControllers.getProductById);
router.delete('/:id', productControllers.deleteproducbyId);
router.patch('/:id', productControllers.editProduct)
router.post('/:id/upload', upload.single('image'), productControllers.uploadProductImage);


export default router;