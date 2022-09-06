"use strict";

// Store book objects in an array and display in book container
let myLibrary = [];

// Object constructor for books
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Push new books to the array
function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBook();
}

function displayBook() {
    const bookContainer = document.querySelector(".book-container");
    const lastBook = myLibrary.length - 1;
    const newBook = myLibrary[lastBook];
    const card = document.createElement("div");
    card.classList.add("card");
    bookContainer.appendChild(card);

    const title = document.createElement("p");
    title.textContent = `Title: ${newBook.title}`
    card.appendChild(title);
    const author = document.createElement("p");
    author.textContent = `Author: ${newBook.author}`
    card.appendChild(author);
    const pages = document.createElement("p");
    pages.textContent = `Number of pages: ${newBook.pages}`
    card.appendChild(pages);

    // Create Read button to card
    const readBtn = document.createElement("button");
    readBtn.classList.add("readBtn");
    if (newBook.read === false) {
        readBtn.textContent = "Not read";
        readBtn.style.backgroundColor = "red";
    } else {
        readBtn.textContent = "Read";
        readBtn.style.backgroundColor = "green";
    }
    card.appendChild(readBtn);

    // Toggle read button to change status
    readBtn.addEventListener("click", (e) => {
        if (readBtn.style.backgroundColor == "green") {
            readBtn.style.backgroundColor = "red";
            readBtn.textContent = "Not read"
        } else {
            readBtn.style.backgroundColor = "green";
            readBtn.textContent = "Read"
        }
    })

    // Create remove button to card
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("removeBtn");
    removeBtn.textContent = "X";
    card.appendChild(removeBtn);

    // Remove the card when clicking 'x'
    removeBtn.addEventListener("click", (e) => {
        e.target.closest(".card").remove();
    })
}

// "Add book" button to open input form
const addBookBtn = document.querySelector("#add-book");
const modalContainer = document.querySelector("#modal-container");
const submit = document.querySelector("#submit");
addBookBtn.addEventListener("click", () => {
    modalContainer.classList.add("show");
})

// Submit button to not submit but instead add data to the array
submit.addEventListener("click", (e) => {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").checked;
    if (!title || !author || !pages) return;
    addBookToLibrary(title, author, pages, read);
    e.preventDefault();
    modalContainer.classList.remove("show");
});

// Cancel button to cancel the input form
const cancel = document.querySelector("#cancel");
cancel.addEventListener("click", (e) => {
    e.preventDefault();
    modalContainer.classList.remove("show");
})