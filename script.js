let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read)
    myLibrary.push(book)
}

function displayBook() {
    const bookContainer = document.querySelector(".book-container");
    myLibrary.forEach(myLibrary => {
        const card = document.createElement("div");
        card.classList.add("card");
        bookContainer.appendChild(card);
        for (let key in myLibrary) {
            const content = document.createElement("p");
            content.textContent = `${key}: ${myLibrary[key]}`;
            card.appendChild(content);
        }

    })
}


displayBook() 