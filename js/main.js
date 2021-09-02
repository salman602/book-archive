const searchInput = document.getElementById('search-input');
const booksContainer = document.getElementById('books-container');
const errorField = document.getElementById('error-field');

const loadBooks = () => {
    const searchText = searchInput.value;
    // console.log(searchText)
    // clear input field 
    searchInput.value = '';

    // Error Handling
    if (searchText === '') {
        /* const div = document.createElement('div');
        div.innerText = "Search Field can not be empty. Please input a book name.";
        errorField.appendChild(div) */
        return errorField.innerText = "Search Field can not be empty. Please input a book name.";
    }

    // load from api 
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs))
};

const displayBooks = (books) => {
    const first50Result = books.slice(0, 50);
    booksContainer.textContent = '';

    console.log(books)


    // Error Handling
    if (books.length === 0) {
        return errorField.innerText = "No result found for this search";
    }
    else {
        errorField.innerText = "";

    }

    first50Result.forEach(book => {
        // console.log(book);



        // cover image url 
        const imageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Book Title: ${book.title}</h5>
                <h5 class="card-title">Author: ${book.author_name[0]}</h5>
                <h5 class="card-title">First publish: ${book.first_publish_year}</h5>
                
                
                
            </div>
        </div>
        `;
        booksContainer.appendChild(div)
    })

};
