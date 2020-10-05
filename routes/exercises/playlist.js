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

router.post('/new', (req,res) =>{
    console.log('Here is the info arriving at the backend for new', req.body)
    const newPlaylist = {
        name: req.body.name
    }
    db.playlist.findOne({
        where: {
            name: req.body.name,
        }
    })
    .then(playlist =>{
        if(!playlist){
            db.playlist.create(newPlaylist)
            .then(playlist =>{
                res.json({ status: playlist.name + 'Created!' })
            })
            .catch(err =>{
                res.send('error: ' + err)
            })
        } else {
            res.json({ error: 'That playlist already exists!'})
        }
    })
    .catch(err => {
        res.send('error: ' +err)
    })
})

router.get('/all', (req,res) =>{
    console.log('What we looking for fam?')
    db.playlist.findAll()
    .then(playlist =>{
        console.log(playlist)
        res.send(playlist)
    })
})

router.post('/delete', (req, res) =>{
    console.log(req.body)
    db.playlist.destroy({
        where: {id: req.body.playlistId.playlistId}
    }).then(playlist =>{
        console.log(playlist)
    }).catch(err =>{
        res.send('error ' +err)
    })
})


module.exports = router;