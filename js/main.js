// Getting element by id
const searchInput = document.getElementById('search-input');
const booksContainer = document.getElementById('books-container');
const errorField = document.getElementById('error-field');
const resultFound = document.getElementById('result-found');

const loadBooks = () => {
    const searchText = searchInput.value;

    // clear input field 
    searchInput.value = '';

    // Error Handling
    if (searchText === '') {
        // clear field 
        booksContainer.textContent = "";
        resultFound.textContent = "";
        // Error message        
        return errorField.innerText = "Search Field can not be empty. Please type a book name.";
    }

    // load books from through api
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs))
};

const displayBooks = (books) => {
    const first50Result = books.slice(0, 50);
    booksContainer.textContent = '';

    // Error Handling
    if (books.length === 0) {
        // clear field 
        resultFound.textContent = '';
        // Error message
        return errorField.innerText = "No result found for this search";
    }
    else {
        //clear field
        errorField.innerText = "";
    }

    // Show result found
    const newDiv = document.createElement('div')
    resultFound.textContent = '';
    newDiv.innerHTML = `<h4>Result Found: ${books.length}</h4>`;
    resultFound.appendChild(newDiv);

    // loop for getting single book
    first50Result.forEach(book => {
        // cover image dynamic url 
        const imageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Book Title: ${book.title}</h5>
                <h6 class="card-title">Author: ${book.author_name[0]}</h6>
                <h6 class="card-title">Publisher: ${book.publisher[0]}</h6>
                <p class="card-title">First publish: ${book.first_publish_year}</p>                
            </div>
        </div>
        `;
        booksContainer.appendChild(div);
    });
};
