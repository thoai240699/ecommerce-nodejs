'use strict'

const { CREATED, OK } = require('../core/success.response')
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

  // PUT - Update product status to published
  publishProductByShop = async (req, res, next) => {
    new OK({
      message: 'publish product success',
      metadata: await ProductServiceV2.publishProductByShop({
        //product_shop: req.user?.userId,
        product_id: req.params.id,
      }),
    }).send(res)
  }

  // PUT - Update product status to unpublished
  unPublishProductByShop = async (req, res, next) => {
    new OK({
      message: 'UnPublish product success',
      metadata: await ProductServiceV2.unPublishProductByShop({
        //product_shop: req.user?.userId,
        product_id: req.params.id,
      }),
    }).send(res)
  }

  // Query
  /**
   * @description Get all draff for shop
   * @param {Number} limit
   * @param {Number} skip
   * @return {JSON}
   */
  getAllDraftsForShop = async (req, res, next) => {
    new OK({
      message: 'Get list draft for shop success',
      metadata: await ProductServiceV2.findAllDraftsForShop({
        // Sau này nếu có xác thực sẽ bỏ query.product_shop
        product_shop: req.user?.userId || req.query.product_shop, // Fix error  undefined (reading 'userId'
      }),
    }).send(res)
  }

  getAllPublishForShop = async (req, res, next) => {
    new OK({
      message: 'Get list publish for shop success',
      metadata: await ProductServiceV2.findAllPublishForShop({
        // Sau này nếu có xác thực sẽ bỏ query.product_shop
        product_shop: req.user?.userId || req.query.product_shop, // Fix error  undefined (reading 'userId'
      }),
    }).send(res)
  }

  getListSearchProduct = async (req, res, next) => {
    new OK({
      message: 'Get list Search Product  success',
      metadata: await ProductServiceV2.getListSearchProduct(req.params),
    }).send(res)
  }
  getAllProduct = async (req, res, next) => {
    new OK({
      message: 'Get list all Product  success',
      metadata: await ProductServiceV2.findAllProduct(req.query),
    }).send(res)
  }
  findProduct = async (req, res, next) => {
    new OK({
      message: 'Get Product  success',
      metadata: await ProductServiceV2.findProduct({
        product_id: req.params.product_id,
      }),
    }).send(res)
  }
}

module.exports = new ProductController()
