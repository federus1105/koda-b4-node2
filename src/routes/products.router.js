import express from 'express';
import productControllers from '../controllers/products.controllers.js'
import upload from '../libs/upload.js'

const router = express.Router();

router.get('/', productControllers.getListProduct);
router.get('/:id', productControllers.getProductById);
router.delete('/:id', productControllers.deleteproducbyId);
router.post('/', productControllers.addProduct)
router.patch('/:id', productControllers.editProduct)
router.post('/:id/upload', upload.single('image'), productControllers.uploadProductImage);


export default router 