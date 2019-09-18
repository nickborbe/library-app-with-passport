const mongoose = require('mongoose');
const Schema = mongoose.Schema


const bookSchema = new Schema({

    title: {type: String},
    author: {type: Schema.Types.ObjectId, ref: 'Author'},
    // this tells mongoose that author field will be an ID and the model it will correspond to will be called 'Author'
    image: String,
    creator: {type: Schema.Types.ObjectId, ref: 'User'}

})



const Book = mongoose.model('Book', bookSchema);
//                              |
// mongoose will create a collection called books because we called the model Book
// it takes the word, makes it lower case, and then puts an S on the end



module.exports = Book;


