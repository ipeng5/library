// Store book ojects in an array and display in book container
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBook();
}

function displayBook() {
    const bookContainer = document.querySelector(".book-container");

    myLibrary.forEach(myLibrary => {
        const card = document.createElement("div");
        card.classList.add("card");
        for (let key in myLibrary) {
            const info = document.createElement("p");
            info.textContent = `${key}: ${myLibrary[key]}`;
            card.appendChild(info);
        }
        bookContainer.appendChild(card);
    })
}



// "Add book" button to open input form
const addBookBtn = document.querySelector("#add-book");
const modalContainer = document.querySelector("#modal-container");
const submit = document.querySelector("#submit");

addBookBtn.addEventListener("click", () => {
    modalContainer.classList.add("show");
})

submit.addEventListener("click", () => {
    modalContainer.classList.remove("show");
})

// Get form data
submit.addEventListener("click", addData);
function addData() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").value;

    // if (!title || !author || !pages) return;
    addBookToLibrary(title, author, pages, read);
}

