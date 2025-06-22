'use strict'

const { findById } = require('../services/apikey.service')

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
}
//middleware
const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString()
    if (!key) {
      return res.status(403).json({
        message: 'x-api-key header missing',
      })
    }
    // check object key
    const objKey = await findById(key)
    if (!objKey) {
      return res.status(403).json({
        message: 'inactive api-key',
      })
    }
    req.objKey = objKey
    return next()
  } catch (error) {
    return res.status(500).json({
      message: 'apiKey Error',
      error: error.message,
    })
  }
}
const permission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey?.permissions?.length) {
      return res.status(403).json({
        message: 'Permission denied',
      })
    }
    console.log('permission::', req.objKey.permissions)
    const validPermission = req.objKey.permissions.includes(permission)
    if (!validPermission) {
      return res.status(403).json({
        message: 'Permission denied',
      })
    }
    return next()
  }
}

const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}

module.exports = {
  apiKey,
  permission,
  asyncHandler,
}
