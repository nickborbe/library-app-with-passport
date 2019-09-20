const express = require('express');
const router  = express.Router();

const Book    = require('../models/Book');
const Author  = require('../models/Author'); 



router.get('/books', (req, res, next)=>{

    // if(!req.user){
    //     req.flash('error', "please login to view book selection")
    //     res.redirect('/login');
    // }

        // if(req.session.counter){
        //     req.session.counter++;
        // }else{
        //     req.session.counter = 1;
        // }
        // this is a useless example of how oyu can edit the session whenever/however you want

    Author.find()
    .then((allAuthors)=>{

    Book.find()
    .then((allTheBooks)=>{




        allTheBooks.forEach((eachBook)=>{

            if(req.user){
   
                if(eachBook.creator.equals(req.user._id) || req.user.isAdmin){
                    eachBook.mine = true;
                    // now we are attaching a .mine key to all the books who have a creator equal to currently logged in user's ID
                    // and also, if currently logged in user isAdmin, were attaching it to all of them
                }
            }
        })


        res.render('book-views/books-list', {books: allTheBooks.reverse(), allTheAuthors: allAuthors})

        })
    })
    .catch((err)=>{
        next(err);
    })


})


router.get('/books/details/:theid', (req, res, next)=>{
    let id = req.params.theid
    Book.findById(id).populate('author')
    .then((bookObject)=>{
        res.render('book-views/details', {theBook: bookObject})
    })
    .catch((err)=>{
        next(err);
    })
})

// get route to view page to create new books
router.get('/books/create-new-book', (req, res, next)=>{

    if(!req.user){
        req.flash('error', 'sorry you must be logged in to add a book to the Database');
        res.redirect('/login');
    }

    // we need a list of all the authors on this page so we do
    Author.find()
    .then((result)=>{
        
        res.render('book-views/new-book', {allTheAuthors: result});
    })
    .catch((err)=>{
        next(err)
    })
})


router.post('/books/creation', (req, res, next)=>{

    console.log('=-=-=--=--=', req.body)

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

        res.redirect('/books')
        //its literally sending us to localhost:3000/books

    })
    .catch((err)=>{
        next(err);
    })
})


router.post('/books/delete/:id', (req, res, next)=>{
    let id = req.params.id;

    Book.findByIdAndRemove(id)
    .then((result)=>{
        res.redirect('/books')
    })
    .catch((err)=>{
        next(err)
    })
})


router.get('/books/editbook/:id', (req, res, next)=>{
    let id=req.params.id;

    Book.findById(id)
    .then((theBook)=>{
        Author.find()
        .then((allAuthors)=>{

            allAuthors.forEach((eachAuthor)=>{
                if(eachAuthor._id.equals(theBook.author)){
                    // we're not allowed to use === to compare IDs
                    // just because mongoose wont let you
                    // but instead they have their own method called .equals
                    
                    eachAuthor.isTheChosenOne = true;
                }
            })

            res.render('book-views/edit', {book: theBook, authors:allAuthors})
        })
        .catch((err)=>{
            next(err);
        })
    })
    .catch((err)=>{
        next(err)
    })
})


router.post('/books/update/:id', (req, res, next)=>{

    let id=req.params.id;

    Book.findByIdAndUpdate(id, {

        title: req.body.theTitle,
        author: req.body.theAuthor,
        image: req.body.theImage

    })
    .then((result)=>{
        res.redirect('/books/details/'+id)
    })
    .catch((err)=>{
        next(err);
    })

})









module.exports = router;
