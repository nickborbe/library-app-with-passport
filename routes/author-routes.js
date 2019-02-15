const express = require('express');
const router  = express.Router();

const Author = require('../models/Author')



router.get('/authors', (req, res, next)=>{
    Author.find()
    .then((result)=>{

        res.render('author-views/list', {authors: result})

    })
    .catch((err)=>{
        next(err);
    })


})


router.get('/authors/details/:theid', (req, res, next)=>{
    let id = req.params.theid


    Author.findById(id)
    .then((result)=>{

        res.render('author-views/one-single-author', {theAuthor: result})

    })
    .catch((err)=>{
        next(err);
    })
})




module.exports = router;
