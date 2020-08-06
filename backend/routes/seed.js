require('dotenv').config()
const assert = require('assert');
const { ObjectId } = require('mongodb');
const MongoClient = require('mongodb').MongoClient
const objectid = require('mongodb').ObjectId;
const products = [
  {
    _id: new ObjectId(),
    name: 'Stylish Backpack',
    description:
      'A stylish backpack for the modern women or men. It easily fits all your stuff.',
    price: 79.99,
    image: 'http://localhost:3100/images/product-backpack.jpg',
  },
  {
    _id:  new ObjectId(),
    name: 'Lovely Earrings',
    description:
      "How could a man resist these lovely earrings? Right - he couldn't.",
    price: 129.59,
    image: 'http://localhost:3100/images/product-earrings.jpg',
  },
  {
    _id:  new ObjectId(),
    name: 'Working MacBook',
    description:
      'Yes, you got that right - this MacBook has the old, working keyboard. Time to get it!',
    price: 1799,
    image: 'http://localhost:3100/images/product-macbook.jpg',
  },
  {
    _id:  new ObjectId(),
    name: 'Red Purse',
    description: 'A red purse. What is special about? It is red!',
    price: 159.89,
    image: 'http://localhost:3100/images/product-purse.jpg',
  },
  {
    _id:  new ObjectId(),
    name: 'A T-Shirt',
    description:
      'Never be naked again! This T-Shirt can soon be yours. If you find that buy button.',
    price: 39.99,
    image: 'http://localhost:3100/images/product-shirt.jpg',
  },
  {
    _id:  new ObjectId(),
    name: 'Cheap Watch',
    description: 'It actually is not cheap. But a watch!',
    price: 299.99,
    image: 'http://localhost:3100/images/product-watch.jpg',
  },
]

console.log()
const uri =
  process.env.MONGO_URL
 //hs135c9Ysa6itT5Y
MongoClient.connect(uri,{useUnifiedTopology: true, useNewUrlParser: true,})
  .then((client) => {
    console.log('connected')
    client
      .db()
      .collection('products')
      .insertMany(products)
      .then((c) => {
        console.log(c)
      })
  })
  .catch((err) => {
    console.log(err)
    assert(err, null)
  })

