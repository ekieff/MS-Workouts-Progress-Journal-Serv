require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const passport = require('passport');
const JWT_SECRET = process.env.JWT_SECRET;
const db = require('../../models');
const { runInNewContext } = require('vm');

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

router.post('/delete', (req,res) =>{
    db.exercise.destroy({
        where:{
            id: req.body.exerciseId
        }
    }).then(exercise =>{
        res.json({status: exercise + 'destroyed'})
    }).catch(err =>{
        res.send('error ' +err)
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

router.post('/show', (req, res) =>{
    db.exercise.findOne({
        where:{
            id: req.body.exerciseId
        }
    }).then(exercise =>{
        console.log(exercise)
        res.send(exercise)
    }).catch(err =>{
        res.send('error: ' +err)
    })
})

router.post('/update', (req, res) =>{
    console.log(req.body)
    db.exercise.update(
    { exerciseTitle: req.body.exercise.exerciseTitle,
        type: req.body.exercise.type,
        videoAddress: req.body.videoAddress },
    {where: {id: req.body.id}}
    )
    .then(exercise =>{
        res.send(exercise)
    }).catch(err =>{
        res.send('error: '+err)
    })
})


module.exports = router;