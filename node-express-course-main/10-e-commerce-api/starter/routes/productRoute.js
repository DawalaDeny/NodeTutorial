const express = require('express');
const router = express.Router();
const {authenticateUser, authorizePermissions} = require('../middleware/authentication')
const { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, uploadImage
} = require ('../controllers/productController')

router.route('/')
.post([authenticateUser, authorizePermissions('admin', 'owner')], createProduct)
.get(getAllProducts);

router.route('/uploadImage')
.post([authenticateUser, authorizePermissions('admin', 'owner')], uploadImage)

router.route('/:id')
.get(getSingleProduct)
.patch([authenticateUser, authorizePermissions('admin', 'owner')], updateProduct)
.delete([authenticateUser, authorizePermissions('admin', 'owner')], deleteProduct)

module.exports = router;