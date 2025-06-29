'use strict'

const { CREATED } = require("../core/success.response")
const ProductFactory = require("../services/product.service")

class ProductController {
    
    // Create Product
    createProduct = async (req, res, next)=>{
        new CREATED({
            message: 'Create new product',
            metadata: await ProductFactory.createProduct(req.body.product_type, {
                ...req.body,
                product_shop: req.user?.userId || req.body.product_shop
            })
        }).send(res)
    }

}

module.exports = new ProductController()