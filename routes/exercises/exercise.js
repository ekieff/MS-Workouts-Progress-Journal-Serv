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

router.get('/all', (req,res) =>{
    console.log('Lets see some stuff')
    db.exercise.findAll()
    .then(exercise =>{
        res.send(exercise)
    })
})

router.post('/new', (req,res) =>{
    console.log('Here is the info arriving at the backend for new', req.body)
    const newExercise = {
        exerciseTitle: req.body.exerciseTitle,
        type: req.body.type,
        videoAddress: req.body.videoAddress
    }
    db.exercise.findOne({
        where: {
            exerciseTitle: req.body.exerciseTitle,
        }
    })
    .then(exercise =>{
        if(!exercise){
            db.exercise.create(newExercise)
            .then(exercise =>{
                res.json({ status: exercise.exerciseTitle + 'Created!' })
            })
            .catch(err =>{
                res.send('error: ' + err)
            })
        } else {
            res.json({ error: 'That exercise already exists!'})
        }
    })
    .catch(err => {
        res.send('error: ' +err)
    })
})


module.exports = router;