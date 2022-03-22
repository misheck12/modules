/* eslint-disable import/prefer-default-export */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */

import Book from './modules/books.js';
import UI from './modules/ui.js';
import { DateTime } from './node_modules/luxon.js';

const time = DateTime.now().toFormat('LLL dd yyyy, hh:mm:ss a');
const time2 = document.querySelector('.date-and-time');
time2.textContent = time;

export class Store {
  // getting books from LS
  static getBooks() {
    let books;
    if (localStorage.getItem('Books') !== null) {
      books = JSON.parse(localStorage.getItem('Books'));
    } else {
      books = [];
    }
    return books;
  }

  // adding books to local storage
  static addBook(book) {
    storedBooks.push(book);
    localStorage.setItem('Books', JSON.stringify(storedBooks));
  }

  // removing books from local storage
  static removeBook(ID) {
    const idInNum = Number(ID);
    storedBooks.forEach((storedBook, index) => {
      if (storedBook.ID === idInNum) {
        storedBooks.splice(index, 1);
      }
    });
    localStorage.setItem('Books', JSON.stringify(storedBooks));
  }
}

// global variable
const storedBooks = Store.getBooks();

// Event Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event Add a book
document.getElementById('addBooks-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // getting input values
  const bookTitle = document.getElementById('title').value;
  const bookAuthor = document.getElementById('author').value;

  // instantiate book
  const book = new Book(time, bookTitle, bookAuthor);

  // adding new book to UI
  UI.addBookToList(book);

  // adding book to LS
  Store.addBook(book);

  // clearing form fields
  UI.clearForm();
});

// Event: remove a book
document.getElementById('booklist-container').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  Store.removeBook(e.target.id);
});

setInterval(time, 1000);

// body onload
document.getElementById('body').onload = () => {
  document.getElementById('booklist-container').style.display = 'flex';
  document.getElementById('addBooks-form').style.display = 'none';
  document.getElementById('contact-section').style.display = 'none';
};

// getting links
const list = document.getElementById('list');
const form = document.getElementById('form');
const contact = document.getElementById('contact');

// getting all links and applying click event
const links = document.querySelectorAll('.links');
links.forEach((link) => {
  link.addEventListener('click', (e) => {
    const clickedElement = e.target;
    const elementID = e.target.id;
    switch (elementID) {
      case 'list':
        document.getElementById('booklist-container').style.display = 'flex';
        document.getElementById('addBooks-form').style.display = 'none';
        document.getElementById('contact-section').style.display = 'none';
        clickedElement.classList.add('active');
        form.classList.remove('active');
        contact.classList.remove('active');
        break;
      case 'form':
        document.getElementById('addBooks-form').style.display = 'flex';
        document.getElementById('booklist-container').style.display = 'none';
        document.getElementById('contact-section').style.display = 'none';
        clickedElement.classList.add('active');
        list.classList.remove('active');
        contact.classList.remove('active');
        break;
      case 'contact':
        document.getElementById('addBooks-form').style.display = 'none';
        document.getElementById('booklist-container').style.display = 'none';
        document.getElementById('contact-section').style.display = 'flex';
        clickedElement.classList.add('active');
        list.classList.remove('active');
        form.classList.remove('active');
        break;
      default:
        document.getElementById('booklist-container').style.display = 'flex';
        document.getElementById('addBooks-form').style.display = 'none';
        document.getElementById('contact-section').style.display = 'none';
        clickedElement.classList.add('active');
        form.classList.remove('active');
        contact.classList.remove('active');
    }
  });
});
