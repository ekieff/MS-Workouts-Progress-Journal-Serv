require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const passport = require('passport');
const JWT_SECRET = process.env.JWT_SECRET;
const db = require('../../models');

router.get('/test', (req, res) => {
    res.json({ msg: 'User endpoint OK'});
  });

router.post('/playlist/new', (req,res) =>{
    res.json({
        name: req.body.name,
        exerciseId: req.body.exercise
    })
})


module.exports = router;