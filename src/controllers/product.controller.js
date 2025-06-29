'use strict'

const { CREATED } = require('../core/success.response')
//const ProductService = require("../services/product.service")
const ProductServiceV2 = require('../services/product.service.v2')
class ProductController {
  // Create Product
  createProduct = async (req, res, next) => {
    new CREATED({
      message: 'Create new product',
      metadata: await ProductServiceV2.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user?.userId || req.body.product_shop,
      }),
    }).send(res)
  }
}

module.exports = new ProductController()
