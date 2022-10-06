// Store book objects in an array and display in book container
let myLibrary = [];

// Class for books
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// Push new books to the array
function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
  setLocalStorage();
  displayBook();
}

function displayBook() {
  const bookContainer = document.querySelector('.book-container');
  const lastBook = myLibrary.length - 1;
  const newBook = myLibrary[lastBook];
  const card = document.createElement('div');
  card.classList.add('card');
  bookContainer.appendChild(card);
  const title = document.createElement('p');
  title.textContent = `${newBook.title}`;
  card.appendChild(title);
  title.setAttribute('class', 'input-title');
  const author = document.createElement('p');
  author.textContent = `Author: ${newBook.author}`;
  card.appendChild(author);
  author.classList.add('input-text');
  const pages = document.createElement('p');
  pages.textContent = `Pages: ${newBook.pages}`;
  card.appendChild(pages);
  pages.classList.add('input-text');
  const inputBtns = document.createElement('div');
  inputBtns.classList.add('input-buttons');
  card.appendChild(inputBtns);

  // Create Read button to card
  const readBtn = document.createElement('button');
  readBtn.classList.add('readBtn');
  if (newBook.read === false) {
    readBtn.textContent = 'Not read';
    readBtn.classList.add('readNo');
  } else {
    readBtn.textContent = 'Read';
    readBtn.classList.add('readYes');
  }
  inputBtns.appendChild(readBtn);
  // Toggle read button to change status
  readBtn.addEventListener('click', e => {
    if (readBtn.textContent == 'Read') {
      readBtn.classList.add('readNo');
      readBtn.classList.remove('readYes');
      readBtn.textContent = 'Not read';
    } else {
      readBtn.classList.add('readYes');
      readBtn.classList.remove('readNo');
      readBtn.textContent = 'Read';
    }
  });

  // Create remove button to card
  const removeBtn = document.createElement('button');
  removeBtn.classList.add('removeBtn');
  removeBtn.textContent = 'Remove';
  inputBtns.appendChild(removeBtn);

  // Remove the card when clicking 'x'
  removeBtn.addEventListener('click', e => {
    const curTitle = e.target.closest('.card').firstChild.textContent;
    const index = findBook(myLibrary, curTitle);
    myLibrary.splice(index, 1);

    e.target.closest('.card').remove();

    setLocalStorage();
  });
}

function findBook(library, title) {
  if (library.length === 0 || library === null) return;
  library.forEach(book => {
    // if (book.title === title) return library.indexOf(book);
    if (book.title === title) {
      return library.indexOf(book);
    }
  });
}

// "Add book" button to open input form
const addBookBtn = document.querySelector('#add-book');
const modalContainer = document.querySelector('#modal-container');
const submit = document.querySelector('#submit');
addBookBtn.addEventListener('click', () => {
  modalContainer.classList.add('show');
});

let title = document.querySelector('#title');
let author = document.querySelector('#author');
let pages = document.querySelector('#pages');
let read = document.querySelector('#read');

// Submit button to not submit but instead add data to the array
submit.addEventListener('click', e => {
  if (!title.value || !author.value || !pages.value) return;
  addBookToLibrary(title.value, author.value, pages.value, read.checked);
  e.preventDefault();
  modalContainer.classList.remove('show');
  reset();
});

// Cancel button to cancel the input form
const cancel = document.querySelector('#cancel');
cancel.addEventListener('click', e => {
  e.preventDefault();
  modalContainer.classList.remove('show');
  reset();
});

function setLocalStorage() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem('myLibrary'));
  if (!data) return;

  data.forEach(book => {
    addBookToLibrary(book.title, book.author, book.pages, book.read);
  });
}
getLocalStorage();

// Reset form input after cancelling or submitting
function reset() {
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
}
