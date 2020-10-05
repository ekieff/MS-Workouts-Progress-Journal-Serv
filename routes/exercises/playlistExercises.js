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
    console.log({ msg: 'User endpoint OK'});
  });
//not a findone or create, because a playlist may have multiple exercises
router.post('/new', (req, res) =>{
    console.log(req.body)
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
            playlistId:req.body.deleteExercise.playlistId,
            exerciseId:req.body.deleteExercise.exerciseId
        }
    }).then(playlistExercise =>{
        res.json({status: playlistExercise + 'destroyed'})
    }).catch(err =>{
        res.send('error ' +err)
    })
})

//get route to view the connections of a particular playlist
router.post("/show", (req, res) =>{
    db.playlist.findAll({
        include:[{
            model:db.exercise, as: 'exercises'
        }],
        where: {
            id: req.body.playlistId
        }
        
    }).then(exercises =>{
        if (exercises[0].exercises[0]){
            exerciseList = []
            for (i=0; i<(exercises.length); i++){
                eachExercise = {
                    id: exercises[0].get().exercises[i].get().id,
                    exerciseTitle: exercises[0].get().exercises[i].get().exerciseTitle
                }
                exerciseList.push(eachExercise)
        }
            const playlistObject = {
                playlistName: exercises[0].get().name,
                exerciseList: exerciseList
            }
            console.log(playlistObject)
            res.send(playlistObject)
        }else{
                exerciseList = []
                eachExercise ={
                        id: '',
                        exerciseTitle: 'Sorry there are not any exercises right now'
                    }
                exerciseList.push(eachExercise)
                const playlistObject = {
                    playlistName: exercises[0].get().name,
                    exerciseList: exerciseList
                }
                console.log(playlistObject)
                res.send(playlistObject) 
            }
        })
        .catch((err) =>{
            res.send('error ' +err)
        })
        })



module.exports = router;