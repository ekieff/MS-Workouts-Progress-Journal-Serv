require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const passport = require('passport');
const JWT_SECRET = process.env.JWT_SECRET;
const db = require('../../models');
const { runInNewContext } = require('vm');
const exercise = require('../../models/exercise');

router.get('/test', (req, res) => {
    res.json({ msg: 'User endpoint OK'});
  });
//not a findone or create, because a playlist may have multiple exercises
router.post('/new', (req, res) =>{
    db.playlistExercises.create({
        playlistId:req.body.playlistId,
        exerciseId: req.body.exerciseId
    })
    .then(playlist =>{
        res.json({ status: playlist + 'created'})
    })
    .catch(err =>{
        res.send('error: ' +err)
    })
})

router.delete('/delete', (req,res) =>{
    db.playlistExercises.destroy({
        where:{
            playlistId:req.body.playlistId,
            exerciseId:req.body.exerciseId
        }
    }).then(playlistExercise =>{
        res.json({status: playlistExercise + 'destroyed'})
    }).catch(err =>{
        res.send('error ' +err)
    })
})

//get route to view the connections of a particular playlist
router.get('/show', (req, res) =>{
    db.playlistExercises.findAll({
        where: {
            playlistId: req.body.playlistId
        }
    }).then(exercises =>{
        res.send(exercises)
    }).catch(err =>{
        res.status(400).json({ error: err})
    })
})

module.exports = router;