const products = [
    { id: 1, name: 'Laptop', price: 999.99, image: null },
    { id: 2, name: 'Smartphone', price: 499.99, image: null },
    { id: 3, name: 'Tablet', price: 299.99, image: null },
    { id: 4, name: 'Headphones', price: 199.99, image: null},
    { id: 5, name: 'Smartwatch', price: 199.99, image: null}
];

function getAllproducts(filters){
    let filteredProducts = [...products];
    // --- 1. SEARCH ---
    if (filters.name) {
        const searchLower = filters.name.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchLower)
        );
    }

    // --- 2. SORT ---
    if (filters.sortBy) {
          const field = filters.sortBy
        
        filteredProducts.sort((a, b) => {
            if (a[field] < b[field]) return -1;
            if (a[field] > b[field]) return 1;
            return 0;
        });
    } else {
        filteredProducts.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
        
    }

    return filteredProducts
}

function getProductById(id){
    return products.find(product => product.id === parseInt(id));
}

function deleteproducbyId(id){
    const index = products.findIndex(product => product.id === parseInt(id));
    if (index !== -1) {
        products.splice(index, 1);
        return true;
    }
}

function uploadProductImage(id, imagePath) {
    const product = getProductById(id); 
    if (product) {
        product.image = imagePath;
        return true;
    }
    return false;
}

function addProduct(name, price) {
    const newId = products.length ? products[products.length - 1].id + 1 : 1;
    const newProduct = { id: newId, name, price, image: null };
    products.push(newProduct);
    return newProduct;
}

function editProduct(id, updates) {
    const product = getProductById(id);
    if (!product) {
        return false;
    }

    if (updates.name !== undefined) {
        product.name = updates.name;
    }

    if (updates.price !== undefined) {
        product.price = updates.price;
    }

    return true;
}

export default{ getAllproducts, products, getProductById, deleteproducbyId, uploadProductImage, addProduct, editProduct}
