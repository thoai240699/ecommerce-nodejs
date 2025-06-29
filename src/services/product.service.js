'use strict'

const { BadRequestError } = require('../core/error.response')
const {
  product,
  clothing,
  electronic,
  furniture,
} = require('../models/product.model')

// Factory pattern
class ProductFactory {
  /*
    type: Clothing, Electronic
    payload
  */
  static async createProduct(type, payload) {
    switch (type) {
      case 'Electronic':
        return new Electronic(payload).createProduct()
      case 'Clothing':
        return new Clothing(payload).createProduct()
      default:
        throw new BadRequestError(`Invalid type of product: ${type}`)
    }
  }
}

//Define base product
class Product {
  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_shop,
    product_attributes,
  }) {
    this.product_name = product_name
    this.product_thumb = product_thumb
    this.product_description = product_description
    this.product_price = product_price
    this.product_quantity = product_quantity
    this.product_type = product_type
    this.product_shop = product_shop
    this.product_attributes = product_attributes
  }
  //Create
  async createProduct(product_id) {
    return await product.create({ ...this, _id: product_id }) // Id of type product is id of product
  }
}

//Define for difference product type
// Clothing
// Cần xử lý khi tạo product lỗi mà vẫn tạo clothing trong cơ sở dữ liệu
class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothing.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    })
    if (!newClothing) throw new BadRequestError('create clothing error')

    const newProduct = await super.createProduct(newClothing._id)
    if (!newProduct) throw new BadRequestError('create product error')

    return newProduct
  }
}
// electronic
class Electronic extends Product {
  async createProduct() {
    const newElectronic = await electronic.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    })
    if (!newElectronic) throw new BadRequestError('create electronic error')

    const newProduct = await super.createProduct(newElectronic._id)
    if (!newProduct) throw new BadRequestError('create product error')

    return newProduct
  }
}
// Furniture
class Furniture extends Product {
  async createProduct() {
    const newFurniture = await furniture.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    })
    if (!newFurniture) throw new BadRequestError('create furniture error')

    const newProduct = await super.createProduct(newFurniture._id)
    if (!newProduct) throw new BadRequestError('create product error')

    return newProduct
  }
}

module.exports = ProductFactory
