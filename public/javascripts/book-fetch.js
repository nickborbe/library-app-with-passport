


document.addEventListener('DOMContentLoaded', () => {

    


    const theButtons = document.getElementsByClassName('fetch-details-button');


    for(let i = 0; i < theButtons.length; i++){
        theButtons[i].onclick = function(e){

            const theID = e.currentTarget.dataset.id;

            axios.get("http://localhost:3000/api/books/"+theID)
            .then((info)=>{

                console.log(info.data);


                let newStuff = `
                
                <h2>${info.data.title}</h2>

                <a href= "http://localhost:3000/authors/details/${info.data.author._id}">
                <h4> By: ${info.data.author.name} </h4>
                </a>

                <img  src="${info.data.image}"  style="width: 300px"/>
                
                `





                document.getElementById('deets').innerHTML = newStuff;
            })
            .catch((err)=>{
                console.log(err)
            })
            
        }
    }



    document.getElementById('add-new-book-form').onsubmit = function(e){
        e.preventDefault();

        const title = document.getElementById('new-title').value;
        const author = document.getElementById('new-author').value;
        const image = document.getElementById('new-image').value;

        console.log(title, author, image);

        axios.post('http://localhost:3000/api/books/creation', {
            theTitle: title,
            theAuthor: author,
            theImage: image
        })
        .then((result)=>{

            const theNewBook = result.data;




            let newh2 = document.createElement('h2');
            newh2.innerHTML = `${theNewBook.title}
            <button 
            class = "fetch-details-button"
            data-id = "${theNewBook._id}"
              > See Details </button>`



            let newDelete = document.createElement('form');
            newDelete.innerHTML = `
            <button>Delete This Book</button>
             `
             newDelete.action = `/books/delete/${theNewBook._id}`
             newDelete.method = "POST";

             let newATag = document.createElement('a');

             newATag.innerHTML = "Edit This Book's Info";
             newATag.href = `/books/editbook/${theNewBook._id}`;


            
             document.getElementById('book-list').prepend(newATag);
             document.getElementById('book-list').prepend(newDelete);
             document.getElementById('book-list').prepend(newh2);




        })
        .catch((err)=>{
            console.log(err);
        })



    }







  
  }, false);