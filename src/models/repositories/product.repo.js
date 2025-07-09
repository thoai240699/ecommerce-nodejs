const { Types } = require('mongoose')
const { product, clothing, electronic, furniture } = require('../product.model')
const { getSelectData, getUnSelectData } = require('../../utils/')

const findAllDraftsForShop = async ({ query, limit, skip }) => {
  return await queryProduct({ query, limit, skip })
}
const findAllPublishForShop = async ({ query, limit, skip }) => {
  return await queryProduct({ query, limit, skip })
}
const findAllProduct = async ({ limit, sort, page, filter, select }) => {
  const skip = (page - 1) * limit
  const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
  const products = await product
    .find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(getSelectData(select))
    .lean()

  return products
}
const findProduct = async ({ product_id, unSelect }) => {
  return await product.findById(product_id).select(getUnSelectData(unSelect))
}

const searchProductByUser = async ({ keySearch }) => {
  const regexSearch = new RegExp(keySearch)
  const result = await product
    .find(
      {
        isPublished: true,
        $text: { $search: regexSearch },
      },
      { score: { $meta: 'textScore' } },
    )
    .sort({ score: { $meta: 'textScore' } })
    .lean()
  return result
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
  searchProductByUser,
  findAllProduct,
  findProduct,
}
