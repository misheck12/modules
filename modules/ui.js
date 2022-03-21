  // UI Class: handles UI tasks
  export default class UI {
    // getting books
    static displayBooks() {
      storedBooks.forEach((storedBook, index) => {
        UI.addBookToList(storedBook, index);
      });
    }
  
    // adding book to list
    static addBookToList(storedBook, index) {
      document.getElementById('booklist-container').innerHTML += `
      <div class="table">
          <h4 class="bt1">${storedBook.Title} by ${storedBook.Author}</h4>
          <button id="${storedBook.ID}" class="remove-btn">Remove</button>
      </div>
      `;
    }
  
    // clear form fields
    static clearForm() {
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
    }
  
    // delete books from UI
    static deleteBook(el) {
      if (el.classList.contains('remove-btn')) {
        el.parentElement.remove();
      }
    }
  }