import { getPrisma } from '../libs/prisma.js';

/**
 * GET /product
 * @summary Get list of products
 * @tags Products
 * @param {string} name.query - Filter name
 * @param {string} sortBy.query - sorby field name and price
 * @param {integer} page.query - page number
 * @param {integer} limit.query - number of items per page
 * @return {object} 200 - success response
 * @return {object} 404 - Not found
 */
function getListProduct(req, res) {
    const { name, sortBy, page = 1, limit = 10 } = req.query;
    const filters = { name, sortBy };
    const allFilteredAndSortedProducts = productModel.getAllproducts(filters);

    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const skipIndex = (pageInt - 1) * limitInt;
    const paginatedProducts = allFilteredAndSortedProducts.slice(skipIndex, skipIndex + limitInt);
    const totalProducts = allFilteredAndSortedProducts.length;

    if (totalProducts === 0) {
        return res.status(404).json({
            success: false,
            message: 'No products found',
            currentPage: pageInt,
            totalPages: 0,
            totalProduct: 0,
            data: []
        });
    }

    res.status(200).json({
        success: true,
        message: 'Products retrieved successfully',
        currentPage: pageInt,
        totalPages: Math.ceil(totalProducts / limitInt),
        totalProduct: paginatedProducts.length,
        data: paginatedProducts
    });

}


/**
 * GET /product/{id}
 * @summary Get product by ID
 * @tags Products
 * @param {number} id.path - ID product
 * @return {string} 200 - success response
 */
function getProductById(req, res) {
    const productId = req.params.id;
    const product = productModel.getProductById(productId);
    if (product) {
        res.status(200).json({
            success: true,
            message: 'Product retrieved successfully',
            results: product
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
}

/**
 * DELETE /product/{id}
 * @summary delete product by ID
 * @tags Products
 * @param {number} id.path - ID product
 * @return {string} 200 - success response
 */
function deleteproducbyId(req, res) {
    const productId = req.params.id;
    const isDeleted = productModel.deleteproducbyId(productId); 
    if (isDeleted) {
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
}


/**
 * POST /product/{id}/upload
 * @summary upload image product by ID
 * @tags Products
 * @param {number} id.path - ID product
 * @param {file} image.formData - image file
 * @return {string} 200 - success response
 */
function uploadProductImage(req, res) {
    const productId = req.params.id;

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: 'No file uploaded'
        });
    }
    const imagePath = req.file.path;
    const isUpdated = productModel.uploadProductImage(productId, imagePath);
    if (isUpdated) {
        res.status(200).json({
            success: true,
            message: 'Product image uploaded successfully',
            results: {image: req.file.filename}
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
}

/**
 * Create Product
 * @typedef {object} CreateProduct
 * @property {string} name.required - email
 * @property {number} price.required - username
 */

/**
 * POST /product
 * @summary Add a new product
 * @tags Products
 * @param {CreateProduct} request.body.required
 * @return {object} 200  - Product created successfully
 * @return {object} 400 - Name and price are required
 */
export async function addProduct(req, res) {
    try {
        const prisma = getPrisma();
         const { name, price } = req.body;
        const newProduct = await prisma.product.create({
            data: { name, price}
        });
        res.status(200).json({
            success: true,
            message: 'Product added successfully',
            results: newProduct
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "internal server error",
            results: error.message
        })
    }
}

/**
 * PATCH /product/{id}
 * @summary Update product (partial update)
 * @tags Products
 * @param {number} id.path.required - Product ID
 * @param {CreateProduct} request.body - Fields to update (partial)
 * @return {object} 200 - Product updated successfully
 * @return {object} 404 - Product not found
 */
function editProduct(req, res) {
    const productId = req.params.id;
    const updates = req.body; 

    const isUpdated = productModel.editProduct(productId, updates);

    if (isUpdated) {
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            results: { id: productId, ...updates },
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
}


export default {getListProduct, getProductById, deleteproducbyId, uploadProductImage, editProduct};
