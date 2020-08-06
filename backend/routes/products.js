const Router = require('express').Router
const router = Router()

const decimal = require('mongodb').Decimal128
const ObjectId = require('mongodb').ObjectId
const db = require('../db')

// Get list of products products
router.get('/', (req, res, next) => {
  const queryPage = req.query.page
  const pageSize = 2
  let products = []
  
  db.getDB()
    .db()
    .collection('products')
    .find({})
    .sort({ price: -1 })
    // .skip((queryPage - 1) * pageSize)
    // .limit(pageSize)
    .forEach((product) => {
      product.price = product.price.toString()
      products.push(product)
    })
    .then((c) => {
      res.status(201).json(products)
    })
    .catch((err) => {
      console.log(err)
      res.status(404).json({ message: err })
    })
})

// Get single product
router.get('/:id', (req, res, next) => {
  db.getDB()
    .db()
    .collection('products')
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((c) => {
      c.price = c.price.toString()
      res.status(201).json(c)
    })
    .catch((err) => {
      console.log(err)
      res.status(404).json({ message: err })
    })
})

// Add new product
// Requires logged in user
router.post('', (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    price: decimal.fromString(req.body.price.toString()), // store this as 128bit decimal in MongoDB
    image: req.body.image,
  }
  db.getDB()
    .db()
    .collection('products')
    .insertOne(newProduct)
    .then((c) => {
      res
        .status(201)
        .json({ message: 'Product added', productId: c.insertedId })
    })
    .catch((err) => {
      console.log(err)
      res.status(201).json({ message: err })
      assert(err, null)
    })
})

// Edit existing product
// Requires logged in user
router.patch('/:id', (req, res, next) => {
  const updatedProduct = {
    name: req.body.name,
    description: req.body.description,
    price: decimal.fromString(req.body.price.toString()), // store this as 128bit decimal in MongoDB
    image: req.body.image,
  }
  db.getDB()
    .db()
    .collection('products')
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updatedProduct })
    .then((c) => {
      res
        .status(201)
        .json({ message: 'Product Updated', productId: req.params.id })
    })
    .catch((err) => {
      console.log(err)
      res.status(201).json({ message: err })
    })
})

// Delete a product
// Requires logged in user
router.delete('/:id', (req, res, next) => {
  db.getDB()
    .db()
    .collection('products')
    .deleteOne({ _id: new ObjectId(req.params.id) })
    .then((c) => {
      res.status(201).json({ message: 'Product deleted' })
    })
    .catch((err) => {
      console.log(err)
      res.status(201).json({ message: err })
    })
})

module.exports = router
