'use strict'

const { product, clothing, electronic } = require('../models/product.model')

// Define factory class
class ProductFactory {
  static async createProduct() {}
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
    async createProduct(){
        return await product.create(this);
    }
}

//Define for difference product type clothing
