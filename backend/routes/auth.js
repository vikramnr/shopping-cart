const Router = require('express').Router
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../db')
const router = Router()

const createToken = () => {
  return jwt.sign({}, 'secret', { expiresIn: '1h' })
}

router.post('/login', (req, res, next) => {
  const email = req.body.email
  const pw = req.body.password
  db.getDB()
    .db()
    .collection('user')
    .findOne({ email: email })
    .then((usr) => {
      return bcrypt.compare(pw, usr.hashedPW)
    })
    .then((resp) => {
      if (!resp) {
        throw Error()
      }
      const token = createToken()
      res.status(200).json({ token: token, user: { email: email } })
    })
    .catch(() => {
      res.status(401).json({
        message: 'Authentication failed, invalid username or password.',
      })
    })
})

router.post('/signup', (req, res, next) => {
  const email = req.body.email
  const pw = req.body.password
  // Hash password before storing it in database => Encryption at Rest
  bcrypt
    .hash(pw, 12)
    .then((hashedPW) => {
      // Store hashedPW in database
      const token = createToken()
      db.getDB()
        .db()
        .collection('user')
        .insertOne({ email: email, hashedPW: hashedPW })
        .then(() => {
          res.status(201).json({ token: token, user: { email: email } })
        })
        .catch((err) => {
          console.log(err)
          res.status(500).json({ message: 'Creating the user failed.' })
        })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Creating the user failed.' })
    })
})

module.exports = router
