const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const db = require('../../models');
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  
  console.log(req.body)

  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  db.user.findOne({
    where: {
      email: userData.email
    }
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          db.user.create(userData)
            .then(user => {
              res.json({ status: user.email + 'Registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post("/login", (req, res) => {
    db.user.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
          console.log(user.password)
          console.log(req.body.password)
        if (user) {
          if (bcrypt.compare(req.body.password, user.password)) {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
              expiresIn: 1440,
            });
            res.send(token);
          }
        } else {
          res.status(400).json({ error: "User does not exist" });
        }
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  });
  
  users.get("/profile", (req, res) => {
    var decoded = jwt.verify(
      req.headers["authorization"],
      process.env.SECRET_KEY
    );
  
    db.user.findOne({
      where: {
        id: decoded.id,
      },
    })
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.send("User does not exist");
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
  });

  module.exports = users;