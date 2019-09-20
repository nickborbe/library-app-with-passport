const express = require('Express');
const router  = express.Router();

const Book    = require('../models/Book');


// since we have a '/api' prefix in app js attached to this routes file
// this route is actually '/api/books'
router.get('/books/:id', (req, res, next)=>{

    Book.findById(req.params.id).populate('author')
    .then((theBook)=>{

        res.json(theBook)

    })
    .catch((err)=>{
      console.log(err);  
    })


})




// this is /api/books/creation
router.post('/books/creation', (req, res, next)=>{

    

    let title = req.body.theTitle;
    let author = req.body.theAuthor;
    let image = req.body.theImage;


    Book.create({
        title: title,
        author: author,
        image: image,
        creator: req.user._id
    })
    .then((result)=>{

        res.json(result);

    })
    .catch((err)=>{
        next(err);
    })
})



// router.get('/books', (req, res, next)=>{

//     Book.find()
//     .then((allTheBooks)=>{
//         res.json(allTheBooks)
//     })
//     .catch((err)=>{
//         console.log(err);
//     })


// })









module.exports = router;