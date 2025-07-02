const { Types } = require('mongoose')
const { product, clothing, electronic, furniture } = require('../product.model')

const findAllDraftsForShop = async ({ query, limit, skip }) => {
  return await queryProduct({ query, limit, skip })
}
const findAllPublishForShop = async ({ query, limit, skip }) => {
  return await queryProduct({ query, limit, skip })
}

const publishProductByShop = async ({ product_id }) => {
  const foundProduct = await product.findOne({
    //product_shop: new Types.ObjectId(product_shop),
    _id: new Types.ObjectId(product_id),
  })
  if (!foundProduct) return null

  foundProduct.isDraft = false
  foundProduct.isPublished = true
  const { modifiedCount } = await foundProduct.updateOne(foundProduct)

  return modifiedCount
}

const unPublishProductByShop = async ({ product_id }) => {
  const foundProduct = await product.findOne({
    //product_shop: new Types.ObjectId(product_shop),
    _id: new Types.ObjectId(product_id),
  })
  if (!foundProduct) return null

  foundProduct.isDraft = true
  foundProduct.isPublished = false
  const { modifiedCount } = await foundProduct.updateOne(foundProduct)

  return modifiedCount
}

const queryProduct = async ({ query, limit, skip }) => {
  return await product
    .find(query)
    .populate('product_shop', 'name email -_id')
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec()
}

module.exports = {
  findAllDraftsForShop,
  findAllPublishForShop,
  publishProductByShop,
  unPublishProductByShop,
}
