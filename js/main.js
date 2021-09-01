const searchInput = document.getElementById('search-input');
const booksContainer = document.getElementById('books-container');


const loadBooks = () => {
    const searchText = searchInput.value;
    console.log(searchText)
    // clear input field 
    searchInput.value = '';

    // load from api 
    fetch('http://openlibrary.org/search.json?q=javascript')
        .then(res => res.json())
        .then(data => displayBooks(data.docs))
};

const displayBooks = (books) => {
    books.forEach(book => {
        // console.log(book.title)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.</p>
            </div>
        </div>
        `;
        booksContainer.appendChild(div)
    })
};