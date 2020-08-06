require('dotenv').config()
const Mongodb = require('mongodb')
const MongoClient = Mongodb.MongoClient
const uri = process.env.MONGO_URL
let _db

const initDB = (callback) => {
  if (_db) {
    console.log('database is already running')
    callback(null, _db)
  }
  MongoClient.connect(uri,{useUnifiedTopology: true, useNewUrlParser: true})
    .then((client) => {
      _db = client
    })
    .catch((err) => callback(err))
}

const getDB = () => {
  if (!_db) {
    throw Error('db not running')
  }
  return _db
}
module.exports = {
  initDB,
  getDB,
}
