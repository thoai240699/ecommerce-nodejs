'use strict'

const express = require('express')
const { asyncHandler } = require('../../auth/checkAuth')
const productController = require('../../controllers/product.controller')
const router = express.Router()

// Authentication
// router.use(authenticationV2)

// Create
router.post('', asyncHandler(productController.createProduct))
// PUT
router.put('/publish/:id', asyncHandler(productController.publishProductByShop))
router.put(
  '/unpublish/:id',
  asyncHandler(productController.unPublishProductByShop),
)

// QUERY
router.get('/drafts/all', asyncHandler(productController.getAllDraftsForShop))
router.get(
  '/published/all',
  asyncHandler(productController.getAllPublishForShop),
)

module.exports = router
